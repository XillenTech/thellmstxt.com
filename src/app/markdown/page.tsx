"use client";
import React, { useState } from "react";
import MarkdownGenerator from "@/components/MarkdownGenerator";
import {
  Sparkles,
  FileText,
  Brain,
  BookOpen,
  Zap,
  Search,
  Lightbulb,
} from "lucide-react";

export default function MarkdownPage() {
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showGenerator, setShowGenerator] = useState(false);

  const handleAnalyze = () => {
    if (websiteUrl.trim()) {
      setShowGenerator(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-100 to-teal-100 px-4 py-2 rounded-full border border-green-200">
                <Sparkles className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  AI Documentation Generator
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Markdown Generator
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                Documentation Edition
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Generate comprehensive{" "}
              <span className="font-semibold text-green-600">
                markdown documentation
              </span>{" "}
              for your website structure, perfect for AI crawlers and
              documentation purposes.
            </p>
          </div>

          {/* URL Input Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-12">
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
          <div className="grid md:grid-cols-3 gap-8 mb-12">
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

          {/* What is Markdown Generation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is Markdown Generation?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full"></div>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                <span className="font-semibold text-green-600">
                  Markdown generation
                </span>{" "}
                creates structured documentation of your website in markdown
                format, making it easier for AI systems to understand and
                process your content. This is particularly useful for AI
                crawlers that need to comprehend your website&apos;s structure
                and content for better training and responses.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                The generated markdown includes:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Website structure and navigation hierarchy
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Page content summaries and descriptions
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Content type classifications
                    </span>
                  </li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      SEO-relevant information and metadata
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Link relationships and site architecture
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      Content accessibility and usage guidelines
                    </span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-gray-600 mt-6 leading-relaxed">
                This documentation can be used by AI systems to better
                understand your website&apos;s purpose, structure, and content,
                leading to more accurate AI responses and recommendations for
                your users.
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
        </div>
      </main>

      {/* <Footer /> */}

      {/* Markdown Generator Modal */}
      {showGenerator && (
        <MarkdownGenerator
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
