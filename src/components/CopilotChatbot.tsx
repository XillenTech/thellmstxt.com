"use client";

import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable } from "@copilotkit/react-core";
// import { useEffect } from "react";

export default function CopilotChatbot() {
  // Provide website content to the chatbot for context
  const websiteContent = {
    title: "LLMs.txt Generator - Control AI Crawlers",
    description: "Create your llms.txt file in seconds with our free, smart builder. Block AI crawlers like ChatGPT and Gemini from accessing your content easily.",
    features: [
      "Free llms.txt generator",
      "Smart builder with rule-based system",
      "Block AI crawlers like ChatGPT and Gemini",
      "Support for multiple platforms (Shopify, WordPress, etc.)",
      "LLMs-full.txt and llms.txt generation",
      "Website analysis and sitemap integration",
      "AI bot tracking and analytics"
    ],
    pages: [
      "Home - Main generator tool",
      "What is llms.txt - Educational content",
      "How to use - Tutorial and guides",
      "FAQ - Frequently asked questions",
      "Blog - Latest articles and updates",
      "Contact - Support and feedback",
      "Privacy & Terms - Legal information"
    ],
    tools: [
      "LLMs.txt Generator - Create basic llms.txt files",
      "LLMs-full.txt Generator - Create comprehensive files",
      "Sitemap to LLMs - Convert sitemaps to llms.txt",
      "Website Analyzer - Analyze existing llms.txt files",
      "Markdown Generator - Create markdown versions"
    ],
    benefits: [
      "Control AI crawler access to your content",
      "Protect your intellectual property",
      "Improve SEO by controlling AI indexing",
      "Comply with AI training data regulations",
      "Free and easy to use"
    ]
  };

  // Make website content available to the chatbot
  useCopilotReadable({
    description: "Website content and information about llms.txt generator",
    value: websiteContent,
  });

  return (
    <CopilotPopup
      labels={{
        title: "LLMs.txt Assistant",
        initial: "Hello! I'm here to help you with llms.txt files and our generator tool. What would you like to know?",
        placeholder: "Ask me about llms.txt, our tools, or how to use them...",
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
        
        Always be helpful, accurate, and encourage users to try our free tools.
        If you don't know something specific about our website, direct them to the relevant page or contact support.
      `}
    />
  );
}
