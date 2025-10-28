/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import WebsiteAnalyzer from "./WebsiteAnalyzer";
import PathSelector from "./PathSelector";
import OutputPreview from "./OutputPreview";
import FeedbackPopup from "./FeedbackPopup";
import type { PathSelection } from "../types/backend";
import { LLM_BOT_CONFIGS, LLMBot } from "../types/backend";
import { useAuth } from "./AuthProvider";
import { useFeedback } from "../hooks/useFeedback";

export interface Rule {
  id: string;
  userAgent: string;
  type: "Allow" | "Disallow";
  path: string;
}

const GeneratorTab = () => {
  const { user } = useAuth();
  const { submitFeedback } = useFeedback();
  const [rules, setRules] = useState<Rule[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [pendingDownload, setPendingDownload] = useState(false);
  const [analysisData, setAnalysisData] = useState<{
    metadata: {
      title: string;
      description: string;
      url: string;
      totalPagesCrawled?: number;
      totalLinksFound?: number;
      uniquePathsFound?: number;
    };
    paths: PathSelection[];
    pageMetadatas?: {
      path: string;
      title?: string;
      description?: string;
      keywords?: string;
      bodyContent?: string;
    }[];
    selectedBots?: LLMBot[];
    seoAnalysisResult?: any;
    isSEOAnalyzing?: boolean;
    aiGeneratedContent?: Array<{
      path: string;
      summary: string;
      contextSnippet: string;
      keywords: string[];
      contentType: string;
      priority: string;
      aiUsageDirective: string;
    }>;
  } | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<PathSelection[]>([]);
  const [selectedBots, setSelectedBots] = useState<LLMBot[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "analyze" | "select" | "generate"
  >("analyze");

  const [enhancedFeatures, setEnhancedFeatures] = useState({
    includeSummaries: false,
    includeContextSnippets: false,
    hierarchicalLayout: false,
    aiEnrichment: false,
    includeBodyContent: false, // Disabled for llms.txt
  });

  // Add state to track if blur overlay has been dismissed
  const [blurOverlayDismissed, setBlurOverlayDismissed] = useState(false);

  useEffect(() => {
    generateContent();
  }, [rules, analysisData, enhancedFeatures]);

  const generateContent = () => {
    if (!analysisData || !analysisData.metadata) {
      setGeneratedContent("");
      return;
    }

    // Build quick metadata lookup
    const metaMap = new Map<
      string,
      {
        title?: string;
        description?: string;
        keywords?: string;
        bodyContent?: string;
      }
    >();
    if (
      analysisData.pageMetadatas &&
      Array.isArray(analysisData.pageMetadatas)
    ) {
      console.log(
        "📋 Frontend received pageMetadatas:",
        analysisData.pageMetadatas.length
      );
      let bodyContentCount = 0;
      analysisData.pageMetadatas.forEach((m) => {
        metaMap.set(m.path, m);
        if (m.bodyContent) {
          bodyContentCount++;
          console.log(
            `📄 ${m.path} has body content: ${m.bodyContent.length} chars`
          );
        }
      });
      console.log(`📊 Total pages with body content: ${bodyContentCount}`);
      console.log(`🔧 Enhanced features state:`, enhancedFeatures);
    }

    // Build AI content lookup
    const aiContentMap = new Map<
      string,
      {
        path: string;
        summary: string;
        contextSnippet: string;
        keywords: string[];
        contentType: string;
        priority: string;
        aiUsageDirective: string;
      }
    >();
    if (
      analysisData.aiGeneratedContent &&
      Array.isArray(analysisData.aiGeneratedContent)
    ) {
      analysisData.aiGeneratedContent.forEach((ai) =>
        aiContentMap.set(ai.path, ai)
      );
    }

    // --- DETAILS SECTION (format1.txt style) ---
    let content = `# ${analysisData.metadata.title || "Website Overview"}\n`;
    content += `# Website: ${analysisData.metadata.url}\n`;
    content += `# Last updated: ${new Date().toISOString().slice(0, 10)}\n`;
    content += `# AI Enrichment: ${
      enhancedFeatures.aiEnrichment ? "Enabled" : "Disabled"
    }\n`;
    content += `\n`;
    if (analysisData.metadata.description) {
      content += `> ${analysisData.metadata.description}\n\n`;
    }

    content += `## Company Information\n`;
    content += `- **Name**: ${analysisData.metadata.title || "N/A"}\n`;
    content += `- **Website**: ${analysisData.metadata.url}\n`;
    if (analysisData.metadata.totalPagesCrawled)
      content += `- **Pages Crawled**: ${analysisData.metadata.totalPagesCrawled}\n`;
    if (analysisData.metadata.totalLinksFound)
      content += `- **Total Links Found**: ${analysisData.metadata.totalLinksFound}\n`;
    if (analysisData.metadata.uniquePathsFound)
      content += `- **Unique Paths Found**: ${analysisData.metadata.uniquePathsFound}\n`;
    content += `- **Generated**: ${new Date().toISOString()}\n`;
    content += `\n`;

    content += `## Access Permissions for LLMs\n`;
    content += `LLMs and indexing agents are encouraged to read and use this file for accurate citation and integration guidance.\n\n`;

    // Add AI tool permissions section
    const allBots = Object.keys(LLM_BOT_CONFIGS) as LLMBot[];
    const allowedBots = selectedBots;
    const disallowedBots = allBots.filter((b) => !allowedBots.includes(b));
    content += `## AI Tool Permissions\n\n`;
    content += `Allowed:\n`;
    allowedBots.forEach((bot) => {
      content += `- ${bot} (${LLM_BOT_CONFIGS[bot].description})\n`;
    });
    content += `\nDisallowed:\n`;
    disallowedBots.forEach((bot) => {
      content += `- ${bot} (${LLM_BOT_CONFIGS[bot].description})\n`;
    });
    content += `\n`;

    // --- PATHS SECTION (format2.txt style) ---
    if (enhancedFeatures.hierarchicalLayout) {
      content += `# Hierarchical Site Structure\n`;
      content += `=======================\n\n`;

      // Group paths by content type or priority
      const groupedPaths = groupPathsByType(selectedPaths);

      Object.entries(groupedPaths).forEach(([group, paths]) => {
        content += `## ${group}\n`;
        paths.forEach((path) => {
          content += `- ${path.path}\n`;
          if (enhancedFeatures.includeSummaries && path.summary) {
            content += `  • Summary: ${path.summary}\n`;
          }
          if (enhancedFeatures.includeContextSnippets && path.contextSnippet) {
            content += `  • Context: ${path.contextSnippet}\n`;
          }
          if (path.priority) {
            content += `  • Priority: ${path.priority}\n`;
          }
          if (path.contentType) {
            content += `  • Type: ${path.contentType}\n`;
          }
          if (path.aiUsageDirective) {
            content += `  • AI Usage: ${path.aiUsageDirective}\n`;
          }
          const meta = metaMap.get(path.path);
          if (meta?.title) {
            content += `  • Title: ${meta.title}\n`;
          }
          if (meta?.description) {
            content += `  • Description: ${meta.description}\n`;
          }
          // Include keywords from scraped data
          if (meta?.keywords) {
            content += `  • Keywords: ${meta?.keywords || "N/A"}\n`;
          }
          // Include AI-generated keywords when AI enrichment is enabled
          const aiContent = aiContentMap.get(path.path);
          if (
            enhancedFeatures.aiEnrichment &&
            aiContent?.keywords &&
            aiContent.keywords.length > 0
          ) {
            content += `  • AI Keywords: ${aiContent.keywords.join(", ")}\n`;
          }
          // Body content removed from llms.txt - only for llms-full.txt
        });
        content += `\n`;
      });
    } else {
      content += `Navigation Structure\n----------------------\n`;
      // List allowed paths
      const allowedPaths = rules.filter((r) => r.type === "Allow");
      if (allowedPaths.length > 0) {
        content += `# Allowed Paths\n`;
        allowedPaths.forEach((rule) => {
          content += `- ${rule.path}\n`;
          // Find corresponding path data and AI content
          const pathData = selectedPaths.find((p) => p.path === rule.path);
          const aiContent = aiContentMap.get(rule.path);

          if (pathData) {
            // Use AI content if available, otherwise fall back to path data
            const summary = aiContent?.summary || pathData.summary;
            const contextSnippet =
              aiContent?.contextSnippet || pathData.contextSnippet;
            const priority = aiContent?.priority || pathData.priority;
            const contentType = aiContent?.contentType || pathData.contentType;
            const aiUsageDirective =
              aiContent?.aiUsageDirective || pathData.aiUsageDirective;

            if (enhancedFeatures.includeSummaries && summary) {
              content += `    • Summary: ${summary}\n`;
            }
            if (enhancedFeatures.includeContextSnippets && contextSnippet) {
              content += `    • Context: ${contextSnippet}\n`;
            }
            if (priority) {
              content += `    • Priority: ${priority}\n`;
            }
            if (contentType) {
              content += `    • Type: ${contentType}\n`;
            }
            if (aiUsageDirective) {
              content += `    • AI Usage: ${aiUsageDirective}\n`;
            }
          }
          const meta2 = metaMap.get(rule.path);
          if (meta2?.title) {
            content += `    • Title: ${meta2.title}\n`;
          }
          if (meta2?.description) {
            content += `    • Description: ${meta2.description}\n`;
          }
          // Include keywords from scraped data
          if (meta2?.keywords) {
            content += `    • Keywords: ${meta2?.keywords || "N/A"}\n`;
          }
          // Include AI-generated keywords when AI enrichment is enabled
          if (
            enhancedFeatures.aiEnrichment &&
            aiContent?.keywords &&
            aiContent.keywords.length > 0
          ) {
            content += `    • AI Keywords: ${aiContent.keywords.join(", ")}\n`;
          }
          // Body content removed from llms.txt - only for llms-full.txt
        });
      }
      // List disallowed paths
      const disallowedPaths = rules.filter((r) => r.type === "Disallow");
      if (disallowedPaths.length > 0) {
        content += `# Disallowed Paths\n`;
        disallowedPaths.forEach((rule) => {
          content += `- ${rule.path}\n`;
        });
      }
      content += `\n`;
    }

    // Optionally, add a sitemap section if available in analysisData
    if (analysisData.paths && analysisData.paths.length > 0) {
      content += `Sitemap Structure\n-----------------\n`;
      analysisData.paths.forEach((p) => {
        content += `- ${p.path}\n`;
      });
      content += `\n`;
    }

    setGeneratedContent(content);
  };

  const groupPathsByType = (paths: PathSelection[]) => {
    const groups: Record<string, PathSelection[]> = {
      "Main Pages": [],
      "Content Pages": [],
      Documentation: [],
      "Legal & Terms": [],
      Other: [],
    };

    paths.forEach((path) => {
      const contentType = path.contentType || "page";
      const pathLower = path.path.toLowerCase();

      if (pathLower === "/" || pathLower === "/home") {
        groups["Main Pages"].push(path);
      } else if (
        contentType === "docs" ||
        pathLower.includes("docs") ||
        pathLower.includes("documentation")
      ) {
        groups["Documentation"].push(path);
      } else if (
        contentType === "terms" ||
        pathLower.includes("privacy") ||
        pathLower.includes("terms") ||
        pathLower.includes("legal")
      ) {
        groups["Legal & Terms"].push(path);
      } else if (
        contentType === "blog" ||
        contentType === "project" ||
        pathLower.includes("blog") ||
        pathLower.includes("project")
      ) {
        groups["Content Pages"].push(path);
      } else {
        groups["Other"].push(path);
      }
    });

    // Remove empty groups
    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  };

  const handleAnalysisComplete = (data: {
    metadata: { title: string; description: string; url: string };
    paths: PathSelection[];
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
    asyncJob?: boolean;
    message?: string;
  }) => {
    console.log("📊 handleAnalysisComplete called with:", {
      hasSEOResult: !!data.seoAnalysisResult,
      isSEOAnalyzing: data.isSEOAnalyzing,
      paths: data.paths?.length,
      seoAnalysisResult: data.seoAnalysisResult ? "EXISTS" : "NULL",
      timestamp: new Date().toISOString()
    });
    
    setAnalysisData(data);
    setSelectedPaths(data.paths);
    setSelectedBots(data.selectedBots || []);

    // Body content is not enabled for llms.txt - only for llms-full.txt
    console.log(
      `🔍 Analysis complete - Body content available but disabled for llms.txt`
    );

    // Enable enhanced features if AI content is available
    if (data.aiGeneratedContent && data.aiGeneratedContent.length > 0) {
      setEnhancedFeatures({
        includeSummaries: true,
        includeContextSnippets: true,
        hierarchicalLayout: false,
        aiEnrichment: true,
        includeBodyContent: false, // Always false for llms.txt
      });
    }

    // Only advance step if not asyncJob
    if (!data.asyncJob) {
      setCurrentStep("select");
    }
  };

  const handlePathSelectionChange = (paths: PathSelection[]) => {
    setSelectedPaths(paths);
  };

  const generateFromSelectedPaths = () => {
    if (!analysisData) return;

    // Always proceed with generation first
    proceedWithGeneration();
    
    // Show feedback popup for non-authenticated users (in background)
    if (!user) {
      setShowFeedbackPopup(true);
    }
  };

  const proceedWithGeneration = () => {
    if (!analysisData) return;

    const newRules: Rule[] = [];

    // Add allow rules
    selectedPaths
      .filter((path) => path.allow)
      .forEach((path) => {
        newRules.push({
          id: Date.now().toString() + Math.random(),
          userAgent: "*",
          type: "Allow",
          path: path.path,
        });
      });

    // Add disallow rules
    selectedPaths
      .filter((path) => !path.allow)
      .forEach((path) => {
        newRules.push({
          id: Date.now().toString() + Math.random(),
          userAgent: "*",
          type: "Disallow",
          path: path.path,
        });
      });

    setRules(newRules);
    setCurrentStep("generate");
  };

  const handleDownload = () => {
    // Show feedback popup before download for all users
    setPendingDownload(true);
    setShowFeedbackPopup(true);
  };

  const handleFeedbackSubmit = async (feedback: string, email?: string) => {
    try {
      await submitFeedback(feedback, email, "llms-generator");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const handleFeedbackClose = () => {
    setShowFeedbackPopup(false);
    
    if (pendingDownload) {
      // Trigger download
      setPendingDownload(false);
      const link = document.createElement('a');
      link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(generatedContent)}`;
      link.download = 'llms.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    // No need to handle generation case since it's already done
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setSelectedPaths([]);
    setRules([]);
    setCurrentStep("analyze");
    setBlurOverlayDismissed(false);
    setEnhancedFeatures({
      includeSummaries: false,
      includeContextSnippets: false,
      hierarchicalLayout: false,
      aiEnrichment: false,
      includeBodyContent: false,
    });
  };

  // Determine step completion status
  const isStep1Complete = analysisData !== null;
  const isStep2Complete = currentStep === "generate";
  const isStep3Complete = currentStep === "generate" && rules.length > 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Step Indicator */}
      <div className="flex justify-center mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
          <div
            className={`flex items-center space-x-2 ${
              isStep1Complete
                ? "text-green-600"
                : currentStep === "analyze"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                isStep1Complete
                  ? "bg-green-600 text-white"
                  : currentStep === "analyze"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="font-medium text-sm sm:text-base">
              Analyze Website
            </span>
          </div>
          <div className="hidden sm:block w-8 h-1 bg-gray-200"></div>
          <div className="sm:hidden w-1 h-8 bg-gray-200"></div>
          <div
            className={`flex items-center space-x-2 ${
              isStep2Complete
                ? "text-green-600"
                : currentStep === "select"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                isStep2Complete
                  ? "bg-green-600 text-white"
                  : currentStep === "select"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="font-medium text-sm sm:text-base">
              Select Paths
            </span>
          </div>
          <div className="hidden sm:block w-8 h-1 bg-gray-200"></div>
          <div className="sm:hidden w-1 h-8 bg-gray-200"></div>
          <div
            className={`flex items-center space-x-2 ${
              isStep3Complete
                ? "text-green-600"
                : currentStep === "generate"
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm sm:text-base ${
                isStep3Complete
                  ? "bg-green-600 text-white"
                  : currentStep === "generate"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="font-medium text-sm sm:text-base">Generate</span>
          </div>
        </div>
      </div>

      {/* Step 1: Website Analysis */}
      {currentStep === "analyze" && (
        <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      )}

      {/* Step 2: Path Selection */}
      {currentStep === "select" && analysisData && (
        <div className="space-y-4 sm:space-y-6">
          <PathSelector
            paths={selectedPaths}
            onSelectionChange={handlePathSelectionChange}
            isAuthenticated={!!user || blurOverlayDismissed}
            onBlurOverlayDismiss={() => setBlurOverlayDismissed(true)}
            onContinueWithFeedback={() => setShowFeedbackPopup(true)}
          />
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={generateFromSelectedPaths}
              className="px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Generate llms.txt from Selected Paths
            </button>
            <button
              onClick={resetAnalysis}
              className="px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
            >
              Start Over
            </button>
            <button
              onClick={() => setCurrentStep("analyze")}
              className="px-4 sm:px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm sm:text-base"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Download Only */}
      {currentStep === "generate" && (
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setCurrentStep("select")}
              className="px-4 sm:px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm sm:text-base"
            >
              Back to Path Selection
            </button>
            <button
              onClick={resetAnalysis}
              className="px-4 sm:px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm sm:text-base"
            >
              Start Over
            </button>
            <button
              onClick={handleDownload}
              className="px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Download llms.txt
            </button>
          </div>
        </div>
      )}

      {/* Live Preview - Only show in step 3 */}
      {currentStep === "generate" && (
        <div className="mt-8">
          <OutputPreview content={generatedContent} />
        </div>
      )}

      {/* SEO Analysis Section - Separate from Live Preview */}
      {currentStep === "generate" && analysisData && (
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                SEO Analysis
              </h3>
              {analysisData.isSEOAnalyzing && (
                <div className="flex items-center text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-sm">Analyzing...</span>
                </div>
              )}
            </div>
            
            {analysisData.isSEOAnalyzing && !analysisData.seoAnalysisResult && (
              <div className="text-center py-8">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
                <p className="text-gray-600 mt-4">Analyzing your website for SEO issues...</p>
              </div>
            )}
            
            {!analysisData.isSEOAnalyzing && !analysisData.seoAnalysisResult && (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600">SEO Analysis will appear here</p>
                <p className="text-gray-500 text-sm mt-2">Waiting for analysis to complete...</p>
              </div>
            )}
            
                    {analysisData.seoAnalysisResult && (
                      <div className="space-y-6">
                        {/* Analysis Summary */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Summary</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="font-semibold text-blue-900">Pages Analyzed</span>
                              </div>
                              <p className="text-2xl font-bold text-blue-600">{analysisData.seoAnalysisResult.summary?.totalPagesAnalyzed || 0}</p>
                            </div>

                            <div className="bg-red-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <span className="font-semibold text-red-900">Issues Found</span>
                              </div>
                              <p className="text-2xl font-bold text-red-600">{analysisData.seoAnalysisResult.summary?.totalIssuesFound || 0}</p>
                            </div>

                            <div className="bg-yellow-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold text-yellow-900">Duration</span>
                              </div>
                              <p className="text-2xl font-bold text-yellow-600">
                                {analysisData.seoAnalysisResult.summary?.scanDuration ? 
                                  `${Math.floor(analysisData.seoAnalysisResult.summary.scanDuration / 1000)}s` : '0s'}
                              </p>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold text-green-900">Avg Issues/Page</span>
                              </div>
                              <p className="text-2xl font-bold text-green-600">
                                {analysisData.seoAnalysisResult.summary?.averageIssuesPerPage?.toFixed(1) || '0.0'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* SEO Score */}
                        {(() => {
                          // Calculate SEO score similar to SEOAnalyzer
                          const calculateSEOScore = (analysisResult: any) => {
                            const issues = analysisResult.issues || [];
                            const summary = analysisResult.summary || {};
                            
                            // Calculate individual category scores
                            const technicalScore = Math.max(0, Math.min(100, 
                              100 - (issues.filter((issue: any) => 
                                issue.type.includes('duplicate') || issue.type.includes('missing') || issue.type.includes('canonical')
                              ).length * 5) - (summary.duplicateTitles || 0) * 3 - (summary.duplicateMetaDescriptions || 0) * 3 - 
                              (summary.duplicateCanonicals || 0) * 4 - (summary.missingTitles || 0) * 8 - 
                              (summary.missingMetaDescriptions || 0) * 6 - (summary.missingCanonicals || 0) * 7
                            ));
                            
                            const contentScore = Math.max(0, Math.min(100, 
                              100 - (issues.filter((issue: any) => 
                                issue.type.includes('h1') || issue.type.includes('title')
                              ).length * 4) - (summary.duplicateH1s || 0) * 6 - (summary.multipleH1s || 0) * 8
                            ));
                            
                            const performanceScore = Math.max(0, Math.min(100, 
                              (summary.totalIssuesFound || 0) > 50 ? 60 : 
                              (summary.totalIssuesFound || 0) > 30 ? 70 : 
                              (summary.totalIssuesFound || 0) > 20 ? 80 : 
                              (summary.totalIssuesFound || 0) > 10 ? 90 : 100
                            ));
                            
                            const accessibilityScore = Math.max(0, Math.min(100, 
                              100 - (issues.filter((issue: any) => 
                                issue.type.includes('missing') || issue.type.includes('duplicate')
                              ).length * 3)
                            ));
                            
                            const mobileScore = Math.max(0, Math.min(100, 
                              100 - (issues.filter((issue: any) => 
                                issue.severity === 'high' || issue.type.includes('missing')
                              ).length * 4)
                            ));
                            
                            const socialScore = Math.max(0, Math.min(100, 
                              100 - (issues.filter((issue: any) => 
                                issue.type.includes('meta') || issue.type.includes('social')
                              ).length * 5)
                            ));
                            
                            // Calculate overall score (weighted average)
                            const overall = Math.round(
                              (technicalScore * 0.25) +
                              (contentScore * 0.25) +
                              (performanceScore * 0.20) +
                              (accessibilityScore * 0.15) +
                              (mobileScore * 0.10) +
                              (socialScore * 0.05)
                            );
                            
                            const getGradeFromScore = (score: number) => {
                              if (score >= 95) return 'A+';
                              if (score >= 90) return 'A';
                              if (score >= 85) return 'B+';
                              if (score >= 80) return 'B';
                              if (score >= 75) return 'C+';
                              if (score >= 70) return 'C';
                              if (score >= 65) return 'D+';
                              if (score >= 60) return 'D';
                              return 'F';
                            };
                            
                            const grade = getGradeFromScore(overall);
                            
                            // Generate recommendations
                            const recommendations = [];
                            const strengths = [];
                            const weaknesses = [];
                            
                            if (summary.duplicateTitles > 0) {
                              recommendations.push(`Fix ${summary.duplicateTitles} duplicate title tags`);
                              weaknesses.push('Duplicate title tags found');
                            } else {
                              strengths.push('No duplicate title tags');
                            }
                            
                            if (summary.duplicateMetaDescriptions > 0) {
                              recommendations.push(`Fix ${summary.duplicateMetaDescriptions} duplicate meta descriptions`);
                              weaknesses.push('Duplicate meta descriptions found');
                            } else {
                              strengths.push('No duplicate meta descriptions');
                            }
                            
                            if (summary.missingTitles > 0) {
                              recommendations.push(`Add ${summary.missingTitles} missing title tags`);
                              weaknesses.push('Missing title tags');
                            } else {
                              strengths.push('All pages have title tags');
                            }
                            
                            if (summary.missingMetaDescriptions > 0) {
                              recommendations.push(`Add ${summary.missingMetaDescriptions} missing meta descriptions`);
                              weaknesses.push('Missing meta descriptions');
                            } else {
                              strengths.push('All pages have meta descriptions');
                            }
                            
                            return {
                              overall,
                              technical: technicalScore,
                              content: contentScore,
                              performance: performanceScore,
                              accessibility: accessibilityScore,
                              mobile: mobileScore,
                              social: socialScore,
                              grade,
                              recommendations,
                              strengths,
                              weaknesses
                            };
                          };
                          
                          const seoScore = calculateSEOScore(analysisData.seoAnalysisResult);
                          
                          return (
                            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                              {/* Header */}
                              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
                                <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                  <svg className="w-8 h-8 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                  SEO Score Report
                                </h3>
                                <p className="text-blue-100 text-lg">Comprehensive analysis of your website&apos;s SEO performance</p>
                              </div>
                              
                              <div className="p-8">
                                {/* Overall Score */}
                                <div className="text-center mb-8">
                                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-blue-600 text-white mb-4">
                                    <div className="text-center">
                                      <div className="text-3xl font-bold">{seoScore.overall}/100</div>
                                      <div className="text-sm font-semibold">Grade: {seoScore.grade}</div>
                                    </div>
                                  </div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Overall SEO Score</h4>
                                  <p className="text-gray-600">
                                    {seoScore.overall >= 90 ? "Excellent SEO performance!" :
                                     seoScore.overall >= 80 ? "Good SEO performance with room for improvement" :
                                     seoScore.overall >= 70 ? "Fair SEO performance, several areas need attention" :
                                     seoScore.overall >= 60 ? "Poor SEO performance, significant improvements needed" :
                                     "Critical SEO issues require immediate attention"}
                                  </p>
                                </div>

                                {/* Score Breakdown */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span className="font-semibold text-blue-900">Technical SEO</span>
                                    </div>
                                    <div className="text-2xl font-bold text-blue-600">{seoScore.technical}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.technical}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      <span className="font-semibold text-green-900">Content Quality</span>
                                    </div>
                                    <div className="text-2xl font-bold text-green-600">{seoScore.content}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.content}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                      </svg>
                                      <span className="font-semibold text-purple-900">Performance</span>
                                    </div>
                                    <div className="text-2xl font-bold text-purple-600">{seoScore.performance}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.performance}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-orange-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                      </svg>
                                      <span className="font-semibold text-orange-900">Accessibility</span>
                                    </div>
                                    <div className="text-2xl font-bold text-orange-600">{seoScore.accessibility}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.accessibility}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-pink-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                      </svg>
                                      <span className="font-semibold text-pink-900">Mobile</span>
                                    </div>
                                    <div className="text-2xl font-bold text-pink-600">{seoScore.mobile}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.mobile}%` }}
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-indigo-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                      </svg>
                                      <span className="font-semibold text-indigo-900">Social</span>
                                    </div>
                                    <div className="text-2xl font-bold text-indigo-600">{seoScore.social}</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                      <div 
                                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${seoScore.social}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Recommendations and Analysis */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                  {/* Strengths */}
                                  {seoScore.strengths.length > 0 && (
                                    <div className="bg-green-50 p-4 rounded-lg">
                                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Strengths
                                      </h4>
                                      <ul className="space-y-2">
                                        {seoScore.strengths.map((strength, index) => (
                                          <li key={index} className="text-sm text-green-700 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            {strength}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Weaknesses */}
                                  {seoScore.weaknesses.length > 0 && (
                                    <div className="bg-red-50 p-4 rounded-lg">
                                      <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        Areas for Improvement
                                      </h4>
                                      <ul className="space-y-2">
                                        {seoScore.weaknesses.map((weakness, index) => (
                                          <li key={index} className="text-sm text-red-700 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                            {weakness}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Recommendations */}
                                  {seoScore.recommendations.length > 0 && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                      <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Recommendations
                                      </h4>
                                      <ul className="space-y-2">
                                        {seoScore.recommendations.map((recommendation, index) => (
                                          <li key={index} className="text-sm text-blue-700 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            {recommendation}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Issues by Severity */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">Issues by Severity</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <div className="text-2xl font-bold text-red-600">
                                {analysisData.seoAnalysisResult.issues?.filter((issue: any) => issue.severity === 'high').length || 0}
                              </div>
                              <div className="text-sm text-red-700">High Priority Issues</div>
                            </div>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                              <div className="text-2xl font-bold text-yellow-600">
                                {analysisData.seoAnalysisResult.issues?.filter((issue: any) => issue.severity === 'medium').length || 0}
                              </div>
                              <div className="text-sm text-yellow-700">Medium Priority Issues</div>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="text-2xl font-bold text-green-600">
                                {analysisData.seoAnalysisResult.issues?.filter((issue: any) => issue.severity === 'low').length || 0}
                              </div>
                              <div className="text-sm text-green-700">Low Priority Issues</div>
                            </div>
                          </div>
                        </div>

                        {/* Issues by Type */}
                        {analysisData.seoAnalysisResult.summary?.issuesByType && (
                          <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Issues by Type</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(analysisData.seoAnalysisResult.summary.issuesByType).map(([type, count]) => (
                                <div key={type} className="bg-gray-50 p-4 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="font-semibold text-gray-900 capitalize">
                                      {type.replace(/_/g, ' ')}
                                    </span>
                                  </div>
                                  <p className="text-2xl font-bold text-gray-600">{count as number}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Detailed Issues */}
                        {analysisData.seoAnalysisResult.issues && analysisData.seoAnalysisResult.issues.length > 0 && (
                          <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Issues</h3>
                            <div className="space-y-4">
                              {analysisData.seoAnalysisResult.issues.slice(0, 10).map((issue: any, index: number) => {
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
                                    case "high": return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
                                    case "medium": return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>;
                                    case "low": return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                                    default: return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
                                  }
                                };

                                return (
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
                                          <span className="font-semibold capitalize">
                                            {issue.type?.replace(/_/g, ' ') || 'Unknown Issue'}
                                          </span>
                                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                                            {issue.severity}
                                          </span>
                                        </div>
                                        <p className="text-gray-700 mb-2">{issue.message}</p>
                                        <div className="text-sm text-gray-600">
                                          <p><strong>Source:</strong> {issue.sourcePage}</p>
                                          {issue.affectedPages && issue.affectedPages.length > 0 && (
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
                                );
                              })}
                              {analysisData.seoAnalysisResult.issues.length > 10 && (
                                <div className="text-center py-4">
                                  <p className="text-gray-500">
                                    ... and {analysisData.seoAnalysisResult.issues.length - 10} more issues
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
          </div>
        </div>
      )}

      {/* Feedback Popup */}
      <FeedbackPopup
        isOpen={showFeedbackPopup}
        onClose={handleFeedbackClose}
        onSubmit={handleFeedbackSubmit}
        page="llms-generator"
      />
    </div>
  );
};

export default GeneratorTab;
