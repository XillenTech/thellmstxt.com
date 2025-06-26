'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is a User-Agent?",
      answer: "A User-Agent identifies which AI crawler or bot is accessing your website. For example, 'ChatGPT-User' is OpenAI's crawler, while 'Google-Extended' is Google's AI training crawler. Using '*' applies the rule to all AI crawlers."
    },
    {
      question: "What is the difference between Allow and Disallow?",
      answer: "Allow tells AI crawlers they can access and learn from specific paths on your website. Disallow blocks them from accessing those paths. Use Allow for content you want AI to understand, and Disallow for private or sensitive areas."
    },
    {
      question: "Is this the same as robots.txt?",
      answer: "No, they serve different purposes. robots.txt controls search engine crawlers like Google and Bing, while llms.txt specifically controls AI model training crawlers like ChatGPT and Gemini. You can use both files together."
    },
    {
      question: "How can I generate a file for my Shopify store?",
      answer: "You can manually add rules like 'Allow: /products/*' and 'Allow: /collections/*' using the tool above. For a fully automated, one-click solution that syncs with your store and handles all eCommerce-specific paths, visit our premium service at llmstxt.store."
    },
    {
      question: "Where do I upload the llms.txt file?",
      answer: "Upload the file to your website's root directory, so it's accessible at yoursite.com/llms.txt. This is the same location where you'd place robots.txt or sitemap.xml files."
    },
    {
      question: "Do I need to update my llms.txt file regularly?",
      answer: "Only when your website structure changes significantly. If you add new sections, change URL patterns, or want to modify which areas AI can access, you should update your llms.txt file accordingly."
    }
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
            Everything you need to know about llms.txt files.
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
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;re here to help you optimize your website for AI crawlers.
            </p>
            <a
              href="mailto:support@thellmstxt.com"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              <span>Get Support</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;