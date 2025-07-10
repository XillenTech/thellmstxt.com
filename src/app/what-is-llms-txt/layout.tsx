import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "What is llms.txt? Complete Guide & Free Generator – TheLLMsTxt",
  description:
    "Learn what llms.txt is, how it works, and why you need it. Complete guide with free generator tool for controlling AI crawlers.",
  keywords:
    "what is llms.txt, llms.txt guide, AI crawler control, robots.txt for AI, LLM optimization, website AI protection",
  alternates: {
    canonical: "https://thellmstxt.com/what-is-llms-txt",
  },
};

export default function WhatIsLLMsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
