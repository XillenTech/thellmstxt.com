"use client";
import React, { useState } from "react";
import { FileText, Sparkles, BookOpen, Map } from "lucide-react";
import GeneratorTab from "./GeneratorTab";
import LLMsFullTab from "./LLMsFullTab";
import MarkdownTab from "./MarkdownTab";
import SitemapToLLMsTab from "./SitemapToLLMsTab";

const TabbedGenerator = () => {
  const [activeTab, setActiveTab] = useState("llms-txt");

  const tabs = [
    {
      id: "llms-txt",
      label: "llms.txt",
      icon: FileText,
    },
    {
      id: "llms-full",
      label: "llms-full",
      icon: Sparkles,
    },
    {
      id: "markdown",
      label: "Markdown",
      icon: BookOpen,
    },
    {
      id: "sitemap",
      label: "Sitemap to llms.txt",
      icon: Map,
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "llms-txt":
        return <GeneratorTab />;
      case "llms-full":
        return <LLMsFullTab />;
      case "markdown":
        return <MarkdownTab />;
      case "sitemap":
        return <SitemapToLLMsTab />;
      default:
        return <GeneratorTab />;
    }
  };

  return (
    <section
      id="generator"
      className="py-8 sm:py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free llms.txt Generator
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Analyze your website and generate llms.txt files for LLM crawlers.
            Build your file step by step with AI-powered enhancements.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-wrap border-b border-gray-200">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-0 px-2 py-2 sm:px-3 sm:py-3 flex flex-col items-center space-y-1 transition-all cursor-pointer duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                    <div className="text-center">
                      <div className={`font-medium text-xs ${isActive ? "text-blue-700" : "text-gray-700"}`}>
                        {tab.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
};

export default TabbedGenerator;
