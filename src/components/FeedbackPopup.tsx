/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, MessageCircle } from "lucide-react";

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string, email?: string) => void;
  page?: string;
}

export default function FeedbackPopup({ isOpen, onClose, onSubmit, page = "llms-generator" }: FeedbackPopupProps) {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Debug logging
  console.log("FeedbackPopup render - isOpen:", isOpen, "page:", page);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(feedback.trim(), email.trim() || undefined);
      setIsSubmitted(true);
      
      // Reset form after a short delay
      setTimeout(() => {
        setFeedback("");
        setEmail("");
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFeedback("");
      setEmail("");
      setIsSubmitted(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={popupRef}
      className="fixed bottom-4 left-2 right-2 sm:left-4 sm:right-auto sm:max-w-md"
      style={{ 
        zIndex: 999999, 
        position: 'fixed',
        isolation: 'isolate'
      }}
    >
      {/* Modal */}
      <div className="bg-white rounded-lg shadow-xl w-full transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Quick Feedback
            </h3>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Thank you!
              </h4>
              <p className="text-gray-600">
                Your feedback has been submitted successfully.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  How was your experience? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you think about the LLMs.txt generator..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">
                  We&apos;ll only use this to follow up on your feedback
                </p>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={!feedback.trim() || isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
