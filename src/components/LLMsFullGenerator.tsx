"use client";
import React, { useState } from "react";
import { Download, FileText, Settings, Sparkles, Loader2 } from "lucide-react";
import { LLMsFullPayload, LLMsFullGenerationResponse } from "../types/backend";

interface LLMsFullGeneratorProps {
  websiteUrl: string;
  onClose: () => void;
}

const LLMsFullGenerator: React.FC<LLMsFullGeneratorProps> = ({
  websiteUrl,
  onClose,
}) => {
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
      const payload: LLMsFullPayload = {
        websiteUrl,
        ...settings,
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

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Generate LLMs Full
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Generate a comprehensive{" "}
            <code className="bg-gray-100 px-2 py-1 rounded">llms-full.txt</code>{" "}
            file containing all your website content, links, and optional AI
            enrichment for better LLM understanding.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  AI-Powered Enhancement
                </h3>
                <p className="text-blue-800 text-sm">
                  Enable AI enrichment to add summaries, context snippets, and
                  semantic analysis to each page.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Generation Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
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
                <span className="text-gray-700">Include image URLs</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.includeLinks}
                  onChange={(e) =>
                    setSettings({ ...settings, includeLinks: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Include internal links</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.aiEnrichment}
                  onChange={(e) =>
                    setSettings({ ...settings, aiEnrichment: e.target.checked })
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">Enable AI enrichment</span>
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
        <div className="mb-6">
          <button
            onClick={generateLLMsFull}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Generate LLMs Full</span>
              </>
            )}
          </button>
        </div>

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
              <h3 className="font-semibold text-green-900 mb-2">
                Generation Complete! ✅
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
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

            <div className="flex space-x-3">
              <button
                onClick={downloadFile}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download {result.filename}</span>
              </button>
            </div>

            {/* Preview */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Preview (first 500 characters):
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
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
