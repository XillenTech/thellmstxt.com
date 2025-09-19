import SitemapToLLMsGenerator from "../../components/SitemapToLLMsGenerator";

export const metadata = {
  title: "Generate llms.txt from Sitemap - TheLLMsTxt",
  description: "Convert your sitemap.xml directly into a curated llms.txt file. Filter, group, and enrich your URLs to create high-quality llms.txt that follows the specification.",
  keywords: "llms.txt, sitemap.xml, AI crawler, LLM configuration, sitemap to llms.txt",
};

export default function SitemapToLLMsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SitemapToLLMsGenerator />
    </div>
  );
}
