'use client';
import React from 'react';
import { FileText, Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <FileText className="h-8 w-8 text-blue-600" />
              <Bot className="h-4 w-4 text-green-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              TheLLMsTxt.com
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#generator" className="text-gray-700 hover:text-blue-600 transition-colors">
              Generator
            </a>
            <a href="#what-is" className="text-gray-700 hover:text-blue-600 transition-colors">
              What is llms.txt?
            </a>
            <a href="#how-to-use" className="text-gray-700 hover:text-blue-600 transition-colors">
              How To Use
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;