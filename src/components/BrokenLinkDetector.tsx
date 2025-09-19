/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Search, AlertTriangle, CheckCircle, ExternalLink, BarChart3, Download, RefreshCw, ChevronDown, Square } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface BrokenLinkResult {
  url: string;
  sourcePage: string;
  statusCode: number;
  linkType: "internal" | "external";
  context: "navigation" | "content" | "footer" | "header" | "sidebar" | "other";
  anchorText: string;
  discoveredAt: string;
  errorMessage?: string;
  redirectChain?: string[];
  responseTime?: number;
}

interface BrokenLinkSummary {
  totalLinksChecked: number;
  brokenLinksFound: number;
  internalBroken: number;
  externalBroken: number;
  statusCodeBreakdown: Record<number, number>;
  averageResponseTime: number;
  scanDuration: number;
}

interface ScanResult {
  scanId: string;
  websiteUrl: string;
  scanStartedAt: string;
  scanCompletedAt: string;
  brokenLinks: BrokenLinkResult[];
  summary: BrokenLinkSummary;
  scanDuration: number;
}

const BrokenLinkDetector = () => {
  const { user } = useAuth();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [maxPages, setMaxPages] = useState(50);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [scanSessionId, setScanSessionId] = useState<string | null>(null);

  // Page limit options based on authentication
  const pageLimitOptions = user 
    ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    : [50];

  const startScan = async () => {
    if (!websiteUrl.trim()) {
      setError("Please enter a website URL");
      return;
    }

    setIsScanning(true);
    setError(null);
    setProgress(0);
    setScanResult(null);

    // Generate a session ID for this scan
    const sessionId = `scan_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    setScanSessionId(sessionId);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/seo-services/broken-links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl: websiteUrl.trim(),
          maxPages,
          saveResults: true,
          sessionId, // Pass session ID to backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to start scan");
      }

      const data = await response.json();
      setScanResult(data.data);
      setProgress(100);
      
      // Refresh scan history
      await fetchScanHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setProgress(0);
    } finally {
      setIsScanning(false);
      setScanSessionId(null);
    }
  };

  const fetchScanHistory = useCallback(async () => {
    if (!websiteUrl.trim()) return;

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/seo-services/broken-links?websiteUrl=${encodeURIComponent(websiteUrl)}&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setScanHistory(data.data.scans || []);
      }
    } catch (err) {
      console.error("Failed to fetch scan history:", err);
    }
  }, [websiteUrl]);

  const getStatusCodeColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return "text-green-600";
    if (statusCode >= 300 && statusCode < 400) return "text-yellow-600";
    if (statusCode >= 400 && statusCode < 500) return "text-red-600";
    if (statusCode >= 500) return "text-red-800";
    return "text-gray-600";
  };

  const getDetailedErrorMessage = (statusCode: number, errorMessage?: string) => {
    if (errorMessage) return errorMessage;
    
    switch (statusCode) {
      case 400: return "Bad Request - The server cannot process the request due to malformed syntax";
      case 401: return "Unauthorized - Authentication is required and has failed";
      case 403: return "Forbidden - The server understood the request but refuses to authorize it";
      case 404: return "Not Found - The requested resource could not be found";
      case 405: return "Method Not Allowed - The request method is not supported";
      case 408: return "Request Timeout - The server timed out waiting for the request";
      case 410: return "Gone - The resource is no longer available";
      case 429: return "Too Many Requests - Rate limit exceeded";
      case 500: return "Internal Server Error - The server encountered an unexpected condition";
      case 502: return "Bad Gateway - The server received an invalid response from upstream";
      case 503: return "Service Unavailable - The server is temporarily unable to handle requests";
      case 504: return "Gateway Timeout - The server did not receive a timely response";
      case 999: return "Custom Error - Likely blocked by anti-bot protection or rate limiting";
      case 0: return "Connection Failed - Unable to connect to the server";
      default: return `HTTP ${statusCode} - Server returned an error status`;
    }
  };

  const stopScan = async () => {
    if (scanSessionId) {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${API_BASE_URL}/api/seo-services/cancel-scan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: scanSessionId }),
        });
        
        const result = await response.json();
        if (result.success) {
          console.log("✅ Scan cancelled successfully");
        } else {
          console.warn("⚠️ Failed to cancel scan:", result.message);
        }
      } catch (error) {
        console.warn("Failed to cancel scan:", error);
      }
    }
    
    setIsScanning(false);
    setProgress(0);
    setScanSessionId(null);
    setError("Scan was cancelled");
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case "navigation": return "🧭";
      case "content": return "📄";
      case "footer": return "🦶";
      case "header": return "📋";
      case "sidebar": return "📌";
      default: return "🔗";
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const exportResults = () => {
    if (!scanResult) {
      console.log("No scan result available for export");
      return;
    }

    console.log("Exporting scan result:", scanResult);
    console.log("Broken links count:", scanResult.brokenLinks.length);

    // Create a more comprehensive CSV with all the important information
    const csvContent = [
      ["URL", "Source Page", "Status Code", "Link Type", "Context", "Anchor Text", "Error Message", "Response Time (ms)", "Discovered At"],
      ...scanResult.brokenLinks.map(link => [
        link.url,
        link.sourcePage || "",
        link.statusCode.toString(),
        link.linkType,
        link.context,
        link.anchorText || "",
        link.errorMessage || "",
        link.responseTime?.toString() || "",
        link.discoveredAt || ""
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    console.log("CSV content preview:", csvContent.substring(0, 500));

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `broken-links-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (websiteUrl.trim()) {
      fetchScanHistory();
    }
  }, [websiteUrl, fetchScanHistory]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🔍 Broken Link Detector
        </h1>
        <p className="text-gray-600">
          Scan your website for broken internal and external links. Get detailed reports with status codes, response times, and context information.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isScanning}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Pages
            </label>
            <div className="relative">
            <select
              value={maxPages}
              onChange={(e) => setMaxPages(Number(e.target.value))}
              className="w-full h-10 px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              disabled={isScanning}
            >
              {pageLimitOptions.map((limit) => (
                <option key={limit} value={limit}>
                  {limit} pages
                </option>
              ))}
            </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {isScanning ? (
          <button
            onClick={stopScan}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
          >
            <Square className="w-4 h-4" />
            {progress > 0 && progress < 100 ? `Stop (${progress}%)` : "Stop"}
          </button>
        ) : (
          <button
            onClick={startScan}
            disabled={!websiteUrl.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Start Scan
          </button>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          </div>
        )}

        {/* {isScanning && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              Progress: {progress}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )} */}
      </div>

      {/* Scan History */}
      {scanHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Scans</h3>
          <div className="space-y-2">
            {scanHistory.map((scan) => (
              <div key={scan.scanId} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {scan.summary.brokenLinksFound > 0 ? (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className="font-medium">
                      {scan.summary.brokenLinksFound} broken links found
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(scan.scanCompletedAt).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => setScanResult(scan)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Results
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {scanResult && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Scan Results</h3>
              <button
                onClick={exportResults}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Total Links</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {scanResult.summary.totalLinksChecked}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-medium">Broken Links</span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {scanResult.summary.brokenLinksFound}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Internal</span>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  {scanResult.summary.internalBroken}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">External</span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {scanResult.summary.externalBroken}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>Scan Duration: {formatDuration(scanResult.scanDuration)}</div>
              <div>Average Response Time: {Math.round(scanResult.summary.averageResponseTime)}ms</div>
              <div>Completed: {new Date(scanResult.scanCompletedAt).toLocaleString()}</div>
            </div>
          </div>

          {/* Broken Links List */}
          {scanResult.brokenLinks.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Broken Links ({scanResult.brokenLinks.length})
              </h3>
              <div className="space-y-4">
                {scanResult.brokenLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{getContextIcon(link.context)}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            link.linkType === "internal" 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-purple-100 text-purple-800"
                          }`}>
                            {link.linkType}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            link.statusCode >= 400 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          } ${getStatusCodeColor(link.statusCode)}`}>
                            {link.statusCode}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>URL:</strong> 
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 ml-1"
                          >
                            {link.url}
                            <ExternalLink className="w-3 h-3 inline ml-1" />
                          </a>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Source:</strong> {link.sourcePage}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <strong>Anchor Text:</strong> &quot;{link.anchorText}&quot;
                        </div>
                        <div className="text-sm text-red-600">
                          <strong>Error:</strong> {getDetailedErrorMessage(link.statusCode, link.errorMessage)}
                        </div>
                        {link.responseTime && (
                          <div className="text-sm text-gray-500">
                            Response Time: {link.responseTime}ms
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">No Broken Links Found!</h3>
              <p className="text-green-600">
                Great job! All {scanResult.summary.totalLinksChecked} links are working properly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BrokenLinkDetector;
