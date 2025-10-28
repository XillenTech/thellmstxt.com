"use client";
import React, { useState } from "react";
import LLMsFullGenerator from "./LLMsFullGenerator";
import { Sparkles, FileText, Settings, Brain, Zap } from "lucide-react";

const LLMsFullTab = () => {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  const handleAnalyze = () => {
    if (websiteUrl.trim()) {
      setShowGenerator(true);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* URL Input Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
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
      <div className="grid md:grid-cols-3 gap-8">
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
};

export default LLMsFullTab;
