"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Square, Download, AlertTriangle, CheckCircle, XCircle, Clock, FileText, Tag, Link, Eye, Hash } from "lucide-react";
import { useAuth } from "./AuthProvider";

interface SEOIssue {
  type: string;
  severity: "high" | "medium" | "low";
  message: string;
  sourcePage: string;
  affectedPages: string[];
  details?: {
    duplicateValues?: string[];
    missingTags?: string[];
    count?: number;
  };
  discoveredAt: string;
}

interface SEOSummary {
  totalPagesAnalyzed: number;
  totalIssuesFound: number;
  issuesByType: Record<string, number>;
  issuesBySeverity: Record<string, number>;
  duplicateCanonicals: number;
  duplicateTitles: number;
  duplicateMetaDescriptions: number;
  missingTitles: number;
  missingMetaDescriptions: number;
  missingCanonicals: number;
  duplicateH1s: number;
  multipleH1s: number;
  averageIssuesPerPage: number;
  scanDuration: number;
}

interface SEOAnalysisResult {
  websiteUrl: string;
  scanId: string;
  scanStartedAt: string;
  scanCompletedAt: string;
  issues: SEOIssue[];
  summary: SEOSummary;
  success: boolean;
  errorMessage?: string;
}

interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  status: string;
  pagesCrawled: number;
  linksFound: number;
  pathsFound: number;
  type: string;
  seoIssuesFound?: number;
  scanId?: string;
}

