"use client";
import React from "react";
import { FileText, Bot, Shield, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WhatIsLLMsPage() {
  const features = [
    {
      icon: Bot,
      title: "AI Crawler Control",
      description:
        "Tell AI models like ChatGPT and Gemini exactly which parts of your website they can access and learn from.",
      color: "text-blue-600",
    },
    {
      icon: Shield,
      title: "Privacy Protection",
      description:
        "Block AI crawlers from accessing sensitive areas like admin panels, user accounts, and private content.",
      color: "text-green-600",
    },
    {
      icon: Search,
      title: "Content Optimization",
      description:
        "Guide AI models to your most important content, ensuring they understand your site's structure and purpose.",
      color: "text-purple-600",
    },
    {
      icon: FileText,
      title: "Simple Implementation",
      description:
        "Just a plain text file placed in your website's root directory. No complex setup or technical knowledge required.",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      <Header />
      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What is llms.txt?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple text file that tells AI crawlers how to interact with
              your website. Think of it as a roadmap for artificial
              intelligence.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Understanding llms.txt: The AI Crawler Control Protocol
              </h2>
              <div className="prose prose-lg text-gray-700 space-y-6">
                <p>
                  llms.txt is a standardized protocol that allows website owners
                  to control how AI language models and crawlers interact with
                  their content. Similar to robots.txt for search engines,
                  llms.txt provides explicit instructions to AI systems about
                  which parts of your website they can access, analyze, and
                  learn from.
                </p>
                <p>
                  As AI assistants like ChatGPT, Claude, and Gemini become
                  increasingly popular for product research and recommendations,
                  having a properly configured llms.txt file ensures your
                  business appears accurately in AI-powered conversations and
                  maintains control over your digital presence.
                </p>
                <p>
                  The file works by defining specific rules that AI crawlers
                  must follow when accessing your website. These rules can allow
                  access to product pages, blog content, and other public
                  information while blocking sensitive areas like admin panels,
                  user accounts, or private content that shouldn&apos;t be
                  shared with AI systems.
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
              How llms.txt Works
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
                      <strong>User-agent:</strong> Specifies which AI crawler
                      the rule applies to
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>Allow:</strong> Permits AI crawlers to access
                      these paths
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
                  Key Differences from robots.txt
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding the distinct roles of these two protocols
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
                  <p className="text-gray-600 mb-4 text-sm">
                    For Search Engines
                  </p>
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
      <Footer />
    </>
  );
}
