// AI Bot Tracking Utility
// This script detects AI bots and sends tracking data to the backend

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Enhanced AI Bot patterns (2025 updated list)
const AI_BOT_PATTERNS = {
  userAgents: [
    // OpenAI/ChatGPT
    "chatgpt",
    "openai",
    "gpt-4",
    "gpt-3.5",
    "chatgpt-user",
    "chatgpt-browser",
    "chatgpt-web",
    "openai-browser",

    // Anthropic/Claude
    "claude",
    "anthropic",
    "claudebot",
    "anthropic-ai",
    "claude-web",
    "anthropic-browser",

    // Perplexity
    "perplexity",
    "perplexitybot",
    "perplexity-ai",
    "perplexity-web",

    // Google AI
    "gemini",
    "google-ai",
    "googlebot-ai",
    "bard",
    "bard-web",

    // Microsoft AI
    "copilot",
    "bing-ai",
    "microsoft-ai",
    "copilot-web",

    // Other AI tools
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
    "web-crawler",
    "scraper",
    "spider",
    "bot",
    "crawler",
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
    "quora.com",
    "medium.com",
    "dev.to",
    "stackoverflow.com",
    "github.com",
    "reddit.com",
  ],

  // Suspicious patterns that indicate automation
  suspiciousPatterns: [
    "headless",
    "phantomjs",
    "selenium",
    "puppeteer",
    "playwright",
    "cypress",
    "webdriver",
    "automation",
    "testing",
    "scraper",
    "crawler",
    "bot",
    "spider",
    "harvester",
    "collector",
    "extractor",
    "parser",
    "monitor",
    "checker",
    "validator",
  ],
};

// Browser fingerprinting function
function generateFingerprint(): any {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx!.textBaseline = 'top';
  ctx!.font = '14px Arial';
  ctx!.fillText('AI Bot Detection Test', 2, 2);
  
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages,
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    hardwareConcurrency: navigator.hardwareConcurrency,
    maxTouchPoints: navigator.maxTouchPoints,
    vendor: navigator.vendor,
    webdriver: (navigator as any).webdriver,
    canvas: canvas.toDataURL(),
    screen: {
      width: screen.width,
      height: screen.height,
      availWidth: screen.availWidth,
      availHeight: screen.availHeight,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
    },
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    plugins: Array.from(navigator.plugins).map(p => p.name),
    mimeTypes: Array.from(navigator.mimeTypes).map(m => m.type),
    webgl: getWebGLFingerprint(),
    fonts: getFontFingerprint(),
  };
}

// WebGL fingerprinting
function getWebGLFingerprint(): any {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return null;
    
    return {
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      version: gl.getParameter(gl.VERSION),
      extensions: gl.getSupportedExtensions(),
    };
  } catch (e) {
    return null;
  }
}

// Font fingerprinting
function getFontFingerprint(): string[] {
  const testString = 'mmmmmmmmmmlli';
  const testSize = '72px';
  const h = document.getElementsByTagName('body')[0];
  const s = document.createElement('span');
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  h.appendChild(s);
  
  const defaultWidth = s.offsetWidth;
  const defaultHeight = s.offsetHeight;
  
  const fonts = [
    'Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Console',
    'Tahoma', 'Geneva', 'Lucida Sans Unicode', 'Franklin Gothic Medium',
    'Arial Narrow', 'Brush Script MT', 'Lucida Handwriting',
    'Copperplate', 'Papyrus', 'Fantasy', 'Cursive', 'Monospace'
  ];
  
  const detectedFonts: string[] = [];
  
  fonts.forEach(font => {
    s.style.fontFamily = font;
    if (s.offsetWidth !== defaultWidth || s.offsetHeight !== defaultHeight) {
      detectedFonts.push(font);
    }
  });
  
  h.removeChild(s);
  return detectedFonts;
}

// Behavioral analysis
function analyzeBehavior(): any {
  let mouseMovements = 0;
  let keyStrokes = 0;
  let scrollEvents = 0;
  let clickEvents = 0;
  let timeOnPage = 0;
  
  const startTime = Date.now();
  
  // Track mouse movements
  document.addEventListener('mousemove', () => {
    mouseMovements++;
  }, { passive: true });
  
  // Track key strokes
  document.addEventListener('keydown', () => {
    keyStrokes++;
  }, { passive: true });
  
  // Track scroll events
  document.addEventListener('scroll', () => {
    scrollEvents++;
  }, { passive: true });
  
  // Track click events
  document.addEventListener('click', () => {
    clickEvents++;
  }, { passive: true });
  
  // Calculate time on page
  timeOnPage = Date.now() - startTime;
  
  return {
    mouseMovements,
    keyStrokes,
    scrollEvents,
    clickEvents,
    timeOnPage,
    hasInteractions: mouseMovements > 0 || keyStrokes > 0 || scrollEvents > 0 || clickEvents > 0,
  };
}

