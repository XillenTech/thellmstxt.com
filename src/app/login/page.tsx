"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      router.push("/");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          Log In
        </h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-gray-900 placeholder:text-gray-400 transition"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-gray-900 placeholder:text-gray-400 transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <div className="mt-4 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-700 hover:underline font-semibold transition-colors hover:text-blue-700"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
