import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate llms.txt from Sitemap - Free Tool | TheLLMsTxt",
  description: "Convert your sitemap.xml directly into a curated llms.txt file. Filter, group, and enrich your URLs to create high-quality llms.txt that follows the specification. Free tool for AI crawler control.",
  keywords: [
    "llms.txt generator",
    "sitemap to llms.txt",
    "sitemap.xml converter",
    "AI crawler control",
    "free llms.txt tool",
    "sitemap parser",
    "llms.txt from sitemap",
    "AI indexing",
    "website structure",
    "curated links"
  ],
  openGraph: {
    title: "Generate llms.txt from Sitemap - Free Tool | TheLLMsTxt",
    description: "Convert your sitemap.xml directly into a curated llms.txt file. Filter, group, and enrich your URLs to create high-quality llms.txt that follows the specification.",
    type: "website",
    url: "https://thellmstxt.com/sitemap-to-llms",
    siteName: "TheLLMsTxt",
    images: [
      {
        url: "/og-sitemap-to-llms.png",
        width: 1200,
        height: 630,
        alt: "Sitemap to llms.txt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate llms.txt from Sitemap - Free Tool | TheLLMsTxt",
    description: "Convert your sitemap.xml directly into a curated llms.txt file. Filter, group, and enrich your URLs.",
    images: ["/og-sitemap-to-llms.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thellmstxt.com/sitemap-to-llms",
  },
};

export default function SitemapToLLMsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Header />
    <main className="bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
