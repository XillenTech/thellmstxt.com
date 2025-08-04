"use client";
import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

export default function CookieConsent({
  onAccept,
  onReject,
}: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  // const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const handleAccept = () => {
    setIsAnimating(true);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "accepted");
      setIsVisible(false);
      onAccept();
    }, 300);
  };

  const handleReject = () => {
    setIsAnimating(true);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "rejected");
      setIsVisible(false);
      onReject();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isAnimating ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Your Privacy, Our Priority
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies and similar technologies to enhance your
                    experience, analyze traffic, and serve relevant content. We
                    may also collect your public IP address for security and
                    analytics purposes. You&apos;re in control — choose what
                    you&apos;re comfortable with.
                  </p>
                </div>
              </div>

              {/* <button
                onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center space-x-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>{showDetails ? "Hide details" : "Learn more"}</span>
                {showDetails ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button> */}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                Reject All
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
