// AI Bot Tracking Utility
// This script detects AI bots and sends tracking data to the backend

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// AI Bot patterns for client-side detection
const AI_BOT_PATTERNS = {
  userAgents: [
    "chatgpt",
    "openai",
    "gpt-4",
    "gpt-3.5",
    "chatgpt-user",
    "chatgpt-browser",
    "claude",
    "anthropic",
    "claudebot",
    "anthropic-ai",
    "perplexity",
    "perplexitybot",
    "perplexity-ai",
    "gemini",
    "google-ai",
    "googlebot-ai",
    "copilot",
    "bing-ai",
    "microsoft-ai",
    "poe-bot",
    "quora-bot",
    "you-bot",
    "brave-ai",
    "duckduckgo-bot",
    "synthesia",
    "jasper",
    "copy.ai",
    "writesonic",
    "rytr",
    "simplified",
    "contentbot",
    "ai-writer",
    "ai-assistant",
    "ai-chatbot",
    "ai-crawler",
    "ai-bot",
    "llm-bot",
    "llm-crawler",
    "ai-search",
    "ai-indexer",
  ],

  referrers: [
    "chat.openai.com",
    "perplexity.ai",
    "claude.ai",
    "bard.google.com",
    "gemini.google.com",
    "copilot.microsoft.com",
    "bing.com/chat",
    "poe.com",
    "you.com",
    "brave.com/search",
    "duckduckgo.com",
    "synthesia.io",
    "jasper.ai",
    "copy.ai",
    "writesonic.com",
    "rytr.me",
    "simplified.co",
    "contentbot.io",
  ],
};

// Detect AI bot on client side
function detectAIBot(): {
  isAIBot: boolean;
  detectedAs: string;
  confidence: number;
  userAgent: string;
  referer: string;
} {
  if (typeof window === "undefined") {
    return {
      isAIBot: false,
      detectedAs: "",
      confidence: 0,
      userAgent: "",
      referer: "",
    };
  }

  const userAgent = navigator.userAgent || "";
  const referer = document.referrer || "";
  let confidence = 0;
  let detectedAs = "";

  // Check User-Agent
  const lowerUA = userAgent.toLowerCase();
  for (const pattern of AI_BOT_PATTERNS.userAgents) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      confidence += 0.6;
      detectedAs = pattern;
      break;
    }
  }

  // Check Referer
  const lowerReferer = referer.toLowerCase();
  for (const pattern of AI_BOT_PATTERNS.referrers) {
    if (lowerReferer.includes(pattern.toLowerCase())) {
      confidence += 0.4;
      if (!detectedAs) detectedAs = pattern;
      break;
    }
  }

  return {
    isAIBot: confidence >= 0.3,
    detectedAs: detectedAs || "Unknown AI Bot",
    confidence: Math.min(confidence, 1.0),
    userAgent,
    referer,
  };
}

// Send tracking data to backend
async function trackAIBot(): Promise<void> {
  try {
    const detection = detectAIBot();

    if (detection.isAIBot) {
      console.log("🤖 AI Bot detected on client side:", {
        detectedAs: detection.detectedAs,
        confidence: detection.confidence,
        userAgent: detection.userAgent.substring(0, 100),
        referer: detection.referer.substring(0, 100),
      });

      // Send to backend
      await fetch(`${API_BASE}/api/track-ai-bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAgent: detection.userAgent,
          referer: detection.referer,
          url: window.location.href,
        }),
      });
    }
  } catch (error) {
    // Silently fail to not affect user experience
    console.debug("AI bot tracking failed:", error);
  }
}

// Initialize tracking
export function initAIBotTracking(): void {
  if (typeof window === "undefined") return;

  // Track on page load
  trackAIBot();

  // Track on navigation (for SPA)
  let lastUrl = window.location.href;
  const observer = new MutationObserver(() => {
    if (window.location.href !== lastUrl) {
      lastUrl = window.location.href;
      setTimeout(trackAIBot, 100); // Small delay to ensure page is loaded
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Export for manual tracking
export { detectAIBot, trackAIBot };
