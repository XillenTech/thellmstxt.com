"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";
import {
  X,
  Lock,
  Sparkles,
  FileText,
  Menu,
  ChevronDown,
  ChevronUp,
  User,
  LogOut,
} from "lucide-react";

const navLinks = [
  { href: "/what-is-llms-txt", label: "What is llms.txt?" },
  { href: "/how-to-use", label: "How To Use" },
  { href: "/blogs", label: "Blogs" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const seoLink = {
  href: "/seo",
  label: "SEO Tools",
};

const generatorLinks = [
  {
    href: "/llms-full",
    label: "LLMs Full",
    requiresAuth: true,
    icon: Sparkles,
    color: "blue",
  },
  {
    href: "/markdown",
    label: "Markdown",
    requiresAuth: true,
    icon: FileText,
    color: "green",
  },
  {
    href: "/sitemap-to-llms",
    label: "Sitemap to llms.txt",
    requiresAuth: false,
    icon: FileText,
    color: "purple",
  },
];

const Header = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authPopupType, setAuthPopupType] = useState<
    "llms-full" | "markdown" | null
  >(null);
  const [generatorsDropdownOpen, setGeneratorsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const authPopupRef = useRef<HTMLDivElement>(null);
  const generatorsDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileOpen(false);

  // Handle navigation with auth check
  const handleNavLinkClick = (
    link: (typeof navLinks)[0] | (typeof generatorLinks)[0],
    e: React.MouseEvent
  ) => {
    if ("requiresAuth" in link && link.requiresAuth && !user) {
      e.preventDefault();
      setAuthPopupType(link.href === "/llms-full" ? "llms-full" : "markdown");
      setShowAuthPopup(true);
    }
  };

  // Close generators dropdown on outside click
  useEffect(() => {
    if (!generatorsDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        generatorsDropdownRef.current &&
        !generatorsDropdownRef.current.contains(e.target as Node)
      ) {
        setGeneratorsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [generatorsDropdownOpen]);

  // Close user dropdown on outside click
  useEffect(() => {
    if (!userDropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userDropdownOpen]);

  // Close auth popup on outside click
  useEffect(() => {
    if (!showAuthPopup) return;
    function handleClick(e: MouseEvent) {
      if (
        authPopupRef.current &&
        !authPopupRef.current.contains(e.target as Node)
      ) {
        setShowAuthPopup(false);
        setAuthPopupType(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showAuthPopup]);

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

  // Prevent scroll when auth popup is open
  useEffect(() => {
    if (showAuthPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showAuthPopup]);

  const getAuthPopupContent = () => {
    if (authPopupType === "llms-full") {
      return {
        title: "Access LLMs Full Generator",
        description:
          "Sign in to access our advanced LLMs Full Generator with comprehensive metadata and detailed crawler instructions.",
        icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />,
        color: "blue",
      };
    } else if (authPopupType === "markdown") {
      return {
        title: "Access Markdown Generator",
        description:
          "Sign in to access our Markdown Generator for creating comprehensive website documentation.",
        icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
        color: "green",
      };
    }
    return null;
  };

  const popupContent = getAuthPopupContent();

  // Get user initials for avatar
  const getUserInitials = (email: string) => {
    const name = email.split("@")[0];
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0"
              onClick={handleNavClick}
            >
              <Logo size="md" variant="header" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(link, e)}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-blue-50 text-sm xl:text-base whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}

              {/* Generators Dropdown */}
              <div className="relative" ref={generatorsDropdownRef}>
                <button
                  onClick={() =>
                    setGeneratorsDropdownOpen(!generatorsDropdownOpen)
                  }
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-blue-50 text-sm xl:text-base whitespace-nowrap"
                >
                  <span>Generators</span>
                  {generatorsDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {generatorsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {generatorLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={(e) => {
                            handleNavLinkClick(link, e);
                            setGeneratorsDropdownOpen(false);
                          }}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                            link.color === "blue"
                              ? "hover:text-blue-600"
                              : "hover:text-green-600"
                          }`}
                        >
                          <IconComponent
                            className={`w-4 h-4 ${
                              link.color === "blue"
                                ? "text-blue-500"
                                : "text-green-500"
                            }`}
                          />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* SEO Tools */}
              <Link
                href={seoLink.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-red-50 text-sm xl:text-base whitespace-nowrap"
              >
                <span>{seoLink.label}</span>
              </Link>
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-2 transition-colors cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {getUserInitials(user.email)}
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          {user.email}
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/history"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <User className="w-4 h-4 text-gray-500" />
                          <span>History</span>
                        </Link>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                          }}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-gray-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/signup"
                    className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition whitespace-nowrap cursor-pointer"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none border border-gray-200 bg-white shadow cursor-pointer"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Overlay */}
          {mobileOpen && (
            <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden">
              <div
                ref={mobileNavRef}
                className="absolute top-0 right-0 w-80 max-w-[90vw] h-full bg-white shadow-lg px-4 pt-20 pb-6 space-y-2 transition-transform duration-200 flex flex-col overflow-y-auto cursor-pointer"
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none border border-gray-200 bg-white shadow cursor-pointer"
                  aria-label="Close menu"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Mobile Navigation Links */}
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleNavLinkClick(link, e);
                        handleNavClick();
                      }}
                      className="block px-3 py-3 text-base sm:text-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Generators Section */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Generators
                    </div>
                    {generatorLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={(e) => {
                            handleNavLinkClick(link, e);
                            handleNavClick();
                          }}
                          className={`flex items-center space-x-3 px-3 py-3 text-base sm:text-lg text-gray-700 hover:bg-blue-50 rounded-lg font-medium transition-colors ${
                            link.color === "blue"
                              ? "hover:text-blue-600"
                              : "hover:text-green-600"
                          }`}
                        >
                          <IconComponent
                            className={`w-5 h-5 ${
                              link.color === "blue"
                                ? "text-blue-500"
                                : "text-green-500"
                            }`}
                          />
                          <span>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile SEO Tools Section */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      SEO Tools
                    </div>
                    <Link
                      href={seoLink.href}
                      onClick={handleNavClick}
                      className="flex items-center space-x-3 px-3 py-3 text-base sm:text-lg text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                    >
                      <span>{seoLink.label}</span>
                    </Link>
                  </div>
                </div>

                {/* Mobile User Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {getUserInitials(user.email)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/history"
                        className="text-base font-semibold text-blue-600 hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center"
                        onClick={handleNavClick}
                      >
                        History
                      </Link>
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
                    <Link
                      href="/signup"
                      className="text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-400 focus:outline-none transition text-center"
                      onClick={handleNavClick}
                    >
                      Get Started
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Authentication Popup */}
      {showAuthPopup && popupContent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            ref={authPopupRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 sm:p-8 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAuthPopup(false);
                setAuthPopupType(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-gray-100 rounded-full p-3 sm:p-4">
                  {popupContent.icon}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 px-2">
                {popupContent.title}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
                {popupContent.description}
              </p>

              <div className="flex flex-col space-y-3">
                <Link
                  href="/login"
                  onClick={() => {
                    setShowAuthPopup(false);
                    setAuthPopupType(null);
                  }}
                  className={`${
                    popupContent.color === "blue"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                  } text-white font-semibold py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base`}
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/signup"
                  onClick={() => {
                    setShowAuthPopup(false);
                    setAuthPopupType(null);
                  }}
                  className="bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:border-gray-400 flex items-center justify-center text-sm sm:text-base"
                >
                  Create Account
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6 px-2">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
