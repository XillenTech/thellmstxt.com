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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Custom Generator</h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>Product Feed URL (Optional, Recommended)</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </label>
          <input
            type="url"
            value={config.productFeedUrl}
            onChange={(e) => updateConfig('productFeedUrl', e.target.value)}
            placeholder="/products.xml or /feed.xml"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide a link to your Google Merchant Center or other .xml/.csv product feed for the most accurate indexing.
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>Product Pages Path</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </label>
          <input
            type="text"
            value={config.productPaths}
            onChange={(e) => updateConfig('productPaths', e.target.value)}
            placeholder="/products/*, /collections/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            Use a * as a wildcard for all products. Separate multiple paths with commas.
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>Paths to Disallow</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </label>
          <textarea
            value={config.disallowPaths}
            onChange={(e) => updateConfig('disallowPaths', e.target.value)}
            rows={3}
            placeholder="/cart, /checkout, /account"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <p className="text-xs text-gray-500 mt-1">
            We&apos;ve pre-filled common private pages. Add any others you need to protect, separated by commas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomGenerator;