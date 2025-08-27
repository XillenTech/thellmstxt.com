"use client";

import { useEffect } from "react";
import { initAIBotTracking } from "@/utils/ai-bot-tracker";

export default function AITracker() {
  useEffect(() => {
    // Initialize AI bot tracking
    initAIBotTracking();
  }, []);

  // This component doesn't render anything visible
  return null;
}
