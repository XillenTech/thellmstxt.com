"use client";
import React, { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";
import type { Rule } from "./Generator";

interface RuleBuilderProps {
  onAddRule: (rule: Omit<Rule, "id">) => void;
}

const RuleBuilder = ({ onAddRule }: RuleBuilderProps) => {
  const [userAgent, setUserAgent] = useState("*");
  const [ruleType, setRuleType] = useState<"Allow" | "Disallow">("Allow");
  const [path, setPath] = useState("");

  const commonUserAgents = [
    { value: "*", label: "* (All AI crawlers)" },
    { value: "ChatGPT-User", label: "ChatGPT-User" },
    { value: "GPTBot", label: "GPTBot" },
    { value: "Google-Extended", label: "Google-Extended (Bard)" },
    { value: "Claude-Web", label: "Claude-Web" },
    { value: "anthropic-ai", label: "anthropic-ai" },
    { value: "CCBot", label: "CCBot (Common Crawl)" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!path.trim()) return;

    onAddRule({
      userAgent,
      type: ruleType,
      path: path.trim(),
    });

    setPath("");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Rule Builder</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>User-Agent</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </label>
          <select
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            {commonUserAgents.map((agent) => (
              <option key={agent.value} value={agent.value}>
                {agent.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose which AI crawlers this rule applies to. Use * for all
            crawlers.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Rule Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Allow"
                checked={ruleType === "Allow"}
                onChange={(e) => setRuleType(e.target.value as "Allow")}
                className="mr-2 text-blue-600"
              />
              <span className="text-green-600 font-medium">Allow</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Disallow"
                checked={ruleType === "Disallow"}
                onChange={(e) => setRuleType(e.target.value as "Disallow")}
                className="mr-2 text-blue-600"
              />
              <span className="text-red-600 font-medium">Disallow</span>
            </label>
          </div>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <span>Path</span>
            <HelpCircle className="h-4 w-4 text-gray-400" />
          </label>
          <input
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="/blog/*, /private/, /admin/"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use * as a wildcard. Examples: /blog/* (all blog pages), /private/
            (private directory)
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Rule</span>
        </button>
      </form>
    </div>
  );
};

export default RuleBuilder;
