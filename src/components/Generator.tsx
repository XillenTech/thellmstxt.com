/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import WebsiteAnalyzer from "./WebsiteAnalyzer";
import PathSelector from "./PathSelector";
// import RuleBuilder from "./RuleBuilder";
import OutputPreview from "./OutputPreview";
import AdSidebar from "./AdSidebar";
import type { PathSelection } from "../types/backend";

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

  useEffect(() => {
    generateContent();
  }, [rules, analysisData]);

  const generateContent = () => {
    if (!analysisData) {
      setGeneratedContent("");
      return;
    }

    // --- DETAILS SECTION (format1.txt style) ---
    let content = `# ${analysisData.metadata.title || "Website Overview"}\n`;
    content += `# Website: ${analysisData.metadata.url}\n`;
    content += `# Last updated: ${new Date().toISOString().slice(0, 10)}\n`;
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
    content += `Navigation Structure\n----------------------\n`;
    // List allowed paths
    const allowedPaths = rules.filter((r) => r.type === "Allow");
    if (allowedPaths.length > 0) {
      content += `# Allowed Paths\n`;
      allowedPaths.forEach((rule) => {
        content += `- ${rule.path}\n`;
        // Robust metadata match: normalize and allow partial matches
        const normalize = (p: string) => p.replace(/\/$/, "").toLowerCase();
        const meta = analysisData.pageMetadatas?.find(
          (m) =>
            normalize(m.path) === normalize(rule.path) ||
            normalize(rule.path).startsWith(normalize(m.path)) ||
            normalize(m.path).startsWith(normalize(rule.path))
        );
        if (meta) {
          if (meta.title) content += `    • Title: ${meta.title}\n`;
          if (meta.description)
            content += `    • Description: ${meta.description}\n`;
          if (meta.keywords) content += `    • Keywords: ${meta.keywords}\n`;
        } else {
          content += `    • No metadata found for this path\n`;
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

  // const addRule = (rule: Omit<Rule, "id">) => {
  //   const newRule = {
  //     ...rule,
  //     id: Date.now().toString(),
  //   };
  //   setRules([...rules, newRule]);
  // };

  // const removeRule = (id: string) => {
  //   setRules(rules.filter((rule) => rule.id !== id));
  // };

  // const resetRules = () => {
  //   setRules([]);
  // };

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
            Build your file step by step.
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

        <div className="grid lg:grid-cols-4 gap-8">
          <div
            className={`${
              currentStep === "generate" ? "lg:col-span-3" : "lg:col-span-2"
            } space-y-8`}
          >
            {/* Step 1: Website Analysis */}
            {currentStep === "analyze" && (
              <WebsiteAnalyzer onAnalysisComplete={handleAnalysisComplete} />
            )}

            {/* Step 2: Path Selection */}
            {currentStep === "select" && analysisData && (
              <div className="space-y-6">
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
                <div className="flex flex-col items-start space-y-4">
                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                      generatedContent
                    )}`}
                    download="llms.txt"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Download llms.txt
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview - Only show in step 3 */}
          {currentStep === "generate" && (
            <div className="lg:col-span-4">
              <OutputPreview content={generatedContent} />
            </div>
          )}

          {/* Ad Sidebar - Show in steps 1 and 2 */}
          {(currentStep === "analyze" || currentStep === "select") && (
            <div className="lg:col-span-2">
              <AdSidebar />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Generator;
