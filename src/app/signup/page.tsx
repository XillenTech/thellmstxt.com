"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
// import { useRouter } from "next/navigation";
import { validateEmail } from "@/utils/validation";
import { Mail, CheckCircle } from "lucide-react";

export default function SignupPage() {
  const { sendMagicLink } = useAuth();
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(null);

    if (value) {
      const validation = validateEmail(value);
      if (!validation.isValid) {
        setEmailError(validation.error || null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || null);
      return;
    }

    setLoading(true);
    const res = await sendMagicLink(email);
    setLoading(false);
    
    if (res.success) {
      setMagicLinkSent(true);
    } else {
      setError(res.error || "Failed to send magic link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100">
        {!magicLinkSent ? (
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
              Sign Up
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your email and we&apos;ll send you a magic link to sign in
            </p>
            {error && (
              <div className="mb-4 text-red-600 text-sm text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
                {error}
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-gray-900 placeholder:text-gray-400 transition ${
                  emailError
                    ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                    : "border-blue-200"
                }`}
                placeholder="Enter your email address"
                required
                autoFocus
              />
              {emailError && (
                <p className="mt-1 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition cursor-pointer flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Send Magic Link
                </>
              )}
            </button>
            <div className="mt-4 text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <span className="text-gray-500">
                Just enter your email above to get a magic link
              </span>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="text-green-600 text-6xl mb-4">
              <CheckCircle className="mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Magic Link Sent!</h2>
            <p className="text-gray-600 mb-4">
              We&apos;ve sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Check your email and click the link to sign in. The link will expire in 15 minutes.
            </p>
            <button
              onClick={() => {
                setMagicLinkSent(false);
                setEmail("");
                setError(null);
              }}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:outline-none transition cursor-pointer"
            >
              Try Different Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
