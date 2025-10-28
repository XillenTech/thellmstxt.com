"use client";
import React, { useState } from "react";
import { MarkdownGenerationResponse } from "../types/backend";
import {
  Sparkles,
  FileText,
  Brain,
  BookOpen,
  Zap,
  Search,
  Lightbulb,
  FolderOpen,
  Loader2,
  CheckCircle,
  Archive,
} from "lucide-react";

const MarkdownTab = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<MarkdownGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = () => {
    if (websiteUrl.trim()) {
      setShowGenerator(true);
      // Auto-trigger generation when modal opens
      setTimeout(() => {
        generateMarkdown();
      }, 100);
    }
  };

  const generateMarkdown = async () => {
    setIsGenerating(true);
    setError(null);
    setResult(null);

    try {
      // Get user's public IP first
      let userIP = "";
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
      } catch (error) {
        console.error("Failed to get user IP:", error);
        // Continue without user IP
      }

      const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${BASE_API_URL}/api/generate-markdown`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteUrl, userIP }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate markdown files");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllFiles = () => {
    if (!result?.files) return;

    // Create a ZIP file using JSZip
    import("jszip")
      .then((JSZip) => {
        const zip = new JSZip.default();

        // Add all files to the ZIP
        result.files.forEach((file) => {
          zip.file(file.filename, file.content);
        });

        // Generate and download the ZIP
        zip.generateAsync({ type: "blob" }).then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `markdown-pages-${new Date()
            .toISOString()
            .slice(0, 10)}.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      })
      .catch((error) => {
        console.error("Failed to create ZIP:", error);
        // Fallback to individual downloads
        result.files.forEach((file, index) => {
          setTimeout(() => {
            const blob = new Blob([file.content], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, index * 100);
        });
      });
  };

  const downloadSingleFile = (file: {
    path: string;
    content: string;
    filename: string;
  }) => {
    const blob = new Blob([file.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* URL Input Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Start Documenting
            </h2>
            <p className="text-gray-600">
              Enter your website URL to begin the documentation process
            </p>
          </div>
          <label
            htmlFor="website-url"
            className="block text-sm font-semibold text-gray-700 mb-3"
          >
            Website URL
          </label>
          <div className="flex gap-4">
            <input
              type="url"
              id="website-url"
              className="flex-1 border-2 border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all"
              placeholder="https://example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
            />
            <button
              onClick={handleAnalyze}
              disabled={!websiteUrl.trim()}
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Generate Markdown</span>
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3 text-center">
            Enter the website URL you want to generate markdown
            documentation for.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Website Structure
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Automatically analyze and document your website&apos;s
            structure, pages, and content hierarchy with intelligent
            mapping.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            AI-Friendly Format
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Generate markdown that&apos;s optimized for AI crawlers to
            understand your content better and provide accurate responses.
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Documentation Ready
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Create comprehensive documentation that can be used for
            technical documentation and AI training with professional
            formatting.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Use Cases
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                AI Training
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Provide AI systems with structured information about your
              website for better understanding and more accurate responses
              to user queries.
            </p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 border border-teal-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Documentation
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Create technical documentation for your website structure that
              can be shared with developers and stakeholders for better
              collaboration.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                SEO Optimization
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Understand your website&apos;s structure better to optimize
              for search engines and improve discoverability and ranking.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-4">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Content Planning
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Use the generated structure to plan content improvements and
              identify gaps in your website for better user experience.
            </p>
          </div>
        </div>
      </div>

      {/* Generation Status and Results */}
      {showGenerator && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FolderOpen className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                Generate Markdown Pages
              </h2>
            </div>
            <button
              onClick={() => {
                setShowGenerator(false);
                setWebsiteUrl("");
                setResult(null);
                setError(null);
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Generate{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                .md
              </code>{" "}
              versions of your key pages for better parsing and offline processing
              by LLMs. This creates individual markdown files for each important
              page.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-green-900 mb-1">
                    Structured Content
                  </h3>
                  <p className="text-green-800 text-sm">
                    Each markdown file includes metadata, AI-generated summaries,
                    and clean content formatting for optimal LLM processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Generation Status */}
          {isGenerating && (
            <div className="mb-6">
              <div className="w-full bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Markdown Files...</span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Result */}
          {result && result.success && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-900">
                    Generation Complete! ✅
                  </h3>
                </div>
                <p className="text-green-800 text-sm">
                  Successfully generated {result.files.length} markdown files from
                  your website.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={downloadAllFiles}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <Archive className="w-4 h-4" />
                  <span>Download ZIP</span>
                </button>
              </div>

              {/* Files List */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Generated Files:
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {result.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <span className="font-medium text-gray-900 text-sm truncate">
                            {file.filename}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 truncate">
                          {file.path} • {(file.content.length / 1024).toFixed(1)}{" "}
                          KB
                        </p>
                      </div>
                      <button
                        onClick={() => downloadSingleFile(file)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2 flex-shrink-0"
                      >
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarkdownTab;
