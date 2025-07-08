"use client";
import React from "react";
import { FileText, Bot, Shield, Search } from "lucide-react";

export default function WhatIsLLMsPage() {
  const features = [
    {
      icon: Bot,
      title: "AI Crawler Control",
      description:
        "Use our free llms.txt generator tool to control how AI models like ChatGPT and Gemini access and learn from your website content.",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Privacy Protection",
      description:
        "The llms.txt format spec allows you to block AI crawlers from accessing sensitive areas while allowing beneficial content indexing.",
      color: "text-green-600",
    },
    {
      icon: Search,
      title: "Content Optimization",
      description:
        "Learn how to use llms.txt for SEO and guide AI models to your most important content with our integration guide.",
      color: "text-purple-600",
    },
    {
      icon: FileText,
      title: "Simple Implementation",
      description:
        "Compare llms.txt tools vs plugins - our free llms.txt generator online requires no complex setup or technical knowledge.",
      color: "text-orange-600",
    },
  ];

  return (
    <main className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What is llms.txt? The Complete Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to create llms.txt files and automate llms.txt generation
            for your website. Compare the best llms.txt generator options
            available.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Understanding llms.txt: Benefits and Implementation
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-6">
              <p>
                The llms.txt format spec provides a standardized protocol for
                controlling how AI language models interact with your content.
                Whether you need an llms.txt for eCommerce sites or content
                platforms, our llms.txt generator API and tools help you
                maintain control over your digital presence.
              </p>
              <p>
                When comparing llms.txt vs robots.txt, it&apos;s important to
                note that while robots.txt manages search engine crawlers,
                llms.txt specifically controls AI training models. Many hosts
                supporting llms.txt now recommend using both files for
                comprehensive crawler management.
              </p>
              <p>
                For Shopify stores and ecommerce platforms, our llms.txt tool
                for Shopify simplifies implementation. Choose between llms.txt
                generator vs manual creation based on your needs - our free
                generator provides an easy starting point while premium tools
                offer advanced automation features.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-gray-50 ${feature.color} mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How llms.txt Works: Format Specification
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                The File Structure
              </h3>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># llms.txt</div>
                <div className="text-blue-400">User-agent: *</div>
                <div className="text-green-400">Allow: /blog/*</div>
                <div className="text-red-400">Disallow: /private/</div>
                <div className="text-yellow-400">Disallow: /admin/</div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What It Means
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>User-agent:</strong> Specifies which AI crawler the
                    rule applies to
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>Allow:</strong> Permits AI crawlers to access these
                    paths
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    <strong>Disallow:</strong> Blocks AI crawlers from these
                    paths
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-7xl mx-auto">
          <div className="rounded-2xl p-8 shadow-xl border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Key Differences: llms.txt vs robots.txt
              </h2>
              <p className="text-gray-600 mt-2">
                Understanding when to use each protocol for maximum protection
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl p-6 shadow-lg border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600">
                    robots.txt
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">For Search Engines</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Controls search engine crawlers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Affects SEO and search rankings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Used by Google, Bing, etc.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Focuses on indexing control</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl p-6 shadow-lg border">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg">
                    <Bot className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-600">
                    llms.txt
                  </h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">For AI Systems</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Controls AI language models</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Affects AI recommendations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Used by ChatGPT, Claude, Gemini</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Focuses on content access control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
