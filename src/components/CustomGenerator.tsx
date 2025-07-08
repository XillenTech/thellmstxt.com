'use client';
import React from 'react';
import { HelpCircle } from 'lucide-react';

interface CustomGeneratorProps {
  config: {
    productFeedUrl: string;
    productPaths: string;
    disallowPaths: string;
  };
  onConfigChange: (config: {
    productFeedUrl: string;
    productPaths: string;
    disallowPaths: string;
  }) => void;
}

const CustomGenerator = ({ config, onConfigChange }: CustomGeneratorProps) => {
  const updateConfig = (field: string, value: string) => {
    onConfigChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Advanced llms.txt Generator Tool</h3>
      
      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            <span>Product Feed URL for eCommerce Sites (Optional, Recommended)</span>
            <HelpCircle className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
          </label>
          <input
            type="url"
            value={config.productFeedUrl}
            onChange={(e) => updateConfig('productFeedUrl', e.target.value)}
            placeholder="/products.xml or /feed.xml"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Our llms.txt generator API integrates with your product feed to automate llms.txt generation for optimal eCommerce site protection.
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            <span>Product Pages Path (llms.txt Format Spec)</span>
            <HelpCircle className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
          </label>
          <input
            type="text"
            value={config.productPaths}
            onChange={(e) => updateConfig('productPaths', e.target.value)}
            placeholder="/products/*, /collections/*"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Unlike robots.txt, the llms.txt format spec uses wildcards to control AI crawler access. Perfect for how to use llms.txt for SEO optimization.
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            <span>Protected Paths (Benefits of llms.txt)</span>
            <HelpCircle className="h-3 sm:h-4 w-3 sm:w-4 text-gray-400" />
          </label>
          <textarea
            value={config.disallowPaths}
            onChange={(e) => updateConfig('disallowPaths', e.target.value)}
            rows={3}
            placeholder="/cart, /checkout, /account"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
          />
          <p className="text-xs text-gray-500 mt-1">
            Our free llms.txt generator online helps protect sensitive pages while allowing beneficial AI interactions. Compare llms.txt tools to see why ours is preferred by hosts supporting llms.txt.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomGenerator;