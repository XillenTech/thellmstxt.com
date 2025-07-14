import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blogs – TheLLMsTxt",
  description:
    "Explore our latest blog posts about llms.txt, AI crawlers, website optimization, and LLM integration best practices.",
  keywords:
    "llms.txt, AI crawlers, website optimization, LLM integration, blog posts, AI training, web crawling, machine learning",
  alternates: {
    canonical: "https://thellmstxt.com/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
