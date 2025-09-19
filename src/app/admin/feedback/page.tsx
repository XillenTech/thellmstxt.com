"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, Eye, RefreshCw } from "lucide-react";
import FeedbackAdmin from "@/components/FeedbackAdmin";

export default function FeedbackAdminPage() {
  const router = useRouter();
  
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  // Check if user is authenticated for this page
  useEffect(() => {
    const authStatus = sessionStorage.getItem("feedback-admin-auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setIsCheckingPassword(true);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://central-llms-backend.onrender.com"
        }/api/verify-test-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("feedback-admin-auth", "true");
        setPassword("");
      } else {
        setPasswordError(data.error || "Incorrect password");
        setPassword("");
      }
    } catch (err) {
      console.error("Error verifying password:", err);
      setPasswordError("Failed to verify password. Please try again.");
      setPassword("");
    } finally {
      setIsCheckingPassword(false);
    }
  };

  // Show password protection screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Protected Page
            </h2>
            <p className="text-gray-600">
              This feedback admin page requires authentication to access
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-gray-50 text-gray-900 placeholder:text-gray-400 transition ${
                    passwordError
                      ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter password"
                  required
                  disabled={isCheckingPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={isCheckingPassword}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isCheckingPassword}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-red-400 focus:outline-none transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingPassword ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                  Verifying...
                </div>
              ) : (
                "Access Feedback Admin"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <FeedbackAdmin />;
}
