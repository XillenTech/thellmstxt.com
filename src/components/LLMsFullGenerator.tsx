"use client";
import React, { useState } from "react";
import { Download, FileText, Settings, Sparkles, Loader2 } from "lucide-react";
import { LLMsFullPayload, LLMsFullGenerationResponse } from "../types/backend";
import { useAuth } from "@/components/AuthProvider";

interface LLMsFullGeneratorProps {
  websiteUrl: string;
  onClose: () => void;
}

const LLMsFullGenerator: React.FC<LLMsFullGeneratorProps> = ({
  websiteUrl,
  onClose,
}) => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<LLMsFullGenerationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    includeImages: false,
    includeLinks: true,
    maxDepth: 3,
    aiEnrichment: true,
  });

  // Determine API base URL from env or fallback
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const generateLLMsFull = async () => {
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

      const payload: LLMsFullPayload = {
        websiteUrl,
        ...settings,
        userIP, // Add user's public IP to payload
      };

      const response = await fetch(`${BASE_API_URL}/api/generate-llms-full`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: LLMsFullGenerationResponse = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to generate llms-full.txt");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadFile = () => {
    if (!result?.content) return;

    const blob = new Blob([result.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.filename || "llms-full.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-gray-900">
            Sign Up or Log In Required
          </h2>
          <p className="text-gray-700 mb-4 text-center">
            Please sign up or log in to generate and download your full llms.txt
            file.
          </p>
          <div className="flex flex-col w-full gap-3 mb-2">
            <a
              href="/signup"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Sign Up Free
            </a>
            <a
              href="/login"
              className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
            >
              Log In
            </a>
          </div>
          <button
            onClick={onClose}
            className="mt-2 text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Generate LLMs Full
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            Generate a comprehensive{" "}
            <code className="bg-gray-100 px-2 py-1 rounded text-xs sm:text-sm">
              llms-full.txt
            </code>{" "}
            file containing all your website content, links, and optional AI
            enrichment for better LLM understanding.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">
                  AI-Powered Enhancement
                </h3>
                <p className="text-blue-800 text-xs sm:text-sm">
                  Enable AI enrichment to add summaries, context snippets, and
                  semantic analysis to each page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Generation Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-3 sm:space-y-4">
              <label className="flex items-center space-x-2 sm:space-x-3">
                <input
                  type="checkbox"
                  checked={settings.includeImages}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      includeImages: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  Include image URLs
                </span>
              </label>

              <label className="flex items-center space-x-2 sm:space-x-3">
                <input
                  type="checkbox"
                  checked={settings.includeLinks}
                  onChange={(e) =>
                    setSettings({ ...settings, includeLinks: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  Include internal links
                </span>
              </label>

              <label className="flex items-center space-x-2 sm:space-x-3">
                <input
                  type="checkbox"
                  checked={settings.aiEnrichment}
                  onChange={(e) =>
                    setSettings({ ...settings, aiEnrichment: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-sm sm:text-base">
                  Enable AI enrichment
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crawl Depth
              </label>
              <select
                value={settings.maxDepth}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxDepth: parseInt(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black text-sm sm:text-base"
              >
                <option value={1}>1 level (shallow)</option>
                <option value={2}>2 levels</option>
                <option value={3}>3 levels (recommended)</option>
                <option value={4}>4 levels</option>
                <option value={5}>5 levels (deep)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Higher depth crawls more pages but takes longer
              </p>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={generateLLMsFull}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Generate LLMs Full</span>
              </>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && result.success && (
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">
                Generation Complete! ✅
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-green-700 font-medium">Pages:</span>
                  <span className="text-green-800 ml-1">
                    {result.totalPages}
                  </span>
                </div>
                <div>
                  <span className="text-green-700 font-medium">Words:</span>
                  <span className="text-green-800 ml-1">
                    {result.totalWords.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-green-700 font-medium">File:</span>
                  <span className="text-green-800 ml-1">{result.filename}</span>
                </div>
                <div>
                  <span className="text-green-700 font-medium">Size:</span>
                  <span className="text-green-800 ml-1">
                    {(result.content.length / 1024).toFixed(1)} KB
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={downloadFile}
                className="flex-1 bg-green-600 text-white py-2 px-3 sm:px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Download {result.filename}</span>
              </button>
            </div>

            {/* Preview */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Preview (first 500 characters):
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-4 max-h-32 sm:max-h-40 overflow-y-auto">
                <pre className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">
                  {result.content.substring(0, 500)}
                  {result.content.length > 500 && "..."}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LLMsFullGenerator;
