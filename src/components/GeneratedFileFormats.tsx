"use client";
import React from "react";
import { FileText, BookOpen } from "lucide-react";

const GeneratedFileFormats = () => {
  const fileFormats = [
    {
      icon: FileText,
      title: "llms.txt (Concise)",
      description: "Optimized for quick AI context and efficient processing",
      color: "text-blue-600",
      features: [
        "50-200 carefully curated links",
        "Hierarchical organization by importance",
        "Actionable descriptions (10-50 words)",
        "Optimized for quick AI context",
        "Follows official Markdown structure",
        "Full content with metadata",
      ],
    },
    {
      icon: BookOpen,
      title: "llms-full.txt (Comprehensive)",
      description: "Complete documentation coverage for advanced AI systems",
      color: "text-purple-600",
      features: [
        "Complete documentation coverage",
        "Full content with metadata",
        "Structured content outlines",
        "includes metadata",
        "Full content with first few body paragraphs",
        "Ideal for RAG systems",
      ],
    },
  ];

  return (
    <section id="generated-file-formats" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Generated File Formats
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Choose the right format for your AI content control needs
          </p>
        </div>

        {/* File Formats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {fileFormats.map((format, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 hover:border-gray-300 transition-colors shadow-lg"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <div
                  className={`inline-flex p-3 sm:p-4 rounded-lg bg-gray-100 ${format.color} mr-4`}
                >
                  <format.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${format.color} underline`}>
                    {format.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-1">
                    {format.description}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 sm:space-y-3">
                {format.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700 text-sm sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeneratedFileFormats;
