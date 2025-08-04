/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";

interface IPResponse {
  success: boolean;
  ip: string;
  userAgent: string;
}

export default function UserIPDisplay() {
  const [ipData, setIpData] = useState<IPResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Determine API base URL from env or fallback
  const BASE_API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchIP = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_API_URL}/api/user-ip`);
        const data = await response.json();

        if (data.success) {
          setIpData(data);
        } else {
          setError("Failed to fetch IP address");
        }
      } catch (err) {
        console.error("Error fetching IP address:", err);
        setError("Network error while fetching IP");
      } finally {
        setLoading(false);
      }
    };

    fetchIP();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-blue-700">
            Loading your IP address...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-red-700">Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!ipData) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-green-800 mb-1">
            Your IP Address
          </h3>
          <p className="text-lg font-mono text-green-900">{ipData.ip}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
            Live
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-green-700">
        <span className="font-medium">User Agent:</span>{" "}
        {ipData.userAgent.substring(0, 50)}...
      </div>
    </div>
  );
}
