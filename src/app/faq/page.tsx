"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is llms.txt and how does it work?",
      answer:
        "llms.txt is a protocol that controls how AI models interact with your website content. Our free llms.txt generator online helps create this file to manage AI crawlers like ChatGPT and Gemini. The llms.txt format spec defines rules using User-Agents to identify specific AI crawlers or use '*' for all crawlers.",
    },
    {
      question: "What are the key benefits of llms.txt implementation?",
      answer:
        "The benefits of llms.txt include granular control over AI access, protection of sensitive content, and improved AI-driven visibility. Using our llms.txt generator tool, you can automate llms.txt generation while ensuring your content is properly indexed by AI systems. This is especially valuable for SEO and content discovery.",
    },
    {
      question: "How does llms.txt compare to robots.txt?",
      answer:
        "When comparing llms.txt vs robots.txt, the key difference is their purpose. While robots.txt manages traditional search engine crawlers, llms.txt specifically controls AI training models. Many hosts supporting llms.txt recommend using both files - robots.txt for search engines and llms.txt for AI crawlers.",
    },
    {
      question: "How can I implement llms.txt for my eCommerce site?",
      answer:
        "For eCommerce platforms, we offer specialized solutions like our llms.txt tool for Shopify. When comparing llms.txt generator vs manual creation, our best llms.txt generator provides automated rules for product pages, collections, and sensitive areas. For advanced features, our llms.txt generator API enables automated updates as your store grows.",
    },
    {
      question: "Where should I place my llms.txt file?",
      answer:
        "After using our free llms.txt generator online, upload the file to your website's root directory (yoursite.com/llms.txt). The llms.txt integration guide recommends this location for maximum compatibility with hosts supporting llms.txt.",
    },
    {
      question: "How often should I update my llms.txt file?",
      answer:
        "When using our llms.txt generator tool, we recommend reviewing your rules quarterly. Compare llms.txt tools to find one that helps automate llms.txt generation for your evolving website structure. This ensures AI crawlers always have current access rules.",
    },
    {
      question: "How does llms.txt affect SEO and AI visibility?",
      answer:
        "Learning how to use llms.txt for SEO is crucial for modern visibility. While it doesn't directly impact traditional SEO, proper implementation helps AI systems better understand and recommend your content. Our llms.txt integration guide explains how to optimize for both search engines and AI crawlers.",
    },
    {
      question: "Which websites can benefit from llms.txt?",
      answer:
        "Whether you need llms.txt for eCommerce sites or content platforms, our llms.txt generator tool works with any website type. Compare llms.txt tools vs plugins to find the best solution for your specific needs. The llms.txt format spec is designed to be universally compatible.",
    },
    {
      question: "What happens without an llms.txt file?",
      answer:
        "Without implementing llms.txt, AI crawlers make autonomous decisions about accessing your content. Using our free llms.txt generator online helps establish clear rules. The benefits of llms.txt include protecting sensitive data while ensuring valuable content remains accessible to AI systems.",
    },
    {
      question: "How can I verify my llms.txt is working?",
      answer:
        "After using our llms.txt generator tool, verify the file at yourdomain.com/llms.txt. For advanced validation, compare llms.txt tools that offer testing features. Many hosts supporting llms.txt provide verification tools to ensure proper implementation.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How to Create llms.txt: Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to use our free llms.txt generator online and optimize
            your website for AI crawlers with our comprehensive guide.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Need Help with llms.txt Implementation?
            </h3>
            <p className="text-gray-600 mb-6">
              Our experts can help you choose between llms.txt generator vs
              manual creation approaches.
            </p>
            <a
              href="mailto:support@thellmstxt.com"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <span>Get Support</span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ← Back to Generator
          </Link>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
