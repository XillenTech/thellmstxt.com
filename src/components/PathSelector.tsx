"use client";
import React, { useState } from "react";
import {
  Check,
  X,
  Settings,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import type { PathSelection } from "../types/backend";

interface PathSelectorProps {
  paths: PathSelection[];
  onSelectionChange: (paths: PathSelection[]) => void;
  isAuthenticated?: boolean;
  onBlurOverlayDismiss?: () => void;
  onContinueWithFeedback?: () => void;
}

const PathSelector = ({
  paths,
  onSelectionChange,
  isAuthenticated = true,
  onBlurOverlayDismiss,
  onContinueWithFeedback,
}: PathSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "allow" | "disallow">(
    "all"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredPaths = paths.filter((path) => {
    const matchesSearch =
      path.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (path.description &&
        path.description.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterType === "all") return matchesSearch;
    if (filterType === "allow") return matchesSearch && path.allow;
    if (filterType === "disallow") return matchesSearch && !path.allow;

    return matchesSearch;
  });

  const togglePath = (pathIndex: number) => {
    const updatedPaths = [...paths];
    updatedPaths[pathIndex] = {
      ...updatedPaths[pathIndex],
      allow: !updatedPaths[pathIndex].allow,
    };
    onSelectionChange(updatedPaths);
  };

  const selectAll = (allow: boolean) => {
    const updatedPaths = paths.map((path) => ({
      ...path,
      allow,
    }));
    onSelectionChange(updatedPaths);
  };

  const getStats = () => {
    const total = paths.length;
    const allowed = paths.filter((p) => p.allow).length;
    const disallowed = total - allowed;
    return { total, allowed, disallowed };
  };

  const stats = getStats();

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 sm:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Path Selector
        </h3>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <span>Total: {stats.total}</span>
          <span className="text-green-600">Allow: {stats.allowed}</span>
          <span className="text-red-600">Disallow: {stats.disallowed}</span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="text"
            placeholder="Search paths..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <div className="relative dropdown-container">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base bg-white flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span>
                {filterType === "all" && "All Paths"}
                {filterType === "allow" && "Allowed Only"}
                {filterType === "disallow" && "Disallowed Only"}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                      filterType === "all"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    All Paths
                  </button>
                  <button
                    onClick={() => {
                      setFilterType("allow");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                      filterType === "allow"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    Allowed Only
                  </button>
                  <button
                    onClick={() => {
                      setFilterType("disallow");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors ${
                      filterType === "disallow"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    Disallowed Only
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => selectAll(true)}
            className="px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs sm:text-sm font-medium"
          >
            Allow All
          </button>
          <button
            onClick={() => selectAll(false)}
            className="px-3 sm:px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-sm font-medium"
          >
            Disallow All
          </button>
        </div>
      </div>

      {/* Paths List */}
      <div className="max-h-96 overflow-y-auto space-y-2 relative">
        {filteredPaths.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
            {searchTerm ? "No paths match your search" : "No paths available"}
          </div>
        ) : (
          <>
            {/* Show first 5 paths for all users */}
            {filteredPaths.slice(0, 5).map((path) => {
              const originalIndex = paths.findIndex(
                (p) => p.path === path.path
              );
              return (
                <div
                  key={path.path}
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 rounded-lg border transition-all ${
                    path.allow
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 mb-2 sm:mb-0">
                    <button
                      onClick={() => togglePath(originalIndex)}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                        path.allow
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-red-500 border-red-500 text-white"
                      }`}
                    >
                      {path.allow ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                        {path.path}
                      </div>
                      {path.description && (
                        <div className="text-xs text-gray-500 break-all">
                          {path.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end sm:justify-start space-x-2 flex-shrink-0">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        path.allow
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {path.allow ? "Allow" : "Disallow"}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Show remaining paths for authenticated users */}
            {isAuthenticated &&
              filteredPaths.slice(5).map((path) => {
                const originalIndex = paths.findIndex(
                  (p) => p.path === path.path
                );
            return (
              <div
                key={path.path}
                className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 rounded-lg border transition-all ${
                  path.allow
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 mb-2 sm:mb-0">
                  <button
                    onClick={() => togglePath(originalIndex)}
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      path.allow
                        ? "bg-green-500 border-green-500 text-white"
                        : "bg-red-500 border-red-500 text-white"
                    }`}
                  >
                    {path.allow ? (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                      {path.path}
                    </div>
                    {path.description && (
                      <div className="text-xs text-gray-500 break-all">
                        {path.description}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end sm:justify-start space-x-2 flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      path.allow
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {path.allow ? "Allow" : "Disallow"}
                  </span>
                </div>
              </div>
            );
              })}

            {/* Blur overlay for unauthenticated users showing dummy content */}
            {!isAuthenticated && filteredPaths.length >= 5 && (
              <div className="relative">
                {/* Dummy paths in background (heavily blurred) */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`dummy-bg-${index}`}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 sm:p-3 rounded-lg border bg-green-50 border-green-200 blur-md"
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 mb-2 sm:mb-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 bg-green-500 border-green-500 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs sm:text-sm text-gray-900 break-all">
                          /additional-path-{index + 1}
                        </div>
                        <div className="text-xs text-gray-500 break-all">
                          Additional Path Description {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end sm:justify-start space-x-2 flex-shrink-0">
                      <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                        Allow
                      </span>
                    </div>
                  </div>
                ))}

                {/* Signup overlay with very transparent background */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50/80 via-white/60 to-purple-50/80 backdrop-blur-sm rounded-lg">
                  <div className="text-center p-6 bg-white/95 rounded-xl shadow-2xl border border-gray-100 max-w-sm mx-4">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Unlock More Paths
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-6">
                      Sign up to access all discovered paths and advanced
                      features
                    </p>

                    {/* Buttons */}
                    <div className="space-y-3 mb-4">
                      <a
                        href="/signup"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Sign Up Free</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="/signup"
                        className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
                      >
                        Get Magic Link
                      </a>
                    </div>

                    {/* Demo option */}
                    {onBlurOverlayDismiss && (
                      <button
                        onClick={onContinueWithFeedback || onBlurOverlayDismiss}
                        className="text-md  text-gray-500 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                      >
                        Continue (5 paths only)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {filteredPaths.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-0">
            <span>
              Showing {filteredPaths.length} of {paths.length} paths
            </span>
            <div className="flex items-center space-x-1">
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Click to toggle allow/disallow</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PathSelector;