const SEOAnalyzer: React.FC = () => {
  const { user } = useAuth();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [maxPages, setMaxPages] = useState(50);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<SEOAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [analysisSessionId, setAnalysisSessionId] = useState<string | null>(null);

  // Page limit options based on authentication
  const pageLimitOptions = user 
    ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    : [50];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="w-4 h-4" />;
      case "medium": return <AlertTriangle className="w-4 h-4" />;
      case "low": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "duplicate_canonical": return <Link className="w-4 h-4" />;
      case "duplicate_title": return <FileText className="w-4 h-4" />;
      case "duplicate_meta_description": return <Tag className="w-4 h-4" />;
      case "missing_title": return <FileText className="w-4 h-4" />;
      case "missing_meta_description": return <Tag className="w-4 h-4" />;
      case "missing_canonical": return <Link className="w-4 h-4" />;
      case "duplicate_h1": return <Hash className="w-4 h-4" />;
      case "missing_h1": return <Hash className="w-4 h-4" />;
      case "multiple_h1": return <Hash className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const fetchAnalysisHistory = useCallback(async () => {
    if (!websiteUrl.trim()) return;

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/auth/history`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const seoHistory = data.history.filter((item: HistoryItem) => item.type === 'seo-analysis');
        setHistory(seoHistory);
      }
    } catch (error) {
      console.error("Failed to fetch analysis history:", error);
    }
  }, [websiteUrl]);

  const startAnalysis = async () => {
    if (!websiteUrl.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);
    setError(null);
    setAnalysisResult(null);

    // Generate session ID for cancellation
    const sessionId = `seo-analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setAnalysisSessionId(sessionId);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 1000);

      const response = await fetch(`${API_BASE_URL}/api/seo-analysis/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          websiteUrl: websiteUrl.trim(),
          maxPages,
          saveResults: true,
          sessionId
        }),
      });

      clearInterval(progressInterval);
      setProgress(100);

      const result = await response.json();

      if (result.success) {
        setAnalysisResult(result.data);
        await fetchAnalysisHistory();
      } else {
        setError(result.message || "Analysis failed");
      }
    } catch (error) {
      setError("Failed to start SEO analysis. Please try again.");
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
      setProgress(0);
      setAnalysisSessionId(null);
    }
  };

  const stopAnalysis = async () => {
    if (analysisSessionId) {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        const response = await fetch(`${API_BASE_URL}/api/seo-analysis/cancel`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: analysisSessionId }),
        });

        const result = await response.json();
        if (result.success) {
          console.log("✅ Analysis cancelled successfully");
        } else {
          console.warn("⚠️ Failed to cancel analysis:", result.message);
        }
      } catch (error) {
        console.warn("Failed to cancel analysis:", error);
      }
    }

    setIsAnalyzing(false);
    setProgress(0);
    setAnalysisSessionId(null);
    setError("Analysis was cancelled");
  };

  const exportResults = () => {
    if (!analysisResult) return;

    console.log("Exporting analysis result:", analysisResult);
    console.log("SEO issues count:", analysisResult.issues.length);

    // Create a comprehensive CSV with all the important information
    const csvContent = [
      ["Issue Type", "Severity", "Message", "Source Page", "Affected Pages", "Duplicate Values", "Missing Tags", "Count", "Discovered At"],
      ...analysisResult.issues.map(issue => [
        issue.type,
        issue.severity,
        issue.message,
        issue.sourcePage,
        issue.affectedPages.join("; "),
        issue.details?.duplicateValues?.join("; ") || "",
        issue.details?.missingTags?.join("; ") || "",
        issue.details?.count?.toString() || "",
        new Date(issue.discoveredAt).toISOString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    console.log("CSV content preview:", csvContent.substring(0, 500));

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-analysis-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (websiteUrl.trim()) {
      fetchAnalysisHistory();
    }
  }, [websiteUrl, fetchAnalysisHistory]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Analysis</h1>
        <p className="text-gray-600 mb-6">
          Analyze your website for SEO issues including duplicate titles, meta descriptions, canonical URLs, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isAnalyzing}
            />
          </div>

          <div>
            <label htmlFor="max-pages" className="block text-sm font-medium text-gray-700 mb-2">
              Max Pages to Analyze
            </label>
            <div className="relative">
              <select
                id="max-pages"
                value={maxPages}
                onChange={(e) => setMaxPages(Number(e.target.value))}
                className="w-full h-10 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                disabled={isAnalyzing}
              >
                {pageLimitOptions.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit} pages
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {isAnalyzing ? (
            <button
              onClick={stopAnalysis}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              {progress > 0 && progress < 100 ? `Stop (${Math.round(progress)}%)` : "Stop"}
            </button>
          ) : (
            <button
              onClick={startAnalysis}
              disabled={!websiteUrl.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Start Analysis
            </button>
          )}

          {analysisResult && (
            <button
              onClick={exportResults}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>

        {isAnalyzing && (
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Analyzing website for SEO issues...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      {analysisResult && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Pages Analyzed</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{analysisResult.summary.totalPagesAnalyzed}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-900">Issues Found</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{analysisResult.summary.totalIssuesFound}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-900">Duration</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{formatDuration(analysisResult.summary.scanDuration)}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Avg Issues/Page</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{analysisResult.summary.averageIssuesPerPage.toFixed(1)}</p>
              </div>
            </div>
          </div>

          {/* Issues by Type */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Issues by Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysisResult.summary.issuesByType).map(([type, count]) => (
                <div key={type} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getIssueIcon(type)}
                    <span className="font-semibold text-gray-900 capitalize">
                      {type.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-600">{count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Issues */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Issues</h2>
            <div className="space-y-4">
              {analysisResult.issues.map((issue, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getSeverityColor(issue.severity)}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getSeverityIcon(issue.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getIssueIcon(issue.type)}
                        <span className="font-semibold capitalize">
                          {issue.type.replace(/_/g, ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{issue.message}</p>
                      <div className="text-sm text-gray-600">
                        <p><strong>Source:</strong> {issue.sourcePage}</p>
                        {issue.affectedPages.length > 1 && (
                          <p><strong>Affected Pages:</strong> {issue.affectedPages.length}</p>
                        )}
                        {issue.details?.duplicateValues && (
                          <p><strong>Duplicate Values:</strong> {issue.details.duplicateValues.join(", ")}</p>
                        )}
                        {issue.details?.missingTags && (
                          <p><strong>Missing Tags:</strong> {issue.details.missingTags.join(", ")}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis History</h2>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.url}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(item.timestamp).toLocaleString()} • {item.pagesCrawled} pages • {item.seoIssuesFound} issues
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOAnalyzer;
