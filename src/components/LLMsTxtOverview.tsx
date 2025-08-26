"use client";
import React from "react";
import { FolderOpen } from "lucide-react";

const LLMsTxtOverview = () => {
  const filePlacements = [
    {
      title: "Basic Website",
      rootDir: "/",
      files: ["index.html", "about.html", "llms.txt", "llms-full.txt", "..."],
      icon: FolderOpen,
    },
    {
      title: "React/Angular/Vue Projects",
      rootDir: "/public",
      files: ["index.html", "llms.txt", "llms-full.txt", "..."],
      icon: FolderOpen,
    },
    {
      title: "Next.js Projects",
      rootDir: "/public",
      files: ["llms.txt", "llms-full.txt", "..."],
      icon: FolderOpen,
    },
    {
      title: "Static Site Generators",
      rootDir: "/dist or /build",
      files: ["index.html", "llms.txt", "llms-full.txt", "..."],
      icon: FolderOpen,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            <span className="text-blue-600">thellmstxt.com</span> - Optimize Your Website for AI Search with LLMs.txt
          </h1>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
            <p>
              Search engines are evolving, and AI-powered platforms (ChatGPT, Perplexity, Claude, Gemini) try to understand sites. 
              <span className="font-semibold text-blue-600"> LLMs.txt</span> is your digital &quot;doorman&quot; for LLMs - simple, powerful, and easy to update.
            </p>
            <p>
              Unlike <span className="font-semibold">robots.txt</span> or <span className="font-semibold">sitemap.xml</span>, 
              <span className="font-semibold text-blue-600"> LLMs.txt</span> is designed for Large Language Models, helping them find, process, and index your content correctly.
            </p>
          </div>
        </div>

        {/* What is LLMs.txt Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8">
            What is LLMs.txt?
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200">
            <p className="text-gray-700 text-lg mb-6">
              <span className="font-semibold text-blue-600">LLMs.txt</span> is a simple, structured file placed at the root of your website.
            </p>
            <p className="text-gray-700 mb-4">It helps AI models:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>Discover your most valuable content</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>Skip irrelevant or duplicate pages</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>Understand your site&apos;s purpose and structure</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>Deliver accurate answers in AI-driven search tools</span>
              </li>
            </ul>
            <p className="text-gray-700 mt-6 font-semibold">
                In short: <span className="text-blue-600">LLMs.txt</span> speaks the language of AI.
            </p>
          </div>
        </div>

        {/* Generated Files Explained Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8">
            Generated Files Explained
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200">
            <p className="text-gray-700 text-lg mb-6">
              Our generator creates two optimized files:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-blue-600 mb-2">llms.txt</h3>
                <p className="text-gray-700 text-sm">
                  Concise summary with 50-200 carefully curated links for quick AI context
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-purple-600 mb-2">llms-full.txt</h3>
                <p className="text-gray-700 text-sm">
                  Comprehensive documentation with full content and metadata for detailed AI analysis
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              Both files work together to provide AI crawlers with the right level of detail they need.
            </p>
          </div>
        </div>

        {/* How to use it Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8">
            How to use it?
          </h2>
          <div className="bg-gray-50 rounded-xl p-6 sm:p-8 border border-gray-200">
            <p className="text-gray-700 text-lg mb-6">
              Generate your llms.txt file below.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>Upload both files to the root of your website (<code className="bg-gray-200 px-1 rounded">/llms.txt</code> and <code className="bg-gray-200 px-1 rounded">/llms-full.txt</code>).</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>AI crawlers will automatically respect your preferences.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Example Placement Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 sm:mb-8 text-center">
            Example placement:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filePlacements.map((placement, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <placement.icon className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">{placement.title}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Root Directory: <code className="bg-gray-200 px-1 rounded text-xs">{placement.rootDir}</code></p>
                  <div className="bg-white rounded border border-gray-200 p-3">
                    <p className="text-xs text-gray-500 mb-2">Files:</p>
                    {placement.files.map((file, fileIndex) => (
                      <div key={fileIndex} className="text-xs text-gray-700 font-mono">
                        {file}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LLMsTxtOverview;
