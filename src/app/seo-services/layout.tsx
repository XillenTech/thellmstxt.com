import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO Services - Broken Link Detection | TheLLMsTxt",
  description: "Detect broken links on your website with our comprehensive SEO analysis tool. Get detailed reports on internal and external broken links with status codes and response times.",
  keywords: "broken links, SEO analysis, website audit, link checker, SEO tools",
};

export default function SEOServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
