// LLM Bot types matching the backend
export type LLMBot =
  | "ChatGPT-User"
  | "GPTBot"
  | "GoogleExtended"
  | "Claude"
  | "Anthropic"
  | "CCBot";

// Enhanced PathSelection with new features
export interface PathSelection {
  path: string;
  allow: boolean;
  description?: string;
  priority?: "high" | "medium" | "low";
  tags?: string[];
  contentType?: "page" | "blog" | "docs" | "project" | "archive" | "terms";
  lastModified?: string;
  summary?: string;
  contextSnippet?: string;
  aiUsageDirective?: "allow" | "citation-only" | "no-fine-tuning" | "disallow";
}

// AI Generated Content
export interface AIGeneratedContent {
  path: string;
  summary?: string;
  contextSnippet?: string;
  keywords?: string[];
  contentType?: string;
  priority?: "high" | "medium" | "low";
  generatedAt: string;
  model: string;
}

// Enhanced Metadata
export interface EnhancedMetadata {
  title: string;
  description: string;
  keywords?: string[];
  language?: string;
  contentType?: string;
  lastModified?: string;
  priority?: "high" | "medium" | "low";
  aiUsageDirective?: "allow" | "citation-only" | "no-fine-tuning" | "disallow";
}

// API request/response types
export interface WebsiteAnalysisRequest {
  url: string;
  bots: LLMBot[];
  aiEnrichment?: boolean;
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
    bodyContent?: string;
  }>;
  aiGeneratedContent?: AIGeneratedContent[];
  error?: string;
}

export interface LLMsTxtPayload {
  bot: LLMBot;
  allowPaths: string[];
  disallowPaths: string[];
  websiteUrl: string;
  generateFull?: boolean;
  generateMarkdown?: boolean;
  includeSummaries?: boolean;
  includeContextSnippets?: boolean;
  hierarchicalLayout?: boolean;
  aiEnrichment?: boolean;
}

export interface LLMsTxtGenerationResponse {
  success: boolean;
  content: string;
  filename: string;
  error?: string;
}

// New enhanced types
export interface LLMsFullPayload {
  websiteUrl: string;
  includeImages?: boolean;
  includeLinks?: boolean;
  maxDepth?: number;
  aiEnrichment?: boolean;
  userIP?: string;
}

export interface LLMsFullGenerationResponse {
  success: boolean;
  content: string;
  filename: string;
  totalPages: number;
  totalWords: number;
  error?: string;
}

export interface MarkdownGenerationResponse {
  success: boolean;
  files: Array<{
    path: string;
    content: string;
    filename: string;
  }>;
  error?: string;
}

export interface AnalyticsData {
  websiteUrl: string;
  accessCount: number;
  lastAccessed: string;
  userAgents: string[];
  mostAccessedPaths: Array<{
    path: string;
    count: number;
  }>;
  generationCount: number;
  lastGenerated: string;
}

export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsData;
  error?: string;
}

export interface AutomationConfig {
  enabled: boolean;
  schedule: string; // cron expression
  websiteUrl: string;
  llmBot: LLMBot;
  generateFull: boolean;
  generateMarkdown: boolean;
  webhookUrl?: string;
  lastRun?: string;
  nextRun?: string;
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
