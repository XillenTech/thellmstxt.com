import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Markdown Generator – AI Documentation Tool – TheLLMsTxt",
  description:
    "Generate comprehensive markdown documentation for your website structure. Perfect for AI crawlers and technical documentation with professional formatting.",
  keywords: [
    "markdown generator",
    "website documentation",
    "AI documentation tool",
    "markdown for AI crawlers",
    "technical documentation",
    "website structure documentation",
    "AI-friendly markdown",
    "documentation generator",
  ],
  alternates: {
    canonical: "https://thellmstxt.com/markdown",
  },
};

export default function MarkdownLayout({
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
