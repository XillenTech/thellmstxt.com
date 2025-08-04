"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword } from "@/utils/validation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(null);

    if (value) {
      const validation = validatePassword(value);
      if (!validation.isValid) {
        setPasswordError(validation.error || null);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || null);
      return;
    }

    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || null);
      return;
    }

    setLoading(true);
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
            onChange={handleEmailChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-gray-900 placeholder:text-gray-400 transition ${
              emailError
                ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                : "border-blue-200"
            }`}
            required
            autoFocus
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-blue-50 text-gray-900 placeholder:text-gray-400 transition ${
                passwordError
                  ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                  : "border-blue-200"
              }`}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:text-gray-600 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="mt-1 text-sm text-red-600">{passwordError}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition cursor-pointer"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <div className="mt-4 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-700 hover:underline font-semibold transition-colors hover:text-blue-700 cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
