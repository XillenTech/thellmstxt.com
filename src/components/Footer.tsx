"use client";
import React from "react";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="sm:col-span-2">
            <div className="mb-3 sm:mb-4">
              <Logo size="md" variant="footer" />
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              The easiest way to create llms.txt files for any website. Take
              control of how AI crawlers see your content.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/thellmstxt"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <FaXTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Resources
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="/what-is-llms-txt"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  What is llms.txt?
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-use"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  How to Use
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Learn More
            </h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 TheLLMsTxt.com. Making AI crawling simple for everyone.
            </p>
            <div className="w-full md:w-auto">
              <a
                href="https://llmstxt.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-700 transition-colors w-full md:w-auto"
              >
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-center">
                  Premium eCommerce llms.txt by llmstxt.store
                </span>
                <ExternalLink className="h-2 w-2 sm:h-3 sm:w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
