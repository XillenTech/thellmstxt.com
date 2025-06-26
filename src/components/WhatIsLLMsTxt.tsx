"use client";
import React from "react";
import { FileText, Bot, Shield, Search } from "lucide-react";

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
    <section id="what-is" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is llms.txt?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple text file that tells AI crawlers how to interact with your
            website. Think of it as a roadmap for artificial intelligence.
          </p>
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

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How llms.txt Works
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                The File Structure
              </h4>
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-400"># llms.txt</div>
                <div className="text-blue-400">User-agent: *</div>
                <div className="text-green-400">Allow: /blog/*</div>
                <div className="text-red-400">Disallow: /private/</div>
                <div className="text-yellow-400">Disallow: /admin/</div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                What It Means
              </h4>
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

        {/* Content Ad Block */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-2xl">
            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium">Advertisement</p>
              <p className="text-gray-400 text-xs mt-1">
                728x90 Content Banner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsLLMsTxt;
