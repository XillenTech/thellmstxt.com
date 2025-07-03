// LLM Bot types matching the backend
export type LLMBot =
  | "ChatGPT-User"
  | "GPTBot"
  | "GoogleExtended"
  | "Claude"
  | "Anthropic"
  | "CCBot";

// API request/response types
export interface WebsiteAnalysisRequest {
  url: string;
  llmBot: LLMBot;
}

export interface WebsiteAnalysisResponse {
  success: boolean;
  metadata: {
    title: string;
    description: string;
    url: string;
    totalPagesCrawled?: number;
    totalLinksFound?: number;
    uniquePathsFound?: number;
  };
  paths: PathSelection[];
  pageMetadatas?: Array<{
    path: string;
    title: string;
    description: string;
    keywords?: string;
  }>;
  error?: string;
}

export interface PathSelection {
  path: string;
  allow: boolean;
  description?: string;
}

export interface LLMsTxtPayload {
  bot: LLMBot;
  allowPaths: string[];
  disallowPaths: string[];
  websiteUrl: string;
}

export interface LLMsTxtGenerationResponse {
  success: boolean;
  content: string;
  filename: string;
  error?: string;
}

// LLM Bot configurations
export interface LLMBotConfig {
  name: LLMBot;
  userAgent: string;
  description: string;
}

export const LLM_BOT_CONFIGS: Record<LLMBot, LLMBotConfig> = {
  "ChatGPT-User": {
    name: "ChatGPT-User",
    userAgent: "ChatGPT-User",
    description: "OpenAI ChatGPT web browsing",
  },
  GPTBot: {
    name: "GPTBot",
    userAgent: "GPTBot",
    description: "OpenAI GPT training crawler",
  },
  GoogleExtended: {
    name: "GoogleExtended",
    userAgent: "Google-Extended",
    description: "Google AI training crawler",
  },
  Claude: {
    name: "Claude",
    userAgent: "Claude-Web",
    description: "Anthropic Claude web browsing",
  },
  Anthropic: {
    name: "Anthropic",
    userAgent: "anthropic-ai",
    description: "Anthropic AI training crawler",
  },
  CCBot: {
    name: "CCBot",
    userAgent: "CCBot",
    description: "Common Crawl bot",
  },
};
