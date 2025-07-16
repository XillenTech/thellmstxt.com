"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";

const navLinks = [
  { href: "/what-is-llms-txt", label: "What is llms.txt?" },
  { href: "/how-to-use", label: "How To Use" },
  { href: "/blogs", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center" onClick={handleNavClick}>
            <Logo size="md" variant="header" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm text-gray-700 font-semibold bg-blue-50 px-3 py-1 rounded-lg">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/login"
                  className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-semibold bg-white border border-blue-600 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none border border-gray-200 bg-white shadow"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                // X icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity flex items-center justify-end">
            <div
              ref={mobileNavRef}
              className="absolute top-0 right-0 w-72 max-w-full h-full bg-white shadow-lg px-4 pt-20 pb-6 space-y-2 transition-transform duration-200 flex flex-col"
              style={{ minHeight: "100vh" }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none border border-gray-200 bg-white shadow"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-3 text-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                  onClick={handleNavClick}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col space-y-3">
                {user ? (
                  <>
                    <span className="text-base text-gray-700 font-semibold bg-blue-50 px-3 py-2 rounded-lg text-center">
                      {user.email}
                    </span>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        logout();
                      }}
                      className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-center"
                      onClick={handleNavClick}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="text-base font-semibold bg-white border border-blue-600 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-center"
                      onClick={handleNavClick}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
