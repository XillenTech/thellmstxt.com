import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Tools - Comprehensive SEO Analysis & Broken Link Detection",
  description: "Professional SEO analysis and broken link detection tools. Analyze your website for SEO issues, duplicate content, and broken links to improve your search engine rankings and user experience.",
  keywords: "SEO analysis, broken link detection, website analysis, SEO tools, duplicate content, meta tags, canonical URLs",
  alternates: {
    canonical: "https://thellmstxt.com/seo",
  },
};

export default function SEOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
