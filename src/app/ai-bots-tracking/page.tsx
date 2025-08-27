"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Bot } from "lucide-react";
import AIBotsDashboard from "@/components/AIBotsDashboard";

export default function AIBotsTrackingPage() {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingPassword, setIsCheckingPassword] = useState(false);

  // Check if user is authenticated for this page
  useEffect(() => {
    const authStatus = sessionStorage.getItem("ai-bots-page-auth");
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
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"
        }/api/verify-ai-bots-password`,
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
        sessionStorage.setItem("ai-bots-page-auth", "true");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Bots Tracking
            </h1>
            <p className="text-gray-600 mt-2">
              Enter password to access the dashboard
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="text-red-600 text-sm">{passwordError}</div>
            )}

            <button
              type="submit"
              disabled={isCheckingPassword}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isCheckingPassword ? "Verifying..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🤖 AI Bots Tracking Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor AI crawler visits to your website in real-time
          </p>
        </div>

        <AIBotsDashboard />
      </div>
    </div>
  );
}
