"use client";
import React from "react";

const AdBanner = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 h-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-sm font-medium">Advertisement</p>
            <p className="text-gray-400 text-xs mt-1">
              728x90 Leaderboard Banner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
