'use client';
import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Free llms.txt Generator Tool</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The Best llms.txt Generator
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              For Your Website
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn what is llms.txt and how to create llms.txt files instantly. Our free llms.txt generator online helps you automate llms.txt generation for 
            <span className="font-semibold text-blue-600"> ChatGPT</span> and 
            <span className="font-semibold text-purple-600"> Gemini</span>. Perfect for eCommerce sites and content platforms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToGenerator}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Generate Your llms.txt Now</span>
              <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-500">Compare llms.txt tools vs plugins • Instant download</p>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm text-gray-500 ml-2">llms.txt format spec example</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-600"># Benefits of llms.txt implementation</div>
                <div className="text-blue-600">User-agent: *</div>
                <div className="text-blue-600">Allow: /blog/*</div>
                <div className="text-purple-600">Disallow: /private/</div>
                <div className="text-orange-600">Disallow: /admin/</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Generated with our llms.txt Generator API
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;