// Enhanced AI bot detection
function detectAIBot(): {
  isAIBot: boolean;
  detectedAs: string;
  confidence: number;
  userAgent: string;
  referer: string;
  fingerprint: any;
  behavior: any;
  reasons: string[];
} {
  const userAgent = navigator.userAgent;
  const referer = document.referrer;
  const fingerprint = generateFingerprint();
  const behavior = analyzeBehavior();
  
  let confidence = 0;
  let detectedAs = "";
  const reasons: string[] = [];

  // Check User-Agent patterns
  const lowerUA = userAgent.toLowerCase();
  for (const pattern of AI_BOT_PATTERNS.userAgents) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      confidence += 0.4;
      detectedAs = pattern;
      reasons.push(`User-Agent contains: ${pattern}`);
      break;
    }
  }

  // Check Referer patterns
  const lowerReferer = referer.toLowerCase();
  for (const pattern of AI_BOT_PATTERNS.referrers) {
    if (lowerReferer.includes(pattern.toLowerCase())) {
      confidence += 0.3;
      if (!detectedAs) detectedAs = pattern;
      reasons.push(`Referer contains: ${pattern}`);
      break;
    }
  }

  // Check suspicious patterns
  for (const pattern of AI_BOT_PATTERNS.suspiciousPatterns) {
    if (lowerUA.includes(pattern.toLowerCase())) {
      confidence += 0.5;
      if (!detectedAs) detectedAs = `Suspicious: ${pattern}`;
      reasons.push(`Suspicious pattern: ${pattern}`);
      break;
    }
  }

  // Check for webdriver property (indicates automation)
  if ((navigator as any).webdriver) {
    confidence += 0.8;
    if (!detectedAs) detectedAs = "WebDriver";
    reasons.push("WebDriver property detected");
  }

  // Check for headless browser indicators
  if (!navigator.webdriver && (
    !navigator.languages || 
    navigator.languages.length === 0 ||
    !navigator.plugins ||
    navigator.plugins.length === 0
  )) {
    confidence += 0.3;
    if (!detectedAs) detectedAs = "Headless Browser";
    reasons.push("Headless browser indicators detected");
  }

  // Check for automation tools
  if (userAgent.includes('Chrome-Lighthouse') || 
      userAgent.includes('GTmetrix') ||
      userAgent.includes('PageSpeed') ||
      userAgent.includes('WebPageTest')) {
    confidence += 0.6;
    if (!detectedAs) detectedAs = "Performance Tool";
    reasons.push("Performance testing tool detected");
  }

  // Check for missing or suspicious fingerprint
  if (!fingerprint.webgl || 
      !fingerprint.fonts || 
      fingerprint.fonts.length < 5) {
    confidence += 0.2;
    if (!detectedAs) detectedAs = "Limited Fingerprint";
    reasons.push("Limited browser fingerprint");
  }

  // Check for suspicious behavior patterns
  if (!behavior.hasInteractions && timeOnPage > 5000) {
    confidence += 0.3;
    if (!detectedAs) detectedAs = "No Interactions";
    reasons.push("No user interactions detected");
  }

  // Check for very fast page loads (indicating pre-fetching)
  if (performance.timing && 
      performance.timing.loadEventEnd - performance.timing.navigationStart < 1000) {
    confidence += 0.2;
    if (!detectedAs) detectedAs = "Fast Load";
    reasons.push("Unusually fast page load");
  }

  return {
    isAIBot: confidence >= 0.3,
    detectedAs: detectedAs || "Unknown AI Bot",
    confidence: Math.min(confidence, 1.0),
    userAgent,
    referer,
    fingerprint,
    behavior,
    reasons,
  };
}

async function trackAIBot(): Promise<void> {
  try {
    const detection = detectAIBot();
    
    if (detection.isAIBot) {
      const response = await fetch(`${API_BASE}/api/track-ai-bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAgent: detection.userAgent,
          referer: detection.referer,
          url: window.location.href,
          fingerprint: detection.fingerprint,
          behavior: detection.behavior,
          reasons: detection.reasons,
        }),
      });

      if (response.ok) {
        console.log("🤖 AI Bot tracked:", detection);
      }
    }
  } catch (error) {
    console.error("Error tracking AI bot:", error);
  }
}

export function initAIBotTracking(): void {
  // Initial detection on page load
  setTimeout(() => {
    trackAIBot();
  }, 2000); // Wait 2 seconds to gather behavioral data

  // Track on navigation changes (for SPAs)
  let lastUrl = location.href;
  const observer = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(() => {
        trackAIBot();
      }, 1000);
    }
  });

  observer.observe(document, { subtree: true, childList: true });
}

export { detectAIBot, trackAIBot };
