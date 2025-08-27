/* eslint-disable @typescript-eslint/no-explicit-any */
// Test utility to simulate AI bot visits
// This is for testing purposes only

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Simulate different types of AI bot visits
export const simulateAIBotVisits = async () => {
  const testCases = [
    {
      userAgent:
        "Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)",
      referer: "https://chat.openai.com/c/abc123",
      url: "https://thellmstxt.com/what-is-llms-txt",
    },
    {
      userAgent:
        "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai)",
      referer: "https://perplexity.ai/search?q=llms.txt",
      url: "https://thellmstxt.com/how-to-use",
    },
    {
      userAgent:
        "Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://anthropic.com)",
      referer: "https://claude.ai/chat/def456",
      url: "https://thellmstxt.com/llms-full",
    },
    {
      userAgent: "Mozilla/5.0 (compatible; GeminiBot/1.0; +https://google.com)",
      referer: "https://gemini.google.com/app/ghi789",
      url: "https://thellmstxt.com/markdown",
    },
    {
      userAgent:
        "Mozilla/5.0 (compatible; CopilotBot/1.0; +https://microsoft.com)",
      referer: "https://copilot.microsoft.com/chat/jkl012",
      url: "https://thellmstxt.com/blogs",
    },
  ];

  console.log("🤖 Simulating AI bot visits...");

  for (const testCase of testCases) {
    try {
      const response = await fetch(`${API_BASE}/api/track-ai-bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCase),
      });

      const result = await response.json();

      if (result.success) {
        console.log(
          `✅ Simulated ${result.detectedAs} visit (${(
            result.confidence * 100
          ).toFixed(0)}% confidence)`
        );
      } else {
        console.log(`❌ Failed to simulate visit: ${result.error}`);
      }

      // Add delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("❌ Error simulating AI bot visit:", error);
    }
  }

  console.log("🎉 AI bot simulation complete!");
};

// Function to be called from browser console for testing
if (typeof window !== "undefined") {
  (window as any).simulateAIBotVisits = simulateAIBotVisits;
  console.log("🧪 AI Bot Test Utility loaded!");
  console.log(
    "💡 Run simulateAIBotVisits() in console to test the tracking system"
  );
}
