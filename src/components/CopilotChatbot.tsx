"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable } from "@copilotkit/react-core";
// import { useEffect } from "react";

export default function CopilotChatbot() {
  // Provide website content to the chatbot for context
  const websiteContent = {
    title: "LLMs.txt Generator - Control AI Crawlers & SEO Analysis",
    description: "Create your llms.txt file in seconds with our free, smart builder. Block AI crawlers like ChatGPT and Gemini from accessing your content easily. Plus comprehensive SEO analysis tools.",
    features: [
      "Free llms.txt generator",
      "Smart builder with rule-based system",
      "Block AI crawlers like ChatGPT and Gemini",
      "Support for multiple platforms (Shopify, WordPress, etc.)",
      "LLMs-full.txt and llms.txt generation",
      "Website analysis and sitemap integration",
      "AI bot tracking and analytics",
      "SEO Analysis - Detect duplicate titles, meta descriptions, canonical URLs",
      "Broken Link Detection - Find and fix broken internal and external links",
      "Comprehensive SEO reporting with CSV export"
    ],
    pages: [
      "Home - Main generator tool",
      "What is llms.txt - Educational content",
      "How to use - Tutorial and guides",
      "FAQ - Frequently asked questions",
      "Blog - Latest articles and updates",
      "Contact - Support and feedback",
      "Privacy & Terms - Legal information",
      "SEO Services - Broken link detection and SEO analysis",
      "SEO Analysis - Head tag duplicate detection and SEO issues",
      "History - View past analyses and scans"
    ],
    tools: [
      "LLMs.txt Generator - Create basic llms.txt files",
      "LLMs-full.txt Generator - Create comprehensive files",
      "Sitemap to LLMs - Convert sitemaps to llms.txt",
      "Website Analyzer - Analyze existing llms.txt files",
      "Markdown Generator - Create markdown versions",
      "Broken Link Detector - Find broken internal and external links",
      "SEO Analyzer - Detect duplicate head tags and SEO issues"
    ],
    seoFeatures: [
      "Duplicate canonical URL detection",
      "Duplicate title tag detection", 
      "Duplicate meta description detection",
      "Missing title tag detection",
      "Missing meta description detection",
      "Missing canonical URL detection",
      "Duplicate H1 tag detection",
      "Multiple H1 tag detection",
      "Open Graph tag analysis",
      "Twitter card analysis",
      "Meta keywords analysis",
      "Comprehensive SEO reporting"
    ],
    benefits: [
      "Control AI crawler access to your content",
      "Protect your intellectual property",
      "Improve SEO by controlling AI indexing",
      "Comply with AI training data regulations",
      "Free and easy to use",
      "Comprehensive SEO analysis",
      "Broken link detection and fixing",
      "Duplicate content identification",
      "SEO issue prioritization by severity"
    ]
  };

  // Make website content available to the chatbot
  useCopilotReadable({
    description: "Website content and information about llms.txt generator",
    value: websiteContent,
  });

  return (
    <div className="copilot-blue-theme">
      <style jsx global>{`
        .copilot-blue-theme .copilotKitButton {
          background-color: #8125eb !important;
          color: #ffffff !important;
        }
        .copilot-blue-theme .copilotKitButtonIcon svg {
          color: #ffffff !important;
        }
      `}</style>
      <CopilotPopup
        labels={{
          title: "LLMs.txt & SEO Assistant",
          initial: "Hello! I'm here to help you with llms.txt files, SEO analysis, and broken link detection. What would you like to know?",
          placeholder: "Ask me about llms.txt, SEO analysis, broken links, or our tools...",
        }}
        defaultOpen={false}
        clickOutsideToClose={true}
        hitEscapeToClose={true}
        shortcut="/"
        instructions={`
        You are a helpful assistant for the LLMs.txt Generator website. 
        You can help users with:
        
        1. Explaining what llms.txt is and why it's important
        2. How to use our generator tools
        3. Information about our features and benefits
        4. Technical questions about llms.txt implementation
        5. Guidance on blocking AI crawlers
        6. Platform-specific instructions (Shopify, WordPress, etc.)
        7. SEO Analysis - Help users understand duplicate head tag detection
        8. Broken Link Detection - Guide users on finding and fixing broken links
        9. SEO Issues - Explain different types of SEO problems and their severity
        10. CSV Export - Help users understand how to export analysis results
        11. Authentication - Explain page limits for guests vs authenticated users
        12. History - Guide users on viewing past analyses
        
        SEO Analysis Features:
        - Detect duplicate canonical URLs, titles, meta descriptions
        - Find missing title tags, meta descriptions, canonical URLs
        - Identify duplicate H1 tags and multiple H1 tags on same page
        - Analyze Open Graph and Twitter card tags
        - Categorize issues by severity (high, medium, low)
        - Export comprehensive CSV reports
        
        Broken Link Detection Features:
        - Scan internal and external links
        - Detect 404, 500, and other error status codes
        - Categorize links by context (navigation, content, footer, etc.)
        - Provide detailed error messages and response times
        - Export results with source pages and anchor text
        
        Always be helpful, accurate, and encourage users to try our free tools.
        If you don't know something specific about our website, direct them to the relevant page or contact support.
      `}
      />
    </div>
  );
}
