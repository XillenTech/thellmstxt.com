"use client";
import React from "react";
import { Settings, Copy, Upload } from "lucide-react";
import Link from "next/link";

const HowToUse = () => {
  const steps = [
    {
      icon: Settings,
      title: "Generate",
      description:
        "Use our free generator above to create your custom llms.txt file with the rules you need.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Copy,
      title: "Copy or Download",
      description:
        "Get your customized llms.txt file content with one click - copy to clipboard or download directly.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Upload,
      title: "Upload",
      description:
        "Add the file to the root directory of your website so it's accessible at yoursite.com/llms.txt.",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <section
      id="how-to-use"
      className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Simple 3-Step Process
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            From zero to AI-optimized in minutes. No technical expertise
            required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="text-center group flex flex-col items-center"
            >
              <div className="relative mb-4 sm:mb-6">
                <div
                  className={`inline-flex p-4 sm:p-6 rounded-full ${step.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/how-to-use">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-pink-600 hover:bg-pink-700 text-white text-base sm:text-lg font-semibold rounded-full shadow transition-all duration-200 cursor-pointer">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
