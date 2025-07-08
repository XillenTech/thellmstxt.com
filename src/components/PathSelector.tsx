"use client";
import React, { useState } from "react";
import { Check, X, Settings } from "lucide-react";
import type { PathSelection } from "../types/backend";

interface PathSelectorProps {
  paths: PathSelection[];
  onSelectionChange: (paths: PathSelection[]) => void;
}

const PathSelector = ({ paths, onSelectionChange }: PathSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "allow" | "disallow">(
    "all"
  );

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
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Path Selector</h3>
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
          <select
            value={filterType}
            onChange={(e) =>
              setFilterType(e.target.value as "all" | "allow" | "disallow")
            }
            className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">All Paths</option>
            <option value="allow">Allowed Only</option>
            <option value="disallow">Disallowed Only</option>
          </select>
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
      <div className="max-h-96 overflow-y-auto space-y-2">
        {filteredPaths.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
            {searchTerm ? "No paths match your search" : "No paths available"}
          </div>
        ) : (
          filteredPaths.map((path) => {
            const originalIndex = paths.findIndex((p) => p.path === path.path);
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
          })
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
