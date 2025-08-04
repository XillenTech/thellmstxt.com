"use client";
import React, { useState } from "react";
import LLMsFullGenerator from "@/components/LLMsFullGenerator";
import { Sparkles, FileText, Settings, Brain, Zap } from "lucide-react";

export default function LLMsFullPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  const handleAnalyze = () => {
    if (websiteUrl.trim()) {
      setShowGenerator(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <main className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full border border-blue-200">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Advanced LLMs Full Generator
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              LLMs Full Generator
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Advanced Edition
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Generate comprehensive{" "}
              <span className="font-semibold text-blue-600">llms-full.txt</span>{" "}
              files with advanced metadata and detailed crawler instructions for
              your website.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Start Generating
                </h2>
                <p className="text-gray-600">
                  Enter your website URL to begin the advanced analysis
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
                  className="flex-1 border-2 border-gray-200 rounded-xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAnalyze()}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={!websiteUrl.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Generate LLMs Full</span>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Enter the website URL you want to generate a comprehensive
                llms-full.txt file for.
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Advanced Metadata
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Includes detailed metadata about your website structure, content
                types, and crawler preferences with intelligent analysis.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Comprehensive Rules
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate detailed rules for different AI crawlers with specific
                instructions, limitations, and behavioral guidelines.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI-Powered Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Uses advanced AI to analyze your website and suggest optimal
                crawler configurations for maximum efficiency.
              </p>
            </div>
          </div>

          {/* What is llms-full.txt */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is llms-full.txt?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The{" "}
                <span className="font-semibold text-blue-600">
                  llms-full.txt
                </span>{" "}
                format is an extended version of the standard llms.txt protocol
                that includes additional metadata and detailed instructions for
                AI crawlers. It provides more granular control over how AI
                systems interact with your content, ensuring optimal performance
                and understanding.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Unlike the basic llms.txt file, llms-full.txt can include:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Detailed metadata about your website structure
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Content type specifications and preferences
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Advanced crawler behavior instructions
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Rate limiting and access frequency guidelines
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Content quality indicators and usage permissions
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Custom AI model training parameters
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* LLMs Full Generator Modal */}
      {showGenerator && (
        <LLMsFullGenerator
          websiteUrl={websiteUrl}
          onClose={() => {
            setShowGenerator(false);
            setWebsiteUrl("");
          }}
        />
      )}
    </div>
  );
}
