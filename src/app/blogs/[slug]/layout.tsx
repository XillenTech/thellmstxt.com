import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: "Blog Post – TheLLMsTxt",
    description:
      "Read our latest blog post about llms.txt, AI crawlers, website optimization, and LLM integration best practices.",
    keywords:
      "llms.txt blog, AI crawler articles, website optimization blog, LLM integration posts, AI training content",
    alternates: {
      canonical: `https://thellmstxt.com/blogs/${slug}`,
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
