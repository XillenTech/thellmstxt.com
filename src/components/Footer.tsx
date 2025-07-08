"use client";
import React from "react";
import { FileText, Bot, ExternalLink, ShoppingCart } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <FileText className="h-8 w-8 text-blue-400" />
                <Bot className="h-4 w-4 text-green-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold">TheLLMsTxt.com</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The easiest way to create llms.txt files for any website. Take
              control of how AI crawlers see your content.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/Xillentech01"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/what-is-llms-txt"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  What is llms.txt?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn More</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 TheLLMsTxt.com. Making AI crawling simple for everyone.
            </p>
            <div className="mt-4 md:mt-0">
              <a
                href="https://llmstxt.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Premium eCommerce llms.txt by llmstxt.store</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
