"use client";
import React from "react";
import { Shield, FileCheck, Search, BarChart3 } from "lucide-react";

const WhyUseLLMsTxt = () => {
  const features = [
    {
      icon: Shield,
      title: "Protect Your Content",
      description:
        "Control how AI models access and use your website content for training or inference. Set clear boundaries for commercial vs non-commercial use.",
      color: "text-blue-600",
    },
    {
      icon: FileCheck,
      title: "Legal Compliance",
      description:
        "Meet GDPR, HIPAA, and other regulatory requirements by explicitly declaring AI access policies and data retention rules.",
      color: "text-green-600",
    },
    {
      icon: Search,
      title: "SEO Benefits",
      description:
        "Improve search engine understanding of your AI policies. Help search engines and AI models respect your content preferences.",
      color: "text-purple-600",
    },
    {
      icon: BarChart3,
      title: "Crawl History",
      description:
        "Track your website crawl history and see which sites you have crawled (only for signed in users)",
      color: "text-orange-600",
    },
  ];

  return (
    <section id="why-use-llmstxt" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Why Use Free LLMsTXT Generator for AI Models Content Control?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div
                className={`inline-flex p-2 sm:p-3 rounded-lg bg-gray-50 ${feature.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUseLLMsTxt;
