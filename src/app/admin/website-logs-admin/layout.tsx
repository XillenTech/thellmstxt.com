import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Crawl Results Dashboard – Test Page – TheLLMsTxt",
  description:
    "View all website crawl results and analysis data. Dashboard for monitoring crawl activities and performance metrics.",
  keywords: [
    "crawl results",
    "dashboard",
    "website analysis",
    "crawl data",
    "test page",
    "monitoring",
    "analytics",
    "crawl performance",
  ],
  alternates: {
    canonical: "https://thellmstxt.com/test",
  },
};

export default function TestLayout({
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
