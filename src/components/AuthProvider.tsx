"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: { email: string } | null;
  token: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const email = localStorage.getItem("auth_email");
    if (t && email) {
      setToken(t);
      setUser({ email });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        setUser({ email: data.email });
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "Login failed" };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        setUser({ email: data.email });
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Signup failed" };
      }
    } catch (err) {
      console.error("Signup error:", err);
      return { success: false, error: "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/logout`, { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
      // Ignore errors, just clear local state
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
