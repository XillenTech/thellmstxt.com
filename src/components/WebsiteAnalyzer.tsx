"use client";
import React, { useState, useRef } from "react";
import {
  Search,
  // Loader2,
  AlertCircle,
  CheckCircle,
  // ChevronDown,
  Sparkles,
  Square,
} from "lucide-react";
import type { LLMBot } from "../types/backend";
import { useAuth } from "./AuthProvider";

interface WebsiteAnalyzerProps {
  onAnalysisComplete: (data: {
    metadata: { title: string; description: string; url: string };
    paths: Array<{ path: string; allow: boolean; description?: string }>;
    selectedBots: LLMBot[];
    pageMetadatas?: Array<{
      path: string;
      title: string;
      description: string;
      keywords?: string;
      bodyContent?: string;
    }>;
    aiGeneratedContent?: Array<{
      path: string;
      summary: string;
      contextSnippet: string;
      keywords: string[];
      contentType: string;
      priority: string;
      aiUsageDirective: string;
    }>;
    seoAnalysisResult?: any;
    isSEOAnalyzing?: boolean;
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
  pageMetadatas?: Array<{
    path: string;
    title: string;
    description: string;
    keywords?: string;
    bodyContent?: string;
  }>;
  aiGeneratedContent?: Array<{
    path: string;
    summary: string;
    contextSnippet: string;
    keywords: string[];
    contentType: string;
    priority: string;
    aiUsageDirective: string;
  }>;
  error?: string;
}

const WebsiteAnalyzer = ({ onAnalysisComplete }: WebsiteAnalyzerProps) => {
  const [url, setUrl] = useState("");
  const [selectedBots, setSelectedBots] = useState<LLMBot[]>(["ChatGPT-User"]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [aiEnrichment, setAiEnrichment] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressMsg, setProgressMsg] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [showAsyncPrompt, setShowAsyncPrompt] = useState(false);
  const [asyncPromptMsg, setAsyncPromptMsg] = useState<string | null>(null);
  const [closeError, setCloseError] = useState<string | null>(null);
  const { token, validateToken } = useAuth();

  // SEO Analysis state
  const [seoAnalysisResult, setSeoAnalysisResult] = useState<any>(null);
  const [isSEOAnalyzing, setIsSEOAnalyzing] = useState(false);
  const [seoSessionId, setSeoSessionId] = useState<string | null>(null);
  const currentAnalysisDataRef = useRef<any>(null);

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

  const generateSessionId = (): string => {
    return `analysis_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;
  };

  const stopAnalysis = async () => {
    if (sessionId) {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        await fetch(`${apiBase}/api/cancel-analysis`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch (error) {
        console.warn("Failed to cancel analysis:", error);
      }
    }

    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }

    setIsLoading(false);
    setProgress(0);
    setProgressMsg("");
    setSessionId("");
  };

  // Function to poll for SEO analysis results
  const pollSEOAnalysis = async (sessionId: string) => {
    console.log("🔄 Starting SEO polling for session:", sessionId);
    setIsSEOAnalyzing(true);
    setSeoSessionId(sessionId);
    
    const pollInterval = setInterval(async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
        console.log("🔍 Polling SEO status for:", sessionId);
        const response = await fetch(`${API_BASE_URL}/api/seo-analysis/status/${sessionId}`);
        const data = await response.json();
        console.log("📊 SEO polling response:", data);
        
        if (data.success && data.status === "completed") {
          setSeoAnalysisResult(data.data);
          setIsSEOAnalyzing(false);
          clearInterval(pollInterval);
          console.log("✅ SEO analysis completed:", data.data);
          console.log("📊 currentAnalysisData exists:", !!currentAnalysisDataRef.current);
          
          // Update parent with SEO results
          if (currentAnalysisDataRef.current) {
            const updatedAnalysisData = {
              ...currentAnalysisDataRef.current,
              seoAnalysisResult: data.data,
              isSEOAnalyzing: false,
            };
            console.log("🔄 Calling onAnalysisComplete with SEO results:", updatedAnalysisData);
            currentAnalysisDataRef.current = updatedAnalysisData;
            console.log("📞 About to call onAnalysisComplete...");
            onAnalysisComplete(updatedAnalysisData);
            console.log("✅ onAnalysisComplete called successfully");
          } else {
            console.log("❌ currentAnalysisData is null, cannot update parent");
          }
        } else if (data.success && data.status === "not_found") {
          // Analysis not found, stop polling
          setIsSEOAnalyzing(false);
          clearInterval(pollInterval);
          console.log("❌ SEO analysis not found");
        }
        // If status is "running", continue polling
      } catch (error) {
        console.error("Error polling SEO analysis:", error);
        setIsSEOAnalyzing(false);
        clearInterval(pollInterval);
      }
    }, 2000); // Poll every 2 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      if (isSEOAnalyzing) {
        setIsSEOAnalyzing(false);
        console.log("⏰ SEO analysis polling timeout");
      }
    }, 300000);
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
    setProgress(0);
    setProgressMsg("");

    // Generate unique session ID
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);

    const apiBase =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

    // Get user's IP first
    let userIP = "";
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      userIP = ipData.ip;
    } catch (error) {
      console.error("Failed to get user IP:", error);
      // Continue without user IP
    }

    const sseUrl = `${apiBase}/api/analyze-website?url=${encodeURIComponent(
      url.trim()
    )}&bots=${encodeURIComponent(
      selectedBots.join(",")
    )}&aiEnrichment=${aiEnrichment}&sessionId=${newSessionId}&userIP=${userIP}`;

    // If logged in, use fetch with Authorization header and manual SSE parsing
    if (token) {
      // Validate token before making API call
      if (!(await validateToken(token))) {
        setError("Authentication expired. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(sseUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.body) throw new Error("No response body");
        const reader = response.body.getReader();
        let buffer = "";
        let done = false;
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            buffer += new TextDecoder().decode(value);
            let eventMatch;
            // Process all complete events in the buffer
            while (
              (eventMatch = buffer.match(/event: (\w+)\ndata: ([^\n]+)\n\n/))
            ) {
              const [, event, data] = eventMatch;
              buffer = buffer.slice(eventMatch.index! + eventMatch[0].length);
              handleSSEEvent(event, data);
            }
          }
        }
      } catch {
        setError("Analysis failed or connection lost.");
        setIsLoading(false);
        setProgress(0);
        setEventSource(null);
        setSessionId("");
      }
    } else {
      // Not logged in: use EventSource (no custom headers)
      const evtSource = new EventSource(sseUrl);
      setEventSource(evtSource);
      evtSource.addEventListener("progress", (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          setProgress(data.progress);
          setProgressMsg(data.message || "");
          if (
            aiEnrichment &&
            data.message &&
            data.message.includes("AI enrichment")
          ) {
            console.log("AI enrichment in progress:", data.message);
          }
        } catch {}
      });
      evtSource.addEventListener("cancelled", () => {
        setError("Analysis was cancelled");
        setIsLoading(false);
        setProgress(0);
        setEventSource(null);
        setSessionId("");
      });
      evtSource.addEventListener("error", () => {
        setError("Analysis failed or connection lost.");
        setIsLoading(false);
        setProgress(0);
        setEventSource(null);
        setSessionId("");
      });
      evtSource.addEventListener("open", () => {});
      evtSource.addEventListener("message", () => {});
      evtSource.addEventListener("end", () => {
        evtSource.close();
        setEventSource(null);
        setSessionId("");
      });
      evtSource.addEventListener("result", (event: MessageEvent) => {
        try {
          handleSSEEvent("result", event.data);
        } catch {
          setError("Failed to parse analysis result");
          setIsLoading(false);
          setProgress(0);
        } finally {
          evtSource.close();
          setEventSource(null);
          setSessionId("");
        }
      });
      evtSource.addEventListener("asyncPrompt", (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          setAsyncPromptMsg(data.message || "This may take a while...");
          setShowAsyncPrompt(true);
        } catch {}
      });
    }
  };

  // Helper to handle SSE events for both fetch and EventSource
  function handleSSEEvent(event: string, data: string) {
    if (event === "progress") {
      try {
        const parsed = JSON.parse(data);
        setProgress(parsed.progress);
        setProgressMsg(parsed.message || "");
      } catch {}
    } else if (event === "asyncPrompt") {
      try {
        const parsed = JSON.parse(data);
        setAsyncPromptMsg(parsed.message || "This may take a while...");
        setShowAsyncPrompt(true);
      } catch {}
    } else if (event === "cancelled") {
      setError("Analysis was cancelled");
      setIsLoading(false);
      setProgress(0);
      setSessionId("");
    } else if (event === "error") {
      setError("Analysis failed or connection lost.");
      setIsLoading(false);
      setProgress(0);
      setSessionId("");
    } else if (event === "seoSessionId") {
      try {
        const parsed = JSON.parse(data);
        console.log("🔍 Received SEO session ID:", parsed.seoSessionId);
        // Start polling for SEO analysis results
        pollSEOAnalysis(parsed.seoSessionId);
      } catch (error) {
        console.error("Error parsing SEO session ID:", error);
      }
    } else if (event === "result") {
      try {
        const dataObj: AnalysisResult & {
          demo?: boolean;
          remainingPages?: number;
          demoMessage?: string;
          asyncJob?: boolean;
          message?: string;
        } = JSON.parse(data);
        if (dataObj.success) {
          setAnalysisResult(dataObj);
          const analysisData = {
            ...dataObj,
            selectedBots,
            pageMetadatas: dataObj.pageMetadatas,
            aiGeneratedContent: dataObj.aiGeneratedContent,
            seoAnalysisResult,
            isSEOAnalyzing,
          };
          console.log("📊 Initial analysis complete, setting currentAnalysisData:", analysisData);
          currentAnalysisDataRef.current = analysisData;
          onAnalysisComplete(analysisData);
          setIsLoading(false);
          setProgress(100);
        } else {
          setError(dataObj.error || "Analysis failed");
          setIsLoading(false);
          setProgress(0);
        }
      } catch {
        setError("Failed to parse analysis result");
        setIsLoading(false);
        setProgress(0);
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeWebsite();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 relative">
      {/* ASYNC PROMPT MODAL (Blur Overlay) */}
      {showAsyncPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center relative">
            <h4 className="text-lg font-bold mb-2 text-purple-700">
              Long Job in Progress
            </h4>
            <p className="mb-4 text-gray-700">
              {asyncPromptMsg ||
                "Generating llms.txt for your website may take more time. You can leave this website while it is under process. We will send you the file in your email when it is completed."}
            </p>
            {closeError && (
              <div className="mb-2 text-xs text-red-600">{closeError}</div>
            )}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setShowAsyncPrompt(false);
                  setCloseError(null);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  window.location.href = "/safe-to-close";
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Website Analyzer
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Configuration Settings Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 rounded-xl p-4 sm:p-6">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Configuration Settings
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              The LLMs.txt file will be generated based on the content of your website, and will use AI to categorize the content. First, the website will be crawled, and then the content will be analyzed to create a comprehensive LLMs.txt file.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> The generated LLMs.txt file will be based on the content of your website and the configuration settings you provide.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Max Crawl Depth</span>
                <span className="text-sm font-semibold text-blue-600">6 levels</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Max Rate Limit</span>
                <span className="text-sm font-semibold text-blue-600">25 req/sec</span>
              </div>
              <span className="text-xs text-blue-500">(40ms interval)</span>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Max Crawled Pages</span>
                <span className="text-sm font-semibold text-blue-600">5 (demo) / 1000 (signed in)</span>
              </div>
              <span className="text-xs text-blue-500">(1000 max)</span>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">AI Categorization</span>
                <span className="text-sm font-semibold text-blue-600">Optional</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Website URL
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative overflow-hidden rounded-3xl">
              {isLoading && progress > 0 && (
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 transition-all duration-300 ease-out z-0 rounded-3xl"
                  style={{
                    width: `${progress}%`,
                    maxWidth: "100%",
                  }}
                />
              )}
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                // autoFocus
                autoComplete="on"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-blue-500 transition-all text-black placeholder:text-gray-400 relative z-10 bg-transparent text-sm sm:text-base ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
                required
              />
            </div>
            {isLoading ? (
              <button
                type="button"
                onClick={stopAnalysis}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-3xl hover:bg-red-700 transition-all flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <Square className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>
                  {progress > 0 && progress < 100
                    ? `Stop (${progress}%)`
                    : "Stop"}
                </span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!url.trim()}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Analyze</span>
              </button>
            )}
          </div>
          {isLoading && (
            <div className="text-xs sm:text-sm text-blue-800 rounded-3xl mt-2 px-3 py-2">
              Analyzing your website will take just couple of minutes.
              {aiEnrichment && (
                <div className="text-xs text-purple-700 mt-1">
                  AI enhancement will take approximately:{" "}
                  {progressMsg.includes("AI enrichment") &&
                  progressMsg.match(/\d+\/\d+/)
                    ? (() => {
                        const match = progressMsg.match(/(\d+)\/(\d+)/);
                        if (match) {
                          const total = parseInt(match[2]);
                          // Each AI request takes ~10 seconds due to rate limiting
                          const seconds = total * 10;
                          const minutes = Math.ceil(seconds / 60);
                          return `${seconds} seconds (${minutes} minute${
                            minutes > 1 ? "s" : ""
                          })`;
                        }
                        return "calculating...";
                      })()
                    : "calculating..."}
                </div>
              )}
            </div>
          )}
          {isLoading && progressMsg && (
            <div className="text-xs text-blue-700 px-3">{progressMsg}</div>
          )}
          {!url.trim() && (
            <p className="text-xs text-gray-500 mt-1 px-3">
              Enter the website URL you want to analyze for LLM crawler paths
            </p>
          )}
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="text-sm font-semibold text-gray-800 mb-2 block">
            LLM Bot Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4 shadow-sm">
            {llmBots.map((bot) => (
              <label
                key={bot.value}
                className="flex items-center space-x-2 sm:space-x-3 cursor-pointer rounded px-2 py-2 transition border border-transparent select-none group"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    setSelectedBots((prev) =>
                      prev.includes(bot.value)
                        ? prev.filter((b) => b !== bot.value)
                        : [...prev, bot.value]
                    );
                  }
                }}
              >
                <span className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedBots.includes(bot.value)}
                    onChange={() => {
                      setSelectedBots((prev) =>
                        prev.includes(bot.value)
                          ? prev.filter((b) => b !== bot.value)
                          : [...prev, bot.value]
                      );
                    }}
                    className="peer appearance-none w-4 h-4 sm:w-5 sm:h-5 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <svg
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 10l4 4 6-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {bot.label}
                  </span>
                  <div className="text-xs text-gray-500 pl-1">
                    {bot.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* AI Enrichment Option */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={aiEnrichment}
                    onChange={(e) => setAiEnrichment(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 w-4 h-4 sm:w-5 sm:h-5"
                    disabled={isLoading}
                  />
                  <span className="font-medium text-purple-900 text-sm sm:text-base">
                    Enable AI Enrichment
                  </span>
                </label>
              </div>
              <p className="text-xs sm:text-sm text-purple-800">
                Use AI to generate summaries, context snippets, and semantic
                analysis for each page. This enhances the llms.txt file with
                richer content for better LLM understanding.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
            <span className="text-red-800 text-sm sm:text-base">{error}</span>
          </div>
        )}

        {analysisResult && analysisResult.metadata && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
              <span className="text-green-800 font-medium text-sm sm:text-base">
                Analysis Complete!
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-900">Website</div>
                <div className="text-gray-600 truncate">
                  {analysisResult.metadata.title}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-900">Paths Found</div>
                <div className="text-gray-600">
                  {analysisResult.paths.length}
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg sm:col-span-2 lg:col-span-1">
                <div className="font-medium text-gray-900">AI Enrichment</div>
                <div className="text-gray-600">
                  {analysisResult.aiGeneratedContent &&
                  analysisResult.aiGeneratedContent.length > 0
                    ? "Enabled"
                    : "Disabled"}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">
                Analysis Summary
              </h4>
              <p className="text-blue-800 text-sm">
                Found {analysisResult.paths.length} paths on{" "}
                {analysisResult.metadata.title}.
                {aiEnrichment &&
                  " AI enrichment has been applied to enhance content understanding."}
                You can now proceed to select which paths to include in your
                llms.txt file.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default WebsiteAnalyzer;
