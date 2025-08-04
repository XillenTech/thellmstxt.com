"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Clock,
  Globe,
  FileText,
  Link,
  Calendar,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  status: string;
  pagesCrawled: number;
  linksFound: number;
  pathsFound: number;
}

export default function HistoryPage() {
  const { user, token } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not logged in
    if (!user || !token) {
      router.push("/login");
      return;
    }

    fetchHistory();
  }, [user, token, router]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);

      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const response = await fetch(`${API_BASE_URL}/api/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();
      if (data.success) {
        setHistory(data.history);
      } else {
        setError(data.error || "Failed to fetch history");
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to load your scraping history");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "pending":
        return "⏳";
      case "failed":
        return "❌";
      default:
        return "❓";
    }
  };

  if (!user || !token) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Clock className="w-8 h-8 mr-3 text-blue-600" />
            Your Scraping History
          </h1>
          <p className="text-gray-600">
            View all the websites you&apos;ve analyzed with TheLLMsTxt
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600">Loading your history...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchHistory}
              className="mt-2 text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No scraping history yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by analyzing your first website to see it appear here.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Analyzing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Globe className="w-5 h-5 text-blue-600 mr-2" />
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {item.url}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(item.timestamp)}
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)} {item.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      <span className="font-semibold">{item.pagesCrawled}</span>{" "}
                      pages crawled
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Link className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">
                      <span className="font-semibold">{item.linksFound}</span>{" "}
                      links found
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <FileText className="w-4 h-4 mr-2 text-purple-600" />
                    <span className="text-sm">
                      <span className="font-semibold">{item.pathsFound}</span>{" "}
                      unique paths
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
