"use client";

import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import CopilotChatbot from "./CopilotChatbot";

interface CopilotProviderProps {
  children: React.ReactNode;
}

export default function CopilotProvider({ children }: CopilotProviderProps) {
  return (
    <CopilotKit
      publicApiKey={process.env.NEXT_PUBLIC_COPILOTKIT_PUBLIC_KEY}
    >
      {children}
      <CopilotChatbot />
    </CopilotKit>
  );
}
