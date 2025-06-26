'use client';
import React from 'react';

const AdSidebar = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 h-64 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Advertisement</p>
            <p className="text-gray-400 text-xs mt-1">300x250 Medium Rectangle</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-gray-100 border-2 border-dashed border-gray-300 h-96 flex items-center justify-center rounded-lg">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Advertisement</p>
            <p className="text-gray-400 text-xs mt-1">300x600 Skyscraper</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdSidebar;