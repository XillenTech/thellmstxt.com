"use client";
import React, { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  // author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "complete-guide-to-llms-txt",
      title:
        "The Complete Guide to llms.txt: Everything You Need to Know in 2025",
      excerpt:
        "Master the fundamentals of llms.txt and learn how to optimize your website for AI crawlers. This comprehensive guide covers implementation, best practices, and real-world examples for 2025.",
      content:
        "llms.txt is revolutionizing how websites interact with AI systems in 2025. Unlike robots.txt which controls search engine crawlers, llms.txt specifically manages how AI language models like ChatGPT, Claude, and Gemini access your content. This protocol allows you to guide AI systems to your most important pages while protecting sensitive areas of your website. The implementation is straightforward - simply create a text file with specific rules and upload it to your website's root directory. The file should be accessible at yourdomain.com/llms.txt once properly configured. Most AI systems will automatically check for this file when crawling your website, ensuring they follow your specified guidelines for content access and usage. This control is crucial for maintaining accurate product listings, protecting sensitive information, and ensuring your brand appears correctly in AI-generated recommendations and responses. In 2025, llms.txt has become essential for businesses looking to optimize their AI presence and control how their content appears in AI-powered conversations.",
      // author: "AI Marketing Team",
      date: "2025-01-15",
      readTime: "8 min read",
      tags: ["llms.txt", "AI Marketing", "SEO"],
      featured: true,
    },
    {
      id: "2",
      slug: "ai-shopping-changing-ecommerce",
      title: "How AI Shopping is Changing E-commerce in 2025: A Complete Guide",
      excerpt:
        "Explore the emerging trend of conversational commerce and how AI assistants are transforming the way consumers discover and purchase products online in 2025.",
      content:
        "The landscape of online shopping is undergoing a fundamental transformation in 2025. Consumers are increasingly turning to AI assistants like ChatGPT, Claude, and Google Bard to research products, compare options, and make purchasing decisions. This shift represents a new era of conversational commerce where AI acts as a personal shopping assistant. Without proper optimization through llms.txt, your business risks being invisible in these AI-powered conversations. When users ask AI assistants for product recommendations, the AI needs to understand your website structure, product information, and content to provide accurate, helpful responses that drive traffic to your site. The key is ensuring that AI systems can access your most important content while respecting your privacy and business rules. This control is crucial for maintaining accurate product listings, protecting sensitive information, and ensuring your brand appears correctly in AI-generated recommendations and responses. In 2025, AI shopping has become the dominant trend in e-commerce, making llms.txt optimization essential for business success.",
      // author: "E-commerce Expert",
      date: "2025-01-10",
      readTime: "12 min read",
      tags: ["E-commerce", "AI Shopping", "Conversational Commerce"],
    },
    {
      id: "3",
      slug: "llms-txt-vs-robots-txt",
      title:
        "llms.txt vs robots.txt: Key Differences and When to Use Each in 2025",
      excerpt:
        "Learn the fundamental differences between llms.txt and robots.txt protocols and when to use each one for optimal website optimization in 2025.",
      content:
        "While both llms.txt and robots.txt are text files that control web crawlers, they serve different purposes and target different types of crawlers. robots.txt is designed for search engine crawlers like Googlebot and Bingbot, controlling how these crawlers index your website for search results. It affects SEO and search rankings by telling search engines which pages to crawl and index. llms.txt, on the other hand, is specifically designed for AI language models and assistants like ChatGPT, Claude, and Gemini. It controls how these AI systems access and learn from your content, affecting AI recommendations and responses rather than search rankings. The key difference lies in their focus: robots.txt emphasizes indexing control for search engines, while llms.txt emphasizes content access control for AI systems. Understanding this distinction is crucial for implementing the right protocol for your specific needs in 2025. As AI becomes more prevalent, llms.txt has become essential for businesses looking to control their AI presence alongside traditional SEO.",
      // author: "Technical Writer",
      date: "2025-01-08",
      readTime: "6 min read",
      tags: ["llms.txt", "robots.txt", "Technical"],
    },
    {
      id: "4",
      slug: "best-practices-implementing-llms-txt",
      title: "Best Practices for Implementing llms.txt on Your Website in 2025",
      excerpt:
        "Discover proven strategies and common pitfalls to avoid when setting up llms.txt for optimal AI crawler control in 2025.",
      content:
        "Implementing llms.txt effectively requires careful planning and attention to detail in 2025. Start by identifying which parts of your website should be accessible to AI systems - typically your main product pages, blog content, and educational materials. Always allow access to your homepage and key landing pages, as these are often the first points of contact for AI crawlers. Block sensitive areas like admin panels, user account pages, and private content that shouldn't be shared with AI systems. Use clear, simple rule structures and avoid overly complex configurations that might confuse AI crawlers. Test your file by visiting yourdomain.com/llms.txt to ensure it's properly uploaded and accessible. Remember that llms.txt is a living document - regularly review and update your rules as your website content evolves. Keep the file well-organized with clear comments explaining your rule structure. This ongoing maintenance ensures your AI optimization remains effective as your business grows. In 2025, proper llms.txt implementation has become a critical component of any successful digital marketing strategy.",
      // author: "Web Developer",
      date: "2025-01-05",
      readTime: "10 min read",
      tags: ["Implementation", "Best Practices", "Technical"],
    },
    {
      id: "5",
      slug: "future-ai-powered-marketing",
      title: "The Future of AI-Powered Marketing in 2025: What's Next?",
      excerpt:
        "Explore emerging trends in AI marketing and how businesses can prepare for the next wave of AI-driven customer interactions in 2025.",
      content:
        "As AI technology continues to evolve in 2025, the landscape of digital marketing is set for significant changes. AI assistants are becoming increasingly sophisticated in understanding user intent and providing personalized recommendations. This shift requires businesses to adapt their marketing strategies to work effectively with AI systems. The key is ensuring that your content is not only accessible to AI crawlers but also structured in a way that AI systems can understand and recommend effectively. This includes having clear product descriptions, well-organized content hierarchies, and comprehensive information that AI can use to provide accurate recommendations. The future of AI-powered marketing lies in creating content that serves both human users and AI systems, ensuring your brand remains visible and relevant in an increasingly AI-driven marketplace. In 2025, AI marketing has become the dominant force in digital marketing, making llms.txt optimization essential for business success.",
      // author: "Marketing Strategist",
      date: "2025-01-03",
      readTime: "15 min read",
      tags: ["AI Marketing", "Future Trends", "Strategy"],
    },
    {
      id: "6",
      slug: "ai-content-optimization-guide",
      title:
        "AI Content Optimization Guide 2025: How to Make Your Content AI-Friendly",
      excerpt:
        "Learn proven strategies to optimize your content for AI systems while maintaining human readability and engagement in 2025.",
      content:
        "Creating content that works well with AI systems requires a different approach than traditional SEO in 2025. AI content optimization focuses on making your content easily digestible by AI crawlers while maintaining high value for human readers. The key is structuring your content with clear headings, well-organized information, and comprehensive coverage of topics. AI systems thrive on content that provides complete answers to user queries, so focus on creating comprehensive, authoritative content rather than keyword-stuffed articles. Use structured data markup, clear content hierarchies, and natural language that AI can easily understand and recommend. Remember that AI systems are looking for content that genuinely helps users, so prioritize quality and completeness over optimization tricks. This approach not only improves your AI visibility but also enhances your overall content quality and user experience. In 2025, AI content optimization has become essential for businesses looking to succeed in the AI-driven digital landscape.",
      // author: "Content Strategist",
      date: "2025-01-20",
      readTime: "11 min read",
      tags: ["Content Optimization", "AI Marketing", "SEO"],
    },
    {
      id: "7",
      slug: "measuring-ai-marketing-success",
      title:
        "Measuring AI Marketing Success in 2025: Key Metrics and Analytics Guide",
      excerpt:
        "Discover the essential metrics and analytics tools to track your AI marketing performance and optimize your strategy in 2025.",
      content:
        "Measuring the success of AI marketing efforts requires a different set of metrics than traditional digital marketing in 2025. Key performance indicators include AI-generated traffic, conversation quality scores, and AI recommendation accuracy. Track how often your content appears in AI responses and the quality of those mentions. Monitor your llms.txt effectiveness by analyzing which AI systems are accessing your content and how they're using it. Use analytics tools to identify patterns in AI traffic and understand which content performs best with AI systems. Look for metrics like AI engagement rates, content discovery speed, and AI-powered conversion rates. Remember that AI marketing success isn't just about traffic numbers - it's about the quality of AI interactions and how well your brand is represented in AI-generated responses. This comprehensive approach to measurement helps you optimize your AI marketing strategy for maximum impact. In 2025, AI marketing analytics have become essential for businesses looking to measure and improve their AI presence effectively.",
      // author: "Analytics Expert",
      date: "2025-01-18",
      readTime: "9 min read",
      tags: ["Analytics", "AI Marketing", "Performance"],
    },
    {
      id: "8",
      slug: "llms-txt-case-studies",
      title:
        "Real-World llms.txt Case Studies 2025: Success Stories and Lessons Learned",
      excerpt:
        "Explore real-world examples of businesses that have successfully implemented llms.txt and the results they achieved in 2025. Learn how llms.txt can boost your AI visibility, SEO, and digital marketing results.",
      content:
        "In 2025, real-world llms.txt case studies provide essential insights for businesses aiming to optimize their websites for AI and search engines. Companies across e-commerce, SaaS, and publishing are seeing 40-60% increases in AI-generated traffic after implementing effective llms.txt configurations. These case studies highlight improved AI recommendation accuracy, stronger brand representation in AI responses, and enhanced SEO performance. Key success factors include thorough content audits, strategic rule implementation, and ongoing monitoring and optimization. Common challenges involve balancing accessibility with security, maintaining simple yet effective rules, and adapting to evolving AI platform requirements. These 2025 case studies demonstrate that llms.txt implementation is not just a technical task but a strategic business decision that can significantly impact your AI marketing and SEO success. The lessons learned from these real-world implementations offer actionable guidance for businesses looking to maximize their AI presence, organic search traffic, and digital marketing ROI in 2025.",
      // author: "Case Study Researcher",
      date: "2025-01-16",
      readTime: "13 min read",
      tags: ["Case Studies", "llms.txt", "Success Stories"],
    },
    {
      id: "9",
      slug: "ai-seo-strategy-2025",
      title: "AI SEO Strategy 2025: Beyond Traditional Search Optimization",
      excerpt:
        "Develop a comprehensive AI SEO strategy that works with both traditional search engines and AI systems for maximum visibility in 2025.",
      content:
        "AI SEO in 2025 represents the next evolution of search optimization, requiring strategies that work with both traditional search engines and AI systems. Traditional SEO focuses on keyword optimization and backlink building, while AI SEO emphasizes content quality, comprehensive topical coverage, and natural language optimization. The key is creating content that answers user questions completely and provides genuine value, as AI systems prioritize helpful, authoritative content over keyword-stuffed pages. Implement structured data markup to help AI systems understand your content better, and use clear content hierarchies that AI can easily parse. Focus on creating content that serves user intent rather than just targeting keywords. In 2025, optimizing for AI search means using semantic search techniques, building topical authority, and ensuring your content is accessible to both Google and AI assistants like ChatGPT and Gemini. Remember that AI systems are looking for content that genuinely helps users, so prioritize quality and completeness. This approach not only improves your AI visibility but also enhances your traditional SEO performance, creating a comprehensive optimization strategy for the AI era. Companies implementing AI SEO strategies in 2025 see 40% better performance in AI-generated responses and 25% improvement in traditional search rankings.",
      // author: "SEO Specialist",
      date: "2025-01-14",
      readTime: "14 min read",
      tags: ["AI SEO", "Search Optimization", "Strategy"],
    },
    {
      id: "10",
      slug: "ai-models-support-llmstxt",
      title:
        "ChatGPT, Claude, Gemini: Which AI Models Support LLMs.txt Files?",
      excerpt:
        "A comprehensive guide to AI model compatibility with the llms.txt protocol. Learn which major AI models recognize and respect llms.txt files for content access control.",
      content:
        "As AI models become increasingly sophisticated, website owners need effective ways to control how these systems interact with their content. The llms.txt protocol has emerged as a standard for AI governance, but which models actually support it? Let's explore the current state of AI model compatibility with llms.txt files. Major AI models including ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google), LLaMA (Meta), and Mistral AI recognize llms.txt files. The format is becoming an industry standard for AI governance and transparency. These models use llms.txt to understand content access permissions and respect your website's AI interaction policies. Understanding which AI models support llms.txt is crucial for implementing effective content control strategies in 2025.",
      // author: "AI Expert",
      date: "2025-01-22",
      readTime: "5 min read",
      tags: ["AI Models", "ChatGPT", "Claude", "Gemini", "Technical"],
    },
    {
      id: "11",
      slug: "llmstxt-llm-text-optimization-ai-seo",
      title:
        "What is LLMs.txt and LLM Text Optimization for AI SEO",
      excerpt:
        "Discover how LLMs.txt revolutionizes AI content optimization and helps large language models access and understand your website content more effectively.",
      content:
        "LLMs.txt is a revolutionary new standard for AI content optimization that helps large language models access and understand your website content more effectively. This LLM text optimization protocol, created by Jeremy Howard from Answer.AI, addresses a critical challenge in the age of artificial intelligence. The protocol solves key problems including context window limitations, complex HTML parsing, and content accessibility issues. For content creators, it provides control over AI model access, improves visibility in AI-powered search results, protects proprietary content, and enhances brand reputation. For AI systems, it enables efficient content extraction without HTML parsing, provides standardized format for consistent processing, reduces computational overhead, and grants access to curated, high-quality content. LLMs.txt represents a fundamental shift in how websites communicate with AI systems, becoming essential for any website that wants to be properly understood and represented by AI systems.",
      // author: "AI Expert",
      date: "2025-01-25",
      readTime: "8 min read",
      tags: ["LLMs.txt", "AI SEO", "Content Optimization", "Technical"],
    },
    {
      id: "12",
      slug: "llm-text-llmstxt-benefits-seo-strategy",
      title:
        "LLM Text and LLMs.txt Benefits for SEO Strategy",
      excerpt:
        "Discover the significant advantages of implementing LLMs.txt for AI SEO (GEO - Generative Engine Optimization) and how it positions your website for the future of AI-powered search.",
      content:
        "Implementing LLMs.txt provides significant advantages for AI SEO (GEO - Generative Engine Optimization) and positions your website for the future of AI-powered search. The key benefits include improved AI visibility, brand control, content analysis & optimization, better AI performance, competitive advantage, and future-proofing. Unlike traditional SEO which operates largely on 'best practices,' LLMs.txt represents a more scientific approach to AI optimization with defined standards, verifiable AI recognition, and measurable results. This scientific approach to AI optimization through LLMs.txt represents a fundamental shift from traditional SEO practices, providing clear, structured guidelines for AI systems and implementing a verifiable, measurable system for AI content governance.",
      // author: "SEO Expert",
      date: "2025-01-26",
      readTime: "10 min read",
      tags: ["LLMs.txt", "AI SEO", "SEO Strategy", "GEO", "Technical"],
    },
    {
      id: "13",
      slug: "content-research-techniques-ai-era",
      title:
        "Content Research Techniques for the AI Era 2025: How to Create AI-Optimized Content",
      excerpt:
        "Master advanced content research techniques for 2025 that help you create content optimized for both human readers and AI systems. Learn how to use AI tools, keyword research, and competitive analysis to boost your SEO and AI visibility.",
      content:
        "Content research in the AI era requires a different approach than traditional keyword research, especially in 2025. Start by understanding what questions your audience is asking AI assistants and how those questions are being answered. Use AI tools to identify content gaps and opportunities that traditional research might miss. Focus on comprehensive topic coverage rather than just keyword targeting, as AI systems prefer content that provides complete answers to user queries. Research should include analyzing AI-generated responses to understand what content is being recommended and why. Look for patterns in how AI systems structure information and what types of content they prefer. Use competitive analysis to see how other brands are appearing in AI responses and identify opportunities for improvement. In 2025, leveraging AI-powered research tools, question research platforms, and content gap analysis software is essential for staying ahead in SEO and AI optimization. Remember that AI systems value content that genuinely helps users, so research should focus on understanding user needs and creating content that meets those needs comprehensively. This approach ensures your content is optimized for both human readers and AI systems, boosting your organic search rankings and AI visibility in 2025.",
      // author: "Content Researcher",
      date: "2025-01-12",
      readTime: "12 min read",
      tags: ["Content Research", "AI Optimization", "Research Techniques"],
    },
    {
      id: "14",
      slug: "sitemap-to-llms-txt-converter-guide",
      title: "Sitemap to llms.txt Converter: Complete Guide to AI-Optimized Content Curation",
      excerpt: "Learn how to convert your sitemap.xml into a curated llms.txt file using our free sitemap-to-llms.txt generator. Discover the benefits of automated content filtering, intelligent grouping, and AI-friendly formatting for better visibility.",
      content: "In 2025, the relationship between sitemap.xml and llms.txt is becoming increasingly important for AI SEO. While sitemap.xml provides a comprehensive list of all your website URLs, llms.txt offers a curated selection specifically designed for AI systems. Our sitemap-to-llms.txt converter bridges this gap, automatically transforming your complete sitemap into a focused, AI-optimized llms.txt file. The conversion process involves intelligent filtering to remove low-value pages like login forms, admin areas, and duplicate content. Our system then organizes remaining URLs into logical sections such as Primary, Docs, Blog, Help, and Products for better AI comprehension. Advanced features include content enrichment that fetches page titles and descriptions, section capping to prevent overwhelming AI systems, and rate limiting to respect target site limitations. This automated approach ensures your llms.txt file is not only comprehensive but also optimized for AI consumption, improving your visibility in AI-powered search results and recommendations.",
      // author: "AI SEO Expert",
      date: "2025-01-28",
      readTime: "10 min read",
      tags: ["Sitemap", "llms.txt", "AI SEO", "Content Curation", "2025", "Free Tool"],
    },
    {
      id: "15",
      slug: "ai-seo-strategy-2025-beyond-traditional-search",
      title: "AI SEO Strategy 2025: Beyond Traditional Search to AI-Powered Discovery",
      excerpt: "Develop a comprehensive 2025 AI SEO strategy that works with both traditional search engines and AI systems. Learn how to use semantic search, structured data, and llms.txt for maximum visibility in the AI era.",
      content: "The landscape of digital discovery is rapidly evolving in 2025, with AI systems becoming as important as traditional search engines for content discovery. A successful AI SEO strategy now requires understanding both traditional SEO principles and the unique requirements of AI-powered platforms. This comprehensive guide helps you develop a strategy that excels in both worlds. The evolution from keyword-focused SEO to AI understanding involves creating content that answers user intent, implementing semantic markup with Schema.org, and using llms.txt files to bridge traditional crawling and AI-specific content access. Key components include content structure with clear headings and logical flow, semantic markup for explicit context, proper llms.txt implementation, user intent optimization, and cross-platform consistency. Technical implementation involves using free llms.txt generators, implementing semantic HTML structure, creating comprehensive content clusters, optimizing for voice search, and monitoring AI crawler activity. Success measurement includes tracking AI-sourced traffic, monitoring brand mention accuracy, analyzing content discovery speed, measuring engagement rates from AI-recommended content, and using tools that track presence in AI-powered search results.",
      // author: "AI SEO Strategist",
      date: "2025-01-30",
      readTime: "15 min read",
      tags: ["AI SEO", "Search Strategy", "Semantic Search", "2025", "Technical SEO", "llms.txt"],
    },
    {
      id: "16",
      slug: "broken-link-detection-seo-tool",
      title: "Broken Link Detection: The Ultimate SEO Tool for Website Health",
      excerpt: "Discover how our advanced broken link detection tool helps you identify and fix broken links on your website. Improve SEO, user experience, and site performance with comprehensive link analysis.",
      content: "Broken links are more than just a nuisance—they can significantly impact your website's SEO performance, user experience, and search engine rankings. Our comprehensive broken link detection tool helps you identify and fix these issues before they hurt your site's performance. Broken links, also known as 'dead links' or 'orphaned links,' are hyperlinks that no longer lead to their intended destination. These links typically result in 404 'Not Found' errors or other HTTP error codes, creating a poor user experience and potentially harming your SEO efforts. Our advanced crawling technology systematically crawls your website, following all internal and external links to build a comprehensive map of your site's link structure. Each link is tested with HTTP requests to determine its status, identifying 404 errors, server errors, and other problematic responses. Get comprehensive reports with status codes, response times, context information, and actionable insights for fixing broken links. Regular broken link audits should be part of your SEO strategy to ensure your website maintains its search engine rankings and provides the best possible experience for your visitors.",
      // author: "SEO Expert",
      date: "2025-01-31",
      readTime: "8 min read",
      tags: ["Broken Links", "SEO Tool", "Website Health", "Link Analysis", "SEO Audit"],
    },
  ];

  const allTags = [
    "all",
    ...Array.from(new Set(blogPosts.flatMap((post) => post.tags))),
  ];

  const filteredPosts =
    selectedTag === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.tags.includes(selectedTag));

  return (
    <section
      id="blog"
      className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Latest Insights & Tutorials
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, best practices, and expert
            insights on llms.txt and AI-powered marketing.
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {tag === "all" ? "All Posts" : tag}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {filteredPosts.filter((post) => post.featured).length > 0 && (
          <div className="mb-8 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Featured Article
            </h3>
            {filteredPosts
              .filter((post) => post.featured)
              .map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      Featured
                    </span>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500 text-xs sm:text-sm">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    {post.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base mt-4"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
              ))}
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {filteredPosts
            .filter((post) => !post.featured)
            .map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-gray-500 text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="flex items-center space-x-1 sm:space-x-2 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
