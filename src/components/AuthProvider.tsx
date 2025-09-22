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
  sendMagicLink: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginWithMagicLink: (
    token: string
  ) => Promise<{ success: boolean; error?: string }>;
  refreshToken: () => Promise<{ success: boolean; error?: string }>;
  validateToken: (tokenToValidate: string) => Promise<boolean>;
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

  // Helper function to check if token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  };

  // Helper function to check if token needs refresh (within 7 days of expiry)
  const shouldRefreshToken = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;
      const sevenDaysInSeconds = 7 * 24 * 60 * 60; // 7 days
      return timeUntilExpiry < sevenDaysInSeconds;
    } catch {
      return true;
    }
  };

  // Helper function to validate token before API calls
  const validateToken = async (tokenToValidate: string): Promise<boolean> => {
    if (!tokenToValidate) return false;
    
    if (isTokenExpired(tokenToValidate)) {
      return false;
    }
    
    // If token is close to expiry, try to refresh it
    if (shouldRefreshToken(tokenToValidate)) {
      try {
        const refreshResult = await refreshToken();
        return refreshResult.success;
      } catch {
        return false;
      }
    }
    
    return true;
  };

  // Define refreshToken function first
  const refreshToken = async () => {
    try {
      const currentToken = localStorage.getItem("auth_token");
      if (!currentToken) {
        return { success: false, error: "No token to refresh" };
      }

      const res = await fetch(`${API_BASE}/api/refresh-token`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`
        },
      });
      const data = await res.json();
      
      if (data.success && data.token) {
        setToken(data.token);
        setUser({ email: data.email });
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Token refresh failed" };
      }
    } catch (err) {
      console.error("Token refresh error:", err);
      return { success: false, error: "Token refresh failed" };
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const t = localStorage.getItem("auth_token");
      const email = localStorage.getItem("auth_email");
      
      if (t && email) {
        // Check if token is expired
        if (isTokenExpired(t)) {
          // Token is expired, clear auth state
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_email");
          setToken(null);
          setUser(null);
          return;
        }

        // Check if token needs refresh
        if (shouldRefreshToken(t)) {
          try {
            const refreshResult = await refreshToken();
            if (!refreshResult.success) {
              // Refresh failed, clear auth state
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_email");
              setToken(null);
              setUser(null);
              return;
            }
          } catch {
            // Refresh failed, clear auth state
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_email");
            setToken(null);
            setUser(null);
            return;
          }
        } else {
          // Token is still valid, set auth state
          setToken(t);
          setUser({ email });
        }
      }
    };

    initializeAuth();
  }, []);

  // Set up periodic token refresh
  useEffect(() => {
    if (!token) return;

    const checkAndRefreshToken = async () => {
      if (shouldRefreshToken(token)) {
        try {
          await refreshToken();
        } catch (error) {
          console.error("Automatic token refresh failed:", error);
        }
      }
    };

    // Check token every hour
    const interval = setInterval(checkAndRefreshToken, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);

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

  const sendMagicLink = async (email: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/send-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return { success: data.success, error: data.error };
    } catch (err) {
      console.error("Send magic link error:", err);
      return { success: false, error: "Failed to send magic link" };
    }
  };

  const loginWithMagicLink = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/verify-magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        setUser({ email: data.email });
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("auth_email", data.email);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Magic link verification failed" };
      }
    } catch (err) {
      console.error("Magic link login error:", err);
      return { success: false, error: "Magic link verification failed" };
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
    <AuthContext.Provider value={{ user, token, login, signup, sendMagicLink, loginWithMagicLink, refreshToken, validateToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
