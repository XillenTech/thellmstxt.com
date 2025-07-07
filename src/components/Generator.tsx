/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import WebsiteAnalyzer from "./WebsiteAnalyzer";
import PathSelector from "./PathSelector";
// import RuleBuilder from "./RuleBuilder";
import OutputPreview from "./OutputPreview";

import LLMsFullGenerator from "./LLMsFullGenerator";
import MarkdownGenerator from "./MarkdownGenerator";
import type { PathSelection } from "../types/backend";
import { Sparkles, FileText, FolderOpen, Settings } from "lucide-react";

export interface Rule {
  id: string;
  userAgent: string;
  type: "Allow" | "Disallow";
  path: string;
}

const Generator = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");
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
    }[];
  } | null>(null);
  const [selectedPaths, setSelectedPaths] = useState<PathSelection[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "analyze" | "select" | "generate"
  >("analyze");

  // Enhanced features state
  const [showLLMsFull, setShowLLMsFull] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [enhancedFeatures, setEnhancedFeatures] = useState({
    includeSummaries: false,
    includeContextSnippets: false,
    hierarchicalLayout: false,
    aiEnrichment: false,
  });

  useEffect(() => {
    generateContent();
  }, [rules, analysisData, enhancedFeatures]);

  const generateContent = () => {
    if (!analysisData) {
      setGeneratedContent("");
      return;
    }

    // Build quick metadata lookup
    const metaMap = new Map<
      string,
      { title?: string; description?: string; keywords?: string }
    >();
    if (
      analysisData.pageMetadatas &&
      Array.isArray(analysisData.pageMetadatas)
    ) {
      analysisData.pageMetadatas.forEach((m) => metaMap.set(m.path, m));
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
          if (meta?.keywords) {
            content += `  • Keywords: ${meta?.keywords || "N/A"}\n`;
          }
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
          // Find corresponding path data
          const pathData = selectedPaths.find((p) => p.path === rule.path);
          if (pathData) {
            if (enhancedFeatures.includeSummaries && pathData.summary) {
              content += `    • Summary: ${pathData.summary}\n`;
            }
            if (
              enhancedFeatures.includeContextSnippets &&
              pathData.contextSnippet
            ) {
              content += `    • Context: ${pathData.contextSnippet}\n`;
            }
            if (pathData.priority) {
              content += `    • Priority: ${pathData.priority}\n`;
            }
            if (pathData.contentType) {
              content += `    • Type: ${pathData.contentType}\n`;
            }
            if (pathData.aiUsageDirective) {
              content += `    • AI Usage: ${pathData.aiUsageDirective}\n`;
            }
          }
          const meta2 = metaMap.get(rule.path);
          if (meta2?.title) {
            content += `    • Title: ${meta2.title}\n`;
          }
          if (meta2?.description) {
            content += `    • Description: ${meta2.description}\n`;
          }
          if (meta2?.keywords) {
            content += `    • Keywords: ${meta2?.keywords || "N/A"}\n`;
          }
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
  }) => {
    setAnalysisData(data);
    setSelectedPaths(data.paths);
    setCurrentStep("select");
  };

  const handlePathSelectionChange = (paths: PathSelection[]) => {
    setSelectedPaths(paths);
  };

  const generateFromSelectedPaths = () => {
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

  const resetAnalysis = () => {
    setAnalysisData(null);
    setSelectedPaths([]);
    setRules([]);
    setCurrentStep("analyze");
    setEnhancedFeatures({
      includeSummaries: false,
      includeContextSnippets: false,
      hierarchicalLayout: false,
      aiEnrichment: false,
    });
  };

  // Determine step completion status
  const isStep1Complete = analysisData !== null;
  const isStep2Complete = currentStep === "generate";
  const isStep3Complete = currentStep === "generate" && rules.length > 0;

  return (
    <section
      id="generator"
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free llms.txt Generator
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your website and generate llms.txt files for LLM crawlers.
            Build your file step by step with AI-powered enhancements.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isStep1Complete
                    ? "bg-green-600 text-white"
                    : currentStep === "analyze"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="font-medium">Analyze Website</span>
            </div>
            <div className="w-8 h-1 bg-gray-200"></div>
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isStep2Complete
                    ? "bg-green-600 text-white"
                    : currentStep === "select"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="font-medium">Select Paths</span>
            </div>
            <div className="w-8 h-1 bg-gray-200"></div>
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isStep3Complete
                    ? "bg-green-600 text-white"
                    : currentStep === "generate"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="font-medium">Generate</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Step 1: Website Analysis */}
            {currentStep === "analyze" && (
              <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
            )}

            {/* Step 2: Path Selection */}
            {currentStep === "select" && analysisData && (
              <div className="space-y-6">
                {/* Enhanced Features Toggle */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Enhanced Features
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enhancedFeatures.aiEnrichment}
                        onChange={(e) =>
                          setEnhancedFeatures({
                            ...enhancedFeatures,
                            aiEnrichment: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">
                        Enable AI Enrichment
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enhancedFeatures.includeSummaries}
                        onChange={(e) =>
                          setEnhancedFeatures({
                            ...enhancedFeatures,
                            includeSummaries: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">
                        Include AI Summaries
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enhancedFeatures.includeContextSnippets}
                        onChange={(e) =>
                          setEnhancedFeatures({
                            ...enhancedFeatures,
                            includeContextSnippets: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">
                        Include Context Snippets
                      </span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enhancedFeatures.hierarchicalLayout}
                        onChange={(e) =>
                          setEnhancedFeatures({
                            ...enhancedFeatures,
                            hierarchicalLayout: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700">Hierarchical Layout</span>
                    </label>
                  </div>
                </div>

                <PathSelector
                  paths={selectedPaths}
                  onSelectionChange={handlePathSelectionChange}
                />
                <div className="flex space-x-4">
                  <button
                    onClick={generateFromSelectedPaths}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Generate llms.txt from Selected Paths
                  </button>
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Start Over
                  </button>
                  <button
                    onClick={() => setCurrentStep("analyze")}
                    className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Download Only (no RuleBuilder) */}
            {currentStep === "generate" && (
              <div className="space-y-8">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep("select")}
                    className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                  >
                    Back to Path Selection
                  </button>
                  <button
                    onClick={resetAnalysis}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Start Over
                  </button>
                </div>

                {/* Enhanced Generation Options */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Generation Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setShowLLMsFull(true)}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <FileText className="w-6 h-6 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          LLMs Full
                        </div>
                        <div className="text-sm text-gray-600">
                          Complete site content
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowMarkdown(true)}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                    >
                      <FolderOpen className="w-6 h-6 text-green-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          Markdown Pages
                        </div>
                        <div className="text-sm text-gray-600">
                          Individual .md files
                        </div>
                      </div>
                    </button>

                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        generatedContent
                      )}`}
                      download="llms.txt"
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <Settings className="w-6 h-6 text-purple-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          Standard llms.txt
                        </div>
                        <div className="text-sm text-gray-600">
                          Basic configuration
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview - Only show in step 3 */}
          {currentStep === "generate" && (
            <div className="mt-8">
              <OutputPreview content={generatedContent} />
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Generators */}
      {showLLMsFull && analysisData && (
        <LLMsFullGenerator
          websiteUrl={analysisData.metadata.url}
          onClose={() => setShowLLMsFull(false)}
        />
      )}

      {showMarkdown && analysisData && (
        <MarkdownGenerator
          websiteUrl={analysisData.metadata.url}
          onClose={() => setShowMarkdown(false)}
        />
      )}
    </section>
  );
};

export default Generator;
