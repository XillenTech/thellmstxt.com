"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Generator from "@/components/Generator";
import EcommerceUpsell from "@/components/EcommerceUpsell";
import WhatIsLLMsTxt from "@/components/WhatIsLLMsTxt";
import HowToUse from "@/components/HowToUse";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LLMsFullGenerator from "@/components/LLMsFullGenerator";
import MarkdownGenerator from "@/components/MarkdownGenerator";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const llmsfull = searchParams.get("llmsfull");
  const markdown = searchParams.get("markdown");
  const url = searchParams.get("url") || "";
  const [showLLMsFull, setShowLLMsFull] = useState(!!llmsfull);
  const [showMarkdown, setShowMarkdown] = useState(!!markdown);

  // If modal is closed, remove the query param and return to homepage
  const handleCloseLLMsFull = () => {
    setShowLLMsFull(false);
    router.replace("/");
  };
  const handleCloseMarkdown = () => {
    setShowMarkdown(false);
    router.replace("/");
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Generator />
        <EcommerceUpsell />
        <WhatIsLLMsTxt />
        <HowToUse />
        {/* <WhyItMatters /> */}
        <FAQ />
        <Footer />
        {showLLMsFull && (
          <LLMsFullGenerator websiteUrl={url} onClose={handleCloseLLMsFull} />
        )}
        {showMarkdown && (
          <MarkdownGenerator websiteUrl={url} onClose={handleCloseMarkdown} />
        )}
      </div>
    </>
  );
}
