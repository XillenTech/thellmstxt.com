import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts, getAllBlogSlugs, getBlogPostBySlug, type BlogPost } from "@/data/blogPosts";

// Generate static params for all blog posts
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({
    slug: slug,
  }));
}

// Blog page component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "TheLLMsTxt.com",
      url: "https://thellmstxt.com",
    },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thellmstxt.com/blogs/${post.slug}`,
    },
    articleBody: post.excerpt,
    keywords: post.tags.join(", "),
    wordCount: post.content.join(" ").split(" ").length,
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-4">
          <Link
            href="/blogs"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
          </Link>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{post.excerpt}</p>
          </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            {post.content.map((section, index) => (
              <div key={index} className="mb-6">
                {typeof section === "string" ? (
                  <p className="text-gray-700 leading-relaxed mb-4">{section}</p>
                ) : (
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    {section.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}