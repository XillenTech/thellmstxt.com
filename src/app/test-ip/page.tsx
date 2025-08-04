"use client";
import UserIPDisplay from "@/components/UserIPDisplay";
import CookieConsent from "@/components/CookieConsent";

export default function TestIPPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          IP Address Test Page
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your IP Information
          </h2>
          <UserIPDisplay />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Cookie Consent Test
          </h2>
          <p className="text-gray-600 mb-4">
            This page tests both the IP display functionality and cookie consent
            popup. The cookie consent should appear at the bottom of the page if
            you haven&apos;t made a choice yet.
          </p>
          <button
            onClick={() => localStorage.removeItem("cookieConsent")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Reset Cookie Consent
          </button>
        </div>

        <CookieConsent
          onAccept={() => console.log("Cookies accepted on test page")}
          onReject={() => console.log("Cookies rejected on test page")}
        />
      </div>
    </div>
  );
}
