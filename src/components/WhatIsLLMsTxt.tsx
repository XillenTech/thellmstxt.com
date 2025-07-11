"use client";
import React from "react";
import { FileText, Bot, Shield, Search } from "lucide-react";
import Link from "next/link";

const WhatIsLLMsTxt = () => {
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
    <section id="what-is-llmstxt" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            What is llms.txt?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            A simple text file that tells AI crawlers how to interact with your
            website. Think of it as a roadmap for artificial intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
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

        <div className="flex justify-center">
          <Link href="/what-is-llms-txt">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-pink-600 hover:bg-pink-700 text-white text-base sm:text-lg font-semibold rounded-full shadow transition-all duration-200 cursor-pointer">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLLMsTxt;
