import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LLMs Full Generator – Advanced AI Crawler Control – TheLLMsTxt",
  description:
    "Generate comprehensive llms-full.txt files with advanced metadata and detailed crawler instructions. Professional AI crawler control for your website.",
  keywords: [
    "llms full generator",
    "llms-full.txt",
    "advanced AI crawler control",
    "AI metadata generation",
    "comprehensive llms.txt",
    "AI crawler instructions",
    "website AI protection",
    "LLM optimization",
  ],
  alternates: {
    canonical: "https://thellmstxt.com/llms-full",
  },
};

export default function LLMsFullLayout({
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
