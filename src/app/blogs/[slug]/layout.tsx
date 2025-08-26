import type { Metadata } from "next";

// Blog data - imported from the same source as the page
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
}

// Blog data - only essential SEO fields
const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-to-llms-txt",
    title: "What is llms.txt? Complete Guide to Implementation",
    excerpt:
      "Learn how to create llms.txt files and discover the benefits for your website. Compare generator options and understand the format spec in this comprehensive guide.",
    tags: ["llms.txt", "AI Marketing", "SEO", "2025"],
  },
  {
    slug: "ai-shopping-changing-ecommerce",
    title: "How AI Shopping is Changing E-commerce in 2025",
    excerpt:
      "Explore conversational commerce trends and discover how AI assistants are transforming online shopping. Learn to optimize your e-commerce site for AI and SEO to boost sales.",
    tags: [
      "E-commerce",
      "AI Shopping",
      "Conversational Commerce",
      "2025",
      "SEO",
    ],
  },
  {
    slug: "llms-txt-vs-robots-txt",
    title: "llms.txt vs robots.txt in 2025: Key Differences",
    excerpt:
      "Understand the crucial differences between llms.txt and robots.txt in 2025. Learn when to use each protocol for optimal AI and search engine visibility and brand safety.",
    tags: ["llms.txt", "robots.txt", "Technical", "2025", "SEO"],
  },
  {
    slug: "best-practices-implementing-llms-txt",
    title: "Best Practices for Implementing llms.txt in 2025",
    excerpt:
      "Discover proven strategies and common pitfalls to avoid when setting up llms.txt for optimal AI crawler control and SEO in 2025. Learn how to protect your content.",
    tags: ["Implementation", "Best Practices", "Technical", "2025", "SEO"],
  },
  {
    slug: "future-ai-powered-marketing",
    title: "The Future of AI-Powered Marketing in 2025",
    excerpt:
      "Explore the top 2025 trends in AI marketing and discover how businesses can prepare for the next wave of AI-driven customer interactions and content optimization.",
    tags: ["AI Marketing", "Future Trends", "Strategy", "2025", "SEO"],
  },
  {
    slug: "ai-content-optimization-guide",
    title: "AI Content Optimization Guide 2025",
    excerpt:
      "Learn proven strategies to optimize your content for AI systems and search engines in 2025. Discover actionable tips for structure, markup, and comprehensive coverage.",
    tags: ["Content Optimization", "AI Marketing", "SEO", "2025"],
  },
  {
    slug: "measuring-ai-marketing-success",
    title: "Measuring AI Marketing Success in 2025",
    excerpt:
      "Discover the essential 2025 metrics and analytics tools to track your AI marketing and SEO performance. Learn how to optimize your strategy for maximum impact.",
    tags: ["Analytics", "AI Marketing", "Performance", "2025", "SEO"],
  },
  {
    slug: "llms-txt-case-studies",
    title: "Real-World llms.txt Case Studies 2025",
    excerpt:
      "Explore real-world 2025 examples of businesses that have successfully implemented llms.txt. Learn how it can boost your AI visibility, SEO, and digital marketing results.",
    tags: ["Case Studies", "llms.txt", "Success Stories", "2025", "SEO"],
  },
  {
    slug: "ai-seo-strategy-2025",
    title: "AI SEO Strategy 2025: Beyond Traditional Search",
    excerpt:
      "Develop a comprehensive 2025 AI SEO strategy that works with both traditional search engines and AI systems. Learn how to use semantic search and structured data.",
    tags: ["AI SEO", "Search Optimization", "Strategy", "2025", "SEO"],
  },
  {
    slug: "content-research-techniques-ai-era",
    title: "Content Research Techniques for the AI Era 2025",
    excerpt:
      "Master advanced 2025 content research techniques to create content optimized for both human readers and AI systems. Use AI tools and keyword research.",
    tags: [
      "Content Research",
      "AI Optimization",
      "Research Techniques",
      "2025",
      "SEO",
    ],
  },
  {
    slug: "ai-models-support-llmstxt",
    title: "ChatGPT, Claude, Gemini: Which AI Models Support LLMs.txt Files?",
    excerpt:
      "A comprehensive guide to AI model compatibility with the llms.txt protocol. Learn which major AI models recognize and respect llms.txt files for content access control.",
    tags: ["AI Models", "ChatGPT", "Claude", "Gemini", "Technical"],
  },
  {
    slug: "llmstxt-llm-text-optimization-ai-seo",
    title: "What is LLMs.txt and LLM Text Optimization for AI SEO",
    excerpt:
      "Discover how LLMs.txt revolutionizes AI content optimization and helps large language models access and understand your website content more effectively.",
    tags: ["LLMs.txt", "AI SEO", "Content Optimization", "Technical"],
  },
  {
    slug: "llm-text-llmstxt-benefits-seo-strategy",
    title: "LLM Text and LLMs.txt Benefits for SEO Strategy",
    excerpt:
      "Discover the significant advantages of implementing LLMs.txt for AI SEO (GEO - Generative Engine Optimization) and how it positions your website for the future of AI-powered search.",
    tags: ["LLMs.txt", "AI SEO", "SEO Strategy", "GEO", "Technical"],
  },
];

// Function to find blog post by slug
function findBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found – TheLLMsTxt",
      description:
        "The blog post you're looking for doesn't exist. Browse our latest articles about llms.txt, AI crawlers, and website optimization.",
      keywords: [
        "llms.txt blog",
        "AI crawler articles",
        "website optimization blog",
        "LLM integration posts",
        "AI training content",
      ],
      alternates: {
        canonical: `https://thellmstxt.com/blogs/${slug}`,
      },
    };
  }

  return {
    title: `${post.title} – TheLLMsTxt`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    alternates: {
      canonical: `https://thellmstxt.com/blogs/${slug}`,
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
