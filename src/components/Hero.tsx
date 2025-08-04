"use client";
import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  const scrollToGenerator = () => {
    document
      .getElementById("generator")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 bg-blue-100 px-3 sm:px-4 py-2 rounded-full">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium text-blue-800">
                Free llms.txt Generator Tool
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            The Best llms.txt Generator
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              For Your Website
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Learn what is llms.txt and how to create llms.txt files instantly.
            Our free llms.txt generator online helps you automate llms.txt
            generation for
            <span className="font-semibold text-blue-600"> ChatGPT</span> and
            <span className="font-semibold text-purple-600"> Gemini</span>.
            Perfect for eCommerce sites and content platforms.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <button
              onClick={scrollToGenerator}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Generate Your llms.txt Now</span>
              <ArrowDown className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Compare llms.txt tools vs plugins • Instant download
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                <span className="text-xs sm:text-sm text-gray-500 ml-2">
                  llms.txt format spec example
                </span>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm">
                <div className="text-green-600">
                  # Benefits of llms.txt implementation
                </div>
                <div className="text-blue-600">User-agent: *</div>
                <div className="text-blue-600">Allow: /blog/*</div>
                <div className="text-purple-600">Disallow: /private/</div>
                <div className="text-orange-600">Disallow: /admin/</div>
              </div>
            </div>
            <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
              Generated with our llms.txt Generator API
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
