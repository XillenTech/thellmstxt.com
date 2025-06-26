'use client';
import React from 'react';

interface PlatformSelectorProps {
  selectedPlatform: string;
  onPlatformSelect: (platform: string) => void;
}

const PlatformSelector = ({ selectedPlatform, onPlatformSelect }: PlatformSelectorProps) => {
  const platforms = [
    { id: 'shopify', name: 'Shopify', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'woocommerce', name: 'WooCommerce', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'bigcommerce', name: 'BigCommerce', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'magento', name: 'Magento', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Click Setup for Your Platform</h3>
      <p className="text-gray-600 mb-6">
        Select your eCommerce platform to automatically configure common settings.
      </p>
      
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformSelect(selectedPlatform === platform.id ? '' : platform.id)}
            className={`
              ${platform.color} text-white font-semibold py-4 px-6 rounded-lg 
              transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg
              ${selectedPlatform === platform.id ? 'ring-4 ring-blue-200 scale-105' : ''}
            `}
          >
            {platform.name}
          </button>
        ))}
      </div>
      
      {selectedPlatform && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            ✓ Platform-specific paths have been automatically configured for {platforms.find(p => p.id === selectedPlatform)?.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;