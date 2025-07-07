"use client";
import React from "react";
import { Settings, Copy, Upload, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HowToUsePage() {
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
    <>
      <Header />
      <main className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From zero to AI-optimized in minutes. No technical expertise
              required.
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
                    Complete Guide to Implementing{" "}
                    <span className="text-blue-600">llms.txt</span>
                  </h2>
                </div>
                <div className="prose prose-lg text-gray-700 max-w-none">
                  <p>
                    <span className="font-semibold text-blue-700">
                      Implementing llms.txt
                    </span>{" "}
                    on your website is straightforward and requires no technical
                    background. The process involves creating a simple text file
                    with specific rules that tell AI crawlers how to interact
                    with your content, then uploading it to your website&apos;s
                    root directory.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded my-4">
                    <span className="font-semibold text-blue-700">Tip:</span>{" "}
                    The file should be accessible at{" "}
                    <span className="font-mono text-blue-700">
                      yourdomain.com/llms.txt
                    </span>{" "}
                    once properly uploaded. Most AI systems will automatically
                    check for this file when crawling your website, ensuring
                    they follow your specified guidelines for content access and
                    usage.
                  </div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-semibold text-blue-700">
                        Step 1:
                      </span>{" "}
                      Create a <span className="font-mono">llms.txt</span> file
                      with your rules.
                    </li>
                    <li>
                      <span className="font-semibold text-blue-700">
                        Step 2:
                      </span>{" "}
                      Upload it to your website&apos;s root directory.
                    </li>
                    <li>
                      <span className="font-semibold text-blue-700">
                        Step 3:
                      </span>{" "}
                      Test by visiting{" "}
                      <span className="font-mono">yourdomain.com/llms.txt</span>
                      .
                    </li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded my-4">
                    <span className="font-semibold text-yellow-700">Note:</span>{" "}
                    Unlike <span className="font-mono">robots.txt</span> which
                    primarily affects search engine indexing,{" "}
                    <span className="font-mono">llms.txt</span> specifically
                    controls how AI language models like ChatGPT, Claude, and
                    Gemini access and reference your content in their responses
                    and recommendations.
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
                    <li>• Always allow access to your main product pages</li>
                    <li>• Block admin areas and user account pages</li>
                    <li>• Include your blog and educational content</li>
                    <li>• Test your file at yourdomain.com/llms.txt</li>
                    <li>• Keep the file simple and well-organized</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Don&apos;t block your entire website</li>
                    <li>• Avoid overly complex rule structures</li>
                    <li>• Don&apos;t forget to upload to the root directory</li>
                    <li>• Avoid using robots.txt syntax</li>
                    <li>• Don&apos;t include sensitive information in the file</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
