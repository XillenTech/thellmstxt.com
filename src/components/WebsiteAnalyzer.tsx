"use client";
import React, { useState } from "react";
import { Search, Loader2, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";
import type { LLMBot } from "../types/backend";

interface WebsiteAnalyzerProps {
  onAnalysisComplete: (data: {
    metadata: { title: string; description: string; url: string };
    paths: Array<{ path: string; allow: boolean; description?: string }>;
  }) => void;
}

interface AnalysisResult {
  success: boolean;
  metadata: {
    title: string;
    description: string;
    url: string;
  };
  paths: Array<{
    path: string;
    allow: boolean;
    description?: string;
  }>;
  error?: string;
}

const WebsiteAnalyzer = ({ onAnalysisComplete }: WebsiteAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [selectedBot, setSelectedBot] = useState<LLMBot>("ChatGPT-User");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const llmBots: Array<{ value: LLMBot; label: string; description: string }> =
    [
      {
        value: "ChatGPT-User",
        label: "ChatGPT-User",
        description: "OpenAI ChatGPT web browsing",
      },
      {
        value: "GPTBot",
        label: "GPTBot",
        description: "OpenAI GPT training crawler",
      },
      {
        value: "GoogleExtended",
        label: "Google-Extended",
        description: "Google AI training crawler",
      },
      {
        value: "Claude",
        label: "Claude-Web",
        description: "Anthropic Claude web browsing",
      },
      {
        value: "Anthropic",
        label: "Anthropic",
        description: "Anthropic AI training crawler",
      },
      { value: "CCBot", label: "CCBot", description: "Common Crawl bot" },
    ];

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const analyzeWebsite = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/analyze-website`;
      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url.trim(),
            llmBot: selectedBot,
          }),
        }
      );

      const data: AnalysisResult = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze website");
      }

      if (!data.success) {
        throw new Error(data.error || "Analysis failed");
      }

      setAnalysisResult(data);
      onAnalysisComplete(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeWebsite();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Website Analyzer
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Website URL
          </label>
          <div className="flex space-x-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder:text-gray-400"
              disabled={isLoading}
              required
            />
            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span>{isLoading ? "Analyzing..." : "Analyze"}</span>
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Enter the website URL you want to analyze for LLM crawler paths
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            LLM Bot Type
          </label>
          <div className="relative">
            <select
              value={selectedBot}
              onChange={(e) => setSelectedBot(e.target.value as LLMBot)}
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
              disabled={isLoading}
            >
              {llmBots.map((bot) => (
                <option key={bot.value} value={bot.value}>
                  {bot.label} - {bot.description}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {analysisResult && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-700 text-sm font-medium">
                Analysis complete! Found {analysisResult.paths.length} paths.
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Website Info</h4>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Title:</strong> {analysisResult.metadata.title}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {analysisResult.metadata.description}
                </p>
                <p>
                  <strong>URL:</strong> {analysisResult.metadata.url}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Discovered Paths
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {analysisResult.paths.slice(0, 10).map((path, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    <span className="font-mono">{path.path}</span>
                    {path.description && (
                      <span className="text-gray-500 ml-2">
                        - {path.description}
                      </span>
                    )}
                  </div>
                ))}
                {analysisResult.paths.length > 10 && (
                  <p className="text-xs text-gray-500 mt-2">
                    ... and {analysisResult.paths.length - 10} more paths
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default WebsiteAnalyzer;
