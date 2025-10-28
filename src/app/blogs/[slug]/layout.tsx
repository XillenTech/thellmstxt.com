import type { Metadata } from "next";
import { generate404Title, generateBlogTitle, generateCanonicalUrl, generateMetaDescription } from "@/utils/seo";
import { getBlogPostBySlug } from "@/data/blogPosts";

// Blog data - only essential SEO fields for metadata
interface BlogPostMetadata {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

// Function to find blog post by slug
function findBlogPostBySlug(slug: string): BlogPostMetadata | undefined {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;
  
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    tags: post.tags,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPostBySlug(slug);

  if (!post) {
    const cleanSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const description = generateMetaDescription(
      `The blog post "${cleanSlug}" you're looking for doesn't exist. Browse our latest articles about llms.txt, AI crawlers, and website optimization.`
    );
    
    return {
      title: generate404Title(slug, "Blog Post Not Found"),
      description,
      keywords: [
        "llms.txt blog",
        "AI crawler articles", 
        "website optimization blog",
        "LLM integration posts",
        "AI training content",
      ],
      alternates: {
        canonical: generateCanonicalUrl(`/blogs/${slug}`),
      },
    };
  }

  return {
    title: generateBlogTitle(post.title),
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: {
      canonical: generateCanonicalUrl(`/blogs/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://thellmstxt.com/blogs/${slug}`,
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