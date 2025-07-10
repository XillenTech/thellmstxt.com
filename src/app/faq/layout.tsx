import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ – TheLLMsTxt: Free llms.txt Generator & Integration Guide",
  description:
    "Find answers to frequently asked questions about llms.txt, AI crawlers, website optimization, and our free generator tool.",
  keywords:
    "llms.txt FAQ, AI crawler questions, website optimization FAQ, llms.txt generator help, AI training FAQ, web crawling questions",
  alternates: {
    canonical: "https://thellmstxt.com/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
