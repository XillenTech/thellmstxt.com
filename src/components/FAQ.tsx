"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is llms.txt and how does it differ from robots.txt?",
      answer:
        "llms.txt is a protocol that controls how AI models interact with your website content. When comparing llms.txt vs robots.txt, they serve different purposes - robots.txt manages search engine crawlers, while llms.txt specifically controls AI training models. Our free llms.txt generator online helps you create and manage both files effectively.",
    },
    {
      question: "How do I implement llms.txt for my website?",
      answer:
        "You can use our best llms.txt generator tool to create your file in minutes. The llms.txt format spec requires placing the file in your root directory at yoursite.com/llms.txt. For ecommerce platforms, we offer specialized solutions like our llms.txt tool for Shopify to automate llms.txt generation.",
    },
    {
      question: "What are the benefits of using llms.txt?",
      answer:
        "The benefits of llms.txt include protecting sensitive content while optimizing AI visibility. Our llms.txt integration guide shows how to use llms.txt for SEO and content discovery. When you compare llms.txt tools vs plugins, a dedicated generator provides better control over how AI systems interact with your site.",
    },
    {
      question: "Should I choose manual creation or use a generator?",
      answer:
        "When considering llms.txt generator vs manual creation, our llms.txt generator API offers automated updates and validation. For eCommerce sites, the generator ensures proper protection of sensitive areas while maintaining product visibility. Many hosts supporting llms.txt recommend using a generator for accuracy.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Learn how to create llms.txt files and optimize your website for AI interactions.
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

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Want to Learn More About llms.txt?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our complete guide to understand what is llms.txt and how to implement it effectively for your website.
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
