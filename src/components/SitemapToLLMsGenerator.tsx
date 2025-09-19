"use client";

import React, { useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { Upload, X, FileText } from "lucide-react";

interface SitemapValidation {
  isValid: boolean;
  sitemapType: string;
  urlCount: number;
  sitemapCount: number;
}

interface SitemapPreview {
  totalUrls: number;
  filteredUrls: number;
  previewUrls: number;
  urls: Array<{
    url: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
  }>;
}

interface LLMsTxtResult {
  success: boolean;
  content: string;
  filename: string;
  metadata: {
    totalUrls: number;
    totalSections: number;
    siteTitle: string;
    sitemapUrl: string;
  };
  processingTime?: number;
  error?: string;
}

export default function SitemapToLLMsGenerator() {
  const { token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sitemapUrl, setSitemapUrl] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [validation, setValidation] = useState<SitemapValidation | null>(null);
  const [preview, setPreview] = useState<SitemapPreview | null>(null);
  const [result, setResult] = useState<LLMsTxtResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Configuration options
  const [enableEnrichment, setEnableEnrichment] = useState(true);
  const [maxUrlsPerSection, setMaxUrlsPerSection] = useState(50);
  const [includeOptional, setIncludeOptional] = useState(true);

  // File upload handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type
    if (!file.name.endsWith('.xml') && !file.name.endsWith('.txt')) {
      setError("Please upload an XML or TXT file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setUploadedFile(file);
    setSitemapUrl(""); // Clear URL when file is uploaded
    setError(null);
    setValidation(null);
    setPreview(null);
    setResult(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-detect sitemap URL from domain
  const detectSitemapUrl = (url: string) => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`);
      return `${domain.protocol}//${domain.host}/sitemap.xml`;
    } catch {
      return "";
    }
  };

  // Validate sitemap (URL or file)
  const validateSitemap = async () => {
    if (!sitemapUrl && !uploadedFile) {
      setError("Please enter a sitemap URL or upload a file");
      return;
    }

    setIsValidating(true);
    setError(null);
    setValidation(null);

    try {
      let response;
      
      if (uploadedFile) {
        // Validate uploaded file
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/validate-sitemap-file`, {
          method: 'POST',
          body: formData,
        });
      } else {
        // Validate URL
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/validate-sitemap?url=${encodeURIComponent(sitemapUrl)}`);
      }
      
      const data = await response.json();

      if (data.success) {
        setValidation(data);
        if (data.isValid) {
          setError(null);
        } else {
          setError("Invalid sitemap format");
        }
      } else {
        setError(data.error || "Failed to validate sitemap");
      }
    } catch (err) {
      setError("Failed to validate sitemap");
      console.error(err);
    } finally {
      setIsValidating(false);
    }
  };

  // Preview sitemap contents
  const previewSitemap = async () => {
    if (!sitemapUrl && !uploadedFile) {
      setError("Please enter a sitemap URL or upload a file");
      return;
    }

    setIsPreviewing(true);
    setError(null);
    setPreview(null);

    try {
      let response;
      
      if (uploadedFile) {
        // Preview uploaded file
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('limit', '20');
        
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/sitemap-preview-file`, {
          method: 'POST',
          body: formData,
        });
      } else {
        // Preview URL
        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/sitemap-preview?url=${encodeURIComponent(sitemapUrl)}&limit=20`);
      }
      
      const data = await response.json();

      if (data.success) {
        setPreview(data);
        setError(null);
      } else {
        setError(data.error || "Failed to generate preview");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to generate preview");
    } finally {
      setIsPreviewing(false);
    }
  };

  // Generate llms.txt from sitemap
  const generateLLMsTxt = async () => {
    if (!sitemapUrl && !uploadedFile) {
      setError("Please enter a sitemap URL or upload a file");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;
      
      if (uploadedFile) {
        // Generate from uploaded file
        const formData = new FormData();
        formData.append('file', uploadedFile);
        formData.append('siteTitle', siteTitle || '');
        formData.append('enableEnrichment', enableEnrichment.toString());
        formData.append('maxUrlsPerSection', maxUrlsPerSection.toString());
        formData.append('includeOptional', includeOptional.toString());

        if (token) {
          formData.append('token', token);
        }

        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/generate-llms-from-sitemap-file`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Generate from URL
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/api/generate-llms-from-sitemap`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            sitemapUrl,
            siteTitle: siteTitle || undefined,
            enableEnrichment,
            maxUrlsPerSection,
            includeOptional,
          }),
        });
      }

      const data = await response.json();

      if (data.success) {
        setResult(data);
        setError(null);
      } else {
        setError(data.error || "Failed to generate llms.txt");
      }
    } catch (err) {
      setError("Failed to generate llms.txt");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Download generated file
  const downloadFile = () => {
    if (!result?.content) return;

    const blob = new Blob([result.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "llms.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy content to clipboard
  const copyToClipboard = async () => {
    if (!result?.content) return;

    try {
      await navigator.clipboard.writeText(result.content);
      // Show success toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
      toast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>llms.txt copied to clipboard!</span>
        </div>
      `;
      document.body.appendChild(toast);
      
      // Animate in
      setTimeout(() => toast.classList.remove('translate-x-full'), 100);
      
      // Remove after 3 seconds
      setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
    } catch (err) {
      // Show error toast
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
      toast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
          <span>Failed to copy to clipboard</span>
        </div>
      `;
      document.body.appendChild(toast);
      
      // Animate in
      setTimeout(() => toast.classList.remove('translate-x-full'), 100);
      
      // Remove after 3 seconds
      setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 3000);
      
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Generate llms.txt from Sitemap
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Convert your sitemap.xml directly into a curated llms.txt file. 
          This tool filters, groups, and enriches your URLs to create a high-quality 
          llms.txt that follows the specification.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-blue-500 rounded"></div>
            <h3 className="text-lg font-medium text-gray-900">Upload Sitemap File</h3>
          </div>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver 
                ? 'border-blue-500 bg-blue-50' 
                : uploadedFile 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <FileText className="w-8 h-8 text-green-600" />
                  <span className="text-lg font-medium text-gray-900">{uploadedFile.name}</span>
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  File size: {uploadedFile.size < 1024 * 1024 
                    ? `${(uploadedFile.size / 1024).toFixed(1)} KB` 
                    : `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your sitemap file here, or click to browse
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Supports XML and TXT files up to 10MB
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xml,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* OR Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* URL Input Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-blue-500 rounded"></div>
            <h3 className="text-lg font-medium text-gray-900">Enter Sitemap URL</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sitemap URL
              </label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={sitemapUrl}
                  onChange={(e) => setSitemapUrl(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!uploadedFile}
                />
                <button
                  onClick={() => setSitemapUrl(detectSitemapUrl(sitemapUrl))}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50"
                  title="Auto-detect sitemap URL"
                  disabled={!!uploadedFile}
                >
                  🎯
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Site Title (Optional)
              </label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder="My Awesome Site"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Configuration Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enableEnrichment"
                checked={enableEnrichment}
                onChange={(e) => setEnableEnrichment(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="enableEnrichment" className="text-sm text-gray-700">
                Enable enrichment (fetch titles & descriptions)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max URLs per section
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={maxUrlsPerSection}
                onChange={(e) => setMaxUrlsPerSection(parseInt(e.target.value) || 50)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeOptional"
                checked={includeOptional}
                onChange={(e) => setIncludeOptional(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="includeOptional" className="text-sm text-gray-700">
                Include Optional section
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button
            onClick={validateSitemap}
            disabled={isValidating || (!sitemapUrl && !uploadedFile)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isValidating ? "Validating..." : "Validate Sitemap"}
          </button>

          <button
            onClick={previewSitemap}
            disabled={isPreviewing || (!sitemapUrl && !uploadedFile)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPreviewing ? "Generating Preview..." : "Preview URLs"}
          </button>

          <button
            onClick={generateLLMsTxt}
            disabled={isLoading || (!sitemapUrl && !uploadedFile)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Generating..." : "Generate llms.txt"}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>

      {/* Validation Results */}
      {validation && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sitemap Validation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl ${validation.isValid ? "text-green-600" : "text-red-600"}`}>
                {validation.isValid ? "✅" : "❌"}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{validation.sitemapType}</div>
              <div className="text-sm text-gray-600">Type</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{validation.urlCount}</div>
              <div className="text-sm text-gray-600">URLs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{validation.sitemapCount}</div>
              <div className="text-sm text-gray-600">Sitemaps</div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Results */}
      {preview && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">URL Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{preview.totalUrls}</div>
              <div className="text-sm text-gray-600">Total URLs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{preview.filteredUrls}</div>
              <div className="text-sm text-gray-600">After Filtering</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{preview.previewUrls}</div>
              <div className="text-sm text-gray-600">Preview URLs</div>
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto border rounded-md p-4">
            {preview.urls.map((url, index) => (
              <div key={index} className="py-1 text-sm">
                <div className="font-medium text-blue-600">{url.url}</div>
                {url.lastmod && (
                  <div className="text-gray-500 text-xs">Last modified: {url.lastmod}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generation Results */}
      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Generated llms.txt</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                Copy
              </button>
              <button
                onClick={downloadFile}
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Download
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{result.metadata.totalUrls}</div>
              <div className="text-sm text-gray-600">Total URLs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{result.metadata.totalSections}</div>
              <div className="text-sm text-gray-600">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{result.metadata.siteTitle}</div>
              <div className="text-sm text-gray-600">Site Title</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{result.processingTime}ms</div>
              <div className="text-sm text-gray-600">Processing Time</div>
            </div>
          </div>

          <div className="border rounded-md p-4 bg-gray-50">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap overflow-x-auto">
              {result.content.length > 500 
                ? `${result.content.substring(0, 500)}...\n\n[Content truncated - ${result.content.length} characters total]`
                : result.content
              }
            </pre>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-blue-900 mb-3">How it works</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>• <strong>Load:</strong> Reads your sitemap.xml (supports sitemapindex and urlset formats)</p>
          <p>• <strong>Filter:</strong> Removes noisy URLs like login pages, feeds, and admin areas</p>
          <p>• <strong>Enrich:</strong> Fetches page titles and descriptions for better link text</p>
          <p>• <strong>Group:</strong> Organizes URLs into logical sections (Docs, Blog, Help, etc.)</p>
          <p>• <strong>Curate:</strong> Limits each section size and moves overflow to Optional</p>
          <p>• <strong>Generate:</strong> Creates a spec-compliant llms.txt file</p>
        </div>
      </div>
    </div>
  );
}
