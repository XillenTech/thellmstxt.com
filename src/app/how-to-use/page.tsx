"use client";
import React from "react";
import { Settings, Copy, Upload, FileText } from "lucide-react";

export default function HowToUsePage() {
  const steps = [
    {
      icon: Settings,
      title: "Generate",
      description:
        "Use our free llms.txt generator online to create your custom file with optimized rules for AI crawlers.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Copy,
      title: "Copy or Download",
      description:
        "Get your customized llms.txt format spec with one click - compare llms.txt tools and choose between manual copy or direct download.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Upload,
      title: "Upload",
      description:
        "Add the file to your root directory, joining other hosts supporting llms.txt at yoursite.com/llms.txt.",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <main className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How to Create llms.txt in 3 Simple Steps
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to use llms.txt for SEO and AI optimization in minutes
            with our best llms.txt generator.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          {/* Guide Section */}
          <div className="relative">
            <div className="absolute -left-6 top-6 hidden md:block">
              <div className="h-20 w-2 rounded bg-blue-500" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-100 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-7 h-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  What is llms.txt? Complete{" "}
                  <span className="text-blue-600">Integration Guide</span>
                </h2>
              </div>
              <div className="prose prose-lg text-gray-700 max-w-none">
                <p>
                  <span className="font-semibold text-blue-700">
                    The benefits of llms.txt
                  </span>{" "}
                  include controlling how AI models interact with your content.
                  Our llms.txt generator tool makes implementation simple,
                  whether you choose llms.txt generator vs manual creation.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded my-4">
                  <span className="font-semibold text-blue-700">Tip:</span> For
                  eCommerce platforms, our llms.txt tool for Shopify and
                  llms.txt for eCommerce site solutions provide specialized
                  features. You can also automate llms.txt generation using our
                  llms.txt generator API.
                </div>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold text-blue-700">Step 1:</span>{" "}
                    Use our free llms.txt generator online to create your file.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-700">Step 2:</span>{" "}
                    Compare llms.txt tools vs plugins for your needs.
                  </li>
                  <li>
                    <span className="font-semibold text-blue-700">Step 3:</span>{" "}
                    Follow our llms.txt integration guide for proper setup.
                  </li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-4">
                  <span className="font-semibold text-yellow-700">Note:</span>{" "}
                  Understanding llms.txt vs robots.txt is crucial - while
                  robots.txt manages search crawlers, llms.txt specifically
                  controls AI language models. Some sites also implement
                  llms-full.txt vs llms.txt for enhanced control.
                </div>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div>
            <div className="grid md:grid-cols-1 grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="text-center group flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex p-6 rounded-full ${step.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className=" rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Advanced Configuration Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Best Practices
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Follow the llms.txt format spec guidelines</li>
                  <li>• Block sensitive admin and user areas</li>
                  <li>• Include SEO-optimized content paths</li>
                  <li>• Regularly update your llms.txt file</li>
                  <li>• Keep rules organized and efficient</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Common Mistakes to Avoid
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Don&apos;t block beneficial AI interactions</li>
                  <li>• Avoid complex rule structures</li>
                  <li>• Don&apos;t mix with robots.txt syntax</li>
                  <li>• Ensure proper root directory placement</li>
                  <li>• Keep sensitive data out of comments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
