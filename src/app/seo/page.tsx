"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOAnalyzer from "@/components/SEOAnalyzer";
import BrokenLinkDetector from "@/components/BrokenLinkDetector";
import { Search, AlertTriangle } from "lucide-react";

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState<"analysis" | "broken-links">("analysis");

  const tabs = [
    {
      id: "analysis" as const,
      label: "SEO Analysis",
      icon: Search,
      description: "Analyze your website for SEO issues including duplicate titles, meta descriptions, canonical URLs, and more."
    },
    {
      id: "broken-links" as const,
      label: "Broken Link Detection",
      icon: AlertTriangle,
      description: "Scan your website for broken internal and external links. Get detailed reports with status codes and context information."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">SEO Tools</h1>
            <p className="text-lg text-gray-600">
              Comprehensive SEO analysis and broken link detection tools to improve your website&apos;s performance and user experience.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg">
            {activeTab === "analysis" && (
              <div>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">SEO Analysis</h2>
                  <p className="text-gray-600">{tabs[0].description}</p>
                </div>
                <div className="p-6">
                  <SEOAnalyzer />
                </div>
              </div>
            )}

            {activeTab === "broken-links" && (
              <div>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Broken Link Detection</h2>
                  <p className="text-gray-600">{tabs[1].description}</p>
                </div>
                <div className="p-6">
                  <BrokenLinkDetector />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
