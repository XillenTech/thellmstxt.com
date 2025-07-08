import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="py-8 sm:py-12 pt-20 sm:pt-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* 404 Icon */}
            <div className="mb-6 sm:mb-8">
              <div className="mx-auto w-16 sm:w-24 h-16 sm:h-24 bg-red-100 rounded-full flex items-center justify-center">
                <Search className="w-8 sm:w-12 h-8 sm:h-12 text-red-600" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-3 sm:mb-4">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4">
              Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </Link>

              <Link
                href="/blogs"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Browse Blogs</span>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Popular Pages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto px-4 sm:px-0">
                <Link
                  href="/what-is-llms-txt"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  What is llms.txt?
                </Link>
                <Link
                  href="/how-to-use"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  How to Use
                </Link>
                <Link
                  href="/faq"
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
              <h4 className="text-xs sm:text-sm font-semibold text-blue-900 mb-2">
                Can&apos;t find what you&apos;re looking for?
              </h4>
              <p className="text-xs sm:text-sm text-blue-700">
                Try searching our blog for llms.txt guides, implementation tips,
                and best practices.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
