"use client";
import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const SafeToClosePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full animate-fade-in">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-bounce-in" />
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          All Done!
        </h1>
        <p className="text-lg text-gray-700 text-center mb-2">
          Your request is being processed in the background.
        </p>
        <p className="text-md text-purple-700 font-semibold mb-6">
          It is now safe to close this tab.
        </p>
          {/* Use Link for client-side navigation */}
        <Link href="/">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-150 text-lg mb-2 cursor-pointer"
            type="button"
          >
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SafeToClosePage;
