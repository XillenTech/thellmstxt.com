import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: (string | string[])[];
  readTime: string;
  tags: string[];
  featured?: boolean;
}

// Blog data - in a real app, this would come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "complete-guide-to-llms-txt",
    title: "What is llms.txt? The Complete Guide to Implementation in 2025",
    excerpt:
      "Learn how to create llms.txt files and discover the benefits of llms.txt for your website. Compare the best llms.txt generator options and understand the llms.txt format spec in this comprehensive guide.",
    content: [
      "Wondering what is llms.txt and how it can help your website? This revolutionary protocol is changing how websites interact with AI systems in 2025. The llms.txt format spec provides a standardized way to control how AI language models access your content. Our llms.txt integration guide will show you exactly how to use llms.txt for SEO and AI presence.",
      "A common question is about llms.txt vs robots.txt differences. While robots.txt manages traditional search engine crawlers, llms.txt specifically instructs AI crawlers. Understanding this distinction helps you choose between llms.txt generator vs manual creation approaches. One of the key benefits of llms.txt is the granular control it provides over your intellectual property.",
      "How to Create llms.txt for SEO and AI Optimization:",
      [
        "First, decide between using a free llms.txt generator online or manual creation. While manual gives full control, the best llms.txt generator tools prevent syntax errors.",
        "Follow the llms.txt format spec when creating your file to ensure maximum compatibility with hosts supporting llms.txt.",
        "Consider using an llms.txt generator API to automate llms.txt generation as your site grows.",
        "For ecommerce platforms, specialized solutions like the llms.txt tool for Shopify can simplify implementation.",
        "Compare llms.txt tools to find the right balance of features and ease of use for your needs.",
      ],
      "Key Benefits of llms.txt Implementation:",
      [
        "When you compare llms.txt tools vs plugins, dedicated tools often provide better control and flexibility.",
        "The llms.txt for eCommerce site implementations can protect pricing while allowing product discovery.",
        "Understanding llms-full.txt vs llms.txt helps you choose the right protocol for your needs.",
        "Using an llms.txt generator tool ensures your directives are properly formatted.",
        "Regular updates through automated llms.txt generation keep your rules current.",
      ],
      "Recent developments show that major AI platforms are increasingly respecting llms.txt directives. Whether you use a free llms.txt generator online or create your file manually, it significantly impacts how your brand appears in AI-driven conversations.",
      "As AI continues to evolve, having a properly configured llms.txt file is essential. This is not just a technical task but a core part of a modern SEO strategy for any business wanting to maintain control in an AI-driven world.",
    ],
    readTime: "8 min read",
    tags: ["llms.txt", "AI Marketing", "SEO", "2025"],
    featured: true,
  },
  {
    id: "2",
    slug: "ai-shopping-changing-ecommerce",
    title:
      "How AI Shopping is Changing E-commerce in 2025: The Ultimate Guide to Conversational Commerce",
    excerpt:
      "Explore the 2025 trend of conversational commerce and discover how AI assistants are transforming product discovery and online shopping. Learn how to optimize your e-commerce site for AI, llms.txt, and SEO to boost sales and visibility.",
    content: [
      "In 2025, the landscape of online shopping is being transformed by AI assistants like ChatGPT, Claude, and Google Gemini. For businesses, this means mastering a new set of rules, including the critical implementation of llms.txt for eCommerce site success. This file is your gateway to controlling how AI interacts with your product catalog.",
      "Why AI Shopping Matters for E-commerce in 2025:",
      [
        "Voice-activated shopping through smart speakers, which pull data based on crawler permissions.",
        "Hyper-personalized product recommendations powered by AI models that have scraped your site.",
        "Automated price comparison and deal finding, making competitive visibility crucial.",
        "Seamless shopping experiences where AI assists the user from discovery to checkout.",
        "Social commerce integrations where AI chatbots recommend your products.",
      ],
      "To succeed, your business must optimize for AI discovery. This involves structuring product data for AI crawlers and protecting checkout processes and customer data with a robust llms.txt file. For platforms like Shopify, using a dedicated llms.txt tool for Shopify can simplify this process immensely, ensuring you follow best practices without deep technical knowledge.",
      "2025 E-commerce Optimization Checklist:",
      [
        "Implement and maintain an llms.txt file; consider a specialized llms.txt generator tool to avoid errors.",
        "Structure product data with schemas that both AI and search engines can understand.",
        "Automate llms.txt generation to keep rules updated as your product inventory changes.",
        "Choose from one of the many hosts supporting llms.txt to ensure your directives are served correctly.",
        "Continuously monitor AI-driven traffic and update your content strategy based on performance data.",
      ],
      "Major retailers are already seeing significant gains from AI recommendations. The common thread among them is an effective llms.txt for eCommerce site strategy. They understand that controlling AI access is as important as attracting it. As you scale, you may even consider using an llms.txt generator API to programmatically manage access rules based on inventory or promotions.",
      "Stay ahead in 2025 by making your e-commerce site AI-ready. The benefits of llms.txt in this sector—from protecting pricing strategies to guiding AIs to new product lines—are too significant to ignore.",
    ],
    readTime: "12 min read",
    tags: [
      "E-commerce",
      "AI Shopping",
      "Conversational Commerce",
      "2025",
      "SEO",
    ],
  },
  {
    id: "3",
    slug: "llms-txt-vs-robots-txt",
    title:
      "llms.txt vs robots.txt in 2025: Key Differences, SEO Impact, and Best Practices",
    excerpt:
      "Understand the crucial differences between llms.txt and robots.txt in 2025. Learn when to use each protocol for optimal AI and search engine visibility, and how to structure your files for maximum SEO and brand safety.",
    content: [
      "In 2025, the discussion around llms.txt vs robots.txt is central to modern technical SEO. While both are text files placed in your site's root directory to manage crawler access, their targets and purposes are fundamentally different, and using them correctly is key to digital strategy.",
      "Key Differences Between llms.txt and robots.txt:",
      [
        "Purpose: robots.txt primarily guides search engine crawlers (like Googlebot) for indexing, while llms.txt specifically instructs AI crawlers (like ChatGPT-User) for data collection and training.",
        "Impact: robots.txt affects your visibility in traditional search engine results pages (SERPs). In contrast, llms.txt influences how your brand and content are represented in AI-generated responses and recommendations.",
        "Directives: While syntactically similar, the user-agents and specific rules can differ. You might allow a search bot to a page you disallow an AI from, or vice-versa.",
      ],
      "Another important distinction to understand is llms-full.txt vs llms.txt. The standard 'llms.txt' file provides crawler access rules, similar to robots.txt. However, the proposed 'llms-full.txt' standard could offer richer information, such as licensing details, preferred citation formats, and contact information for licensing inquiries, giving content creators even more control.",
      "When choosing how to create these files, you can compare llms.txt tools available on the market. The debate of llms.txt tools vs plugin solutions often comes down to your platform (e.g., WordPress vs. a custom build) and your need for automation. A plugin might be easier, but a standalone tool could offer more advanced features.",
      "2025 Best Practices for Both Files:",
      [
        "Maintain separate, up-to-date llms.txt and robots.txt files in your root directory.",
        "Use clear, unambiguous rules in each file to avoid misinterpretation by crawlers.",
        "Audit both files regularly to ensure they align with your current content and privacy strategy.",
        "Utilize testing tools to validate syntax and ensure they are working as intended.",
      ],
      "As AI becomes more prevalent, mastering the nuances of the llms.txt vs robots.txt protocols is no longer optional. It's an essential skill for anyone serious about controlling their digital footprint in 2025.",
    ],
    readTime: "6 min read",
    tags: ["llms.txt", "robots.txt", "Technical", "2025", "SEO"],
  },
  {
    id: "4",
    slug: "best-practices-implementing-llms-txt",
    title:
      "Best Practices for Implementing llms.txt in 2025: A Step-by-Step SEO Guide",
    excerpt:
      "Discover proven strategies and common pitfalls to avoid when setting up llms.txt for optimal AI crawler control and SEO in 2025. Learn how to protect your content, boost AI visibility, and improve your digital marketing results.",
    content: [
      "Effectively implementing llms.txt in 2025 is more than just creating a file; it's a strategic process. This llms.txt integration guide will walk you through the best practices. The first decision is often the 'llms.txt generator vs manual' approach. While a manual approach offers custom control, using the best llms.txt generator for your needs can prevent costly syntax errors and save time.",
      "2025 Implementation Steps:",
      [
        "Content Audit: Before writing a single rule, identify which content is public, which is proprietary, and which is sensitive.",
        "Choose Your Tool: Decide if you will write the file by hand or use a tool. Many a free llms.txt generator online can handle basic needs, but premium tools offer more features.",
        "Draft Clear Rules: Following the llms.txt format spec, create simple Allow and Disallow rules for different AI user-agents.",
        "Test Rigorously: Before deploying, validate your file's syntax and test its logic to ensure it behaves as expected.",
        "Monitor and Update: Your website is dynamic, and so your llms.txt should be too. Revisit it quarterly or after major site changes.",
      ],
      "A key best practice is to always allow access to your homepage and primary landing pages. Conversely, be vigilant about blocking admin panels, user account pages, and internal search results to protect privacy and prevent AI from learning from irrelevant content. Knowing how to create llms.txt properly is a critical skill.",
      "2025 Best Practices:",
      [
        "Use comments (#) in your file to explain complex rules for future reference.",
        "Test against multiple AI user-agents (e.g., from Google, OpenAI, Anthropic).",
        "Keep the file size minimal for faster processing by crawlers.",
        "Be specific with your rules; avoid overly broad wildcards (*) that might have unintended consequences.",
        "When in doubt, compare llms.txt tools to find one that includes validation and best-practice suggestions.",
      ],
      "Proper llms.txt implementation is now a critical component of any successful digital marketing and SEO strategy in 2025.",
    ],
    readTime: "10 min read",
    tags: ["Implementation", "Best Practices", "Technical", "2025", "SEO"],
  },
  {
    id: "5",
    slug: "future-ai-powered-marketing",
    title:
      "The Future of AI-Powered Marketing in 2025: Trends, Strategies, and SEO Insights",
    excerpt:
      "Explore the top 2025 trends in AI marketing and discover how businesses can prepare for the next wave of AI-driven customer interactions. Learn how to optimize your content for both AI and search engines to stay ahead.",
    content: [
      "In 2025, AI technology is no longer a futuristic concept but a core driver of digital marketing. As AI assistants become the primary interface for discovery, marketers must adapt. A key part of this adaptation is understanding how to use llms.txt for SEO, as this file controls the very data that fuels these AI systems.",
      "Emerging AI Marketing Trends for 2025:",
      [
        "Conversational AI for customer service and sales, trained on your approved content.",
        "AI-driven content personalization delivered at an unprecedented scale.",
        "Predictive analytics for anticipating customer needs and reducing churn.",
        "Automated campaign optimization using real-time performance data.",
        "Technical controls like llms.txt to manage brand representation in AI.",
        "Leveraging the full benefits of llms.txt, such as protecting intellectual property while guiding AIs to marketing materials.",
      ],
      "2025 Optimization Tips:",
      [
        "Ensure your key marketing content is accessible to AI crawlers via your llms.txt file.",
        "Use an llms.txt generator to quickly create and update your rules, ensuring you keep pace with marketing campaigns.",
        "Implement structured data to give AI and search engines clear context about your content.",
        "Create comprehensive, authoritative content that positions you as a leader in AI-driven search.",
        "Monitor AI-driven traffic and engagement to measure the ROI of your AI SEO efforts.",
      ],
      "The future of AI-powered marketing hinges on a dual strategy: creating exceptional content for humans and providing clear instructions for machines. By harnessing tools like llms.txt, marketers can ensure their brand remains visible, accurate, and influential in an increasingly automated and search-optimized marketplace.",
    ],
    readTime: "15 min read",
    tags: ["AI Marketing", "Future Trends", "Strategy", "2025", "SEO"],
  },
  {
    id: "6",
    slug: "ai-content-optimization-guide",
    title:
      "AI Content Optimization Guide 2025: Make Your Content AI & SEO Friendly",
    excerpt:
      "Learn proven strategies to optimize your content for AI systems and search engines in 2025. Discover actionable tips for structure, markup, and comprehensive coverage to boost your rankings and AI visibility.",
    content: [
      "Creating content that excels in the age of AI requires a new playbook. In 2025, your content must be easily digestible for AI crawlers while remaining engaging for human readers. This dual focus is the key to visibility. However, great content is useless if it's invisible, which is why understanding how to use llms.txt for SEO is a foundational step.",
      "2025 Content Optimization Strategies:",
      [
        "Use clear, descriptive headings (H1, H2, H3) to create a logical structure that both users and machines can follow.",
        "Ensure your llms.txt file explicitly allows crawlers access to your pillar content and blog posts.",
        "Write in a natural, conversational tone that answers user questions directly, making it perfect for AI to use in responses.",
        "Implement structured data (Schema.org) to provide explicit context about your content's meaning.",
        "Adhere to the llms.txt format spec to ensure your crawling instructions are interpreted correctly by all major AI models.",
      ],
      "AI systems and modern search engines are designed to reward content that demonstrates expertise, authoritativeness, and trustworthiness (E-E-A-T). Prioritizing high-quality, comprehensive content over old-school keyword stuffing not only improves your AI and SEO visibility but also builds a loyal human audience.",
      "Before publishing, always double-check your technical setup. An incorrectly configured llms.txt file could inadvertently block the very content you've worked so hard to optimize. In 2025, content strategy and technical SEO, particularly your llms.txt configuration, are inextricably linked.",
    ],
    readTime: "11 min read",
    tags: ["Content Optimization", "AI Marketing", "SEO", "2025"],
  },
  {
    id: "7",
    slug: "measuring-ai-marketing-success",
    title:
      "Measuring AI Marketing Success in 2025: Key Metrics, Analytics, and SEO Performance",
    excerpt:
      "Discover the essential 2025 metrics and analytics tools to track your AI marketing and SEO performance. Learn how to optimize your strategy for maximum impact in the AI-driven digital landscape.",
    content: [
      "In 2025, measuring the ROI of AI marketing requires looking beyond traditional metrics like traffic and conversions. Success is now measured by your brand's presence and accuracy within AI-generated responses. This involves a new suite of KPIs and tools that connect directly to your technical SEO setup.",
      "2025 AI Marketing Metrics:",
      [
        "AI-Sourced Traffic: Segmenting visitors who arrive from a link in an AI chat response.",
        "Brand Mention Accuracy: Tracking how accurately AI models represent your products and services.",
        "llms.txt Compliance Rate: Analyzing server logs to see which AI crawlers are respecting your llms.txt directives.",
        "Content Discovery Speed: Measuring the time it takes for new content to be picked up by AI systems.",
        "For advanced users, you can even automate llms.txt generation based on performance, using an llms.txt generator API to block crawlers that provide low-quality traffic.",
      ],
      "Monitoring your llms.txt effectiveness is crucial. Check server logs to see which hosts supporting llms.txt are sending crawlers and if they are accessing the intended sections. This data can reveal which AI platforms are driving the most value, allowing you to refine your access rules for better performance.",
      "2025 Analytics Tools:",
      [
        "AI Visibility Trackers: Tools that monitor your brand's presence in major AI chatbots.",
        "Log File Analyzers: Software to parse server logs for AI crawler activity.",
        "Programmatic SEO Platforms: Systems that can leverage an llms.txt generator API to manage rules at scale.",
        "Real-time Interaction Monitors: Dashboards that track how users engage with your brand via AI interfaces.",
      ],
      "Success in 2025 is about quality of interaction. It's not just about being seen by AI, but about being understood correctly. Your analytics should reflect this, tying directly back to the control you exert through your llms.txt file.",
    ],
    readTime: "9 min read",
    tags: ["Analytics", "AI Marketing", "Performance", "2025", "SEO"],
  },
  {
    id: "8",
    slug: "llms-txt-case-studies",
    title:
      "Real-World llms.txt Case Studies 2025: Success Stories, SEO Wins, and Lessons Learned",
    excerpt:
      "Explore real-world 2025 examples of businesses that have successfully implemented llms.txt. Learn how llms.txt can boost your AI visibility, SEO, and digital marketing results with actionable case studies.",
    content: [
      "In 2025, the theoretical benefits of llms.txt are being proven by real-world results. Businesses across sectors are leveraging this simple text file to achieve significant gains in AI visibility and brand control. These case studies highlight the impact of a well-crafted strategy.",
      "Case Study 1: The E-commerce Retailer. A mid-sized business using Shopify struggled with AI assistants recommending outdated products. By implementing a specific llms.txt for eCommerce site strategy with an llms.txt tool for Shopify, they guided crawlers to in-stock items and new arrivals. The result was a 30% increase in AI-referred sales and a dramatic decrease in customer complaints about incorrect information.",
      "2025 Case Study Highlights:",
      [
        "A SaaS company saw improved brand representation after blocking AI access to their internal development wikis.",
        "A publisher protected its premium content by disallowing AI crawlers while still allowing them to index article abstracts, driving subscriptions.",
        "Many companies found success by first using a free llms.txt generator online to establish a baseline before refining rules manually.",
        "The common theme is discovering the direct benefits of llms.txt through strategic implementation.",
      ],
      "Case Study 2: The B2B Tech Firm. This company wanted to become a thought leader. They used what they considered the best llms.txt generator to create a file that disallowed crawlers from their sales-oriented pages but gave full access to their blog and whitepapers. Within three months, their CEO was being cited in AI-generated reports on industry trends, establishing clear topical authority.",
      "These 2025 case studies prove that llms.txt is a powerful strategic lever. From learning how to create llms.txt for a specific goal to seeing tangible SEO and marketing wins, the lessons from these pioneers provide a clear roadmap for others.",
    ],
    readTime: "13 min read",
    tags: ["Case Studies", "llms.txt", "Success Stories", "2025", "SEO"],
  },
  {
    id: "9",
    slug: "ai-seo-strategy-2025",
    title:
      "AI SEO Strategy 2025: Beyond Traditional Search Optimization for Maximum Visibility",
    excerpt:
      "Develop a comprehensive 2025 AI SEO strategy that works with both traditional search engines and AI systems. Learn how to use semantic search, structured data, and topical authority to boost your rankings.",
    content: [
      "AI SEO in 2025 is a holistic discipline that merges classic SEO with new directives for artificial intelligence. A winning strategy must cater to both Google's search crawlers and the data-gathering bots of AI models like Gemini and ChatGPT. This requires a nuanced approach that starts with your site's foundational instructions.",
      "A core pillar of any modern AI SEO strategy is understanding how to use llms.txt for SEO. This file is your first and most direct line of communication with AI systems. It dictates the boundaries of what data they can learn from, directly impacting how they perceive your brand's expertise and offerings.",
      "2025 AI SEO Best Practices:",
      [
        "Create authoritative, comprehensive content that answers user questions thoroughly.",
        "Master the llms.txt vs robots.txt distinction, creating separate, clear rules for both AI and search crawlers.",
        "Implement detailed Schema.org structured data to give machines unambiguous context about your content.",
        "Focus on building topical authority across a niche, not just ranking for isolated keywords.",
        "Optimize for 'zero-click' environments by structuring content to be easily used in featured snippets and AI answers.",
      ],
      "In 2025, your strategy must account for the different ways information is surfaced. A page might rank #1 in traditional search but be ignored by AI if your llms.txt file is too restrictive. Conversely, a permissive llms.txt could lead to your content being used in ways you don't want. The balance is key. Considering tools to automate llms.txt generation can help maintain this balance as your site evolves.",
      "Companies that integrate AI SEO strategies see powerful synergistic effects: better rankings in traditional search and more accurate, favorable representation in AI-powered discovery. It's no longer about optimizing for one or the other; it's about a unified strategy for the new age of information retrieval.",
    ],
    readTime: "14 min read",
    tags: ["AI SEO", "Search Optimization", "Strategy", "2025", "SEO"],
  },
  {
    id: "10",
    slug: "content-research-techniques-ai-era",
    title:
      "Content Research Techniques for the AI Era 2025: How to Create AI-Optimized, SEO-Driven Content",
    excerpt:
      "Master advanced 2025 content research techniques to create content optimized for both human readers and AI systems. Use AI tools, keyword research, and competitive analysis to boost your SEO and AI visibility.",
    content: [
      "Content research in 2025 has evolved. It's no longer enough to analyze search engine results pages. You must now investigate what AI chatbots are saying about your industry and how your competitors are influencing those conversations. This requires a new set of research techniques.",
      "2025 Research Methods for AI and SEO:",
      [
        "Query AI Chatbots: Directly ask AI models like ChatGPT and Claude questions your customers would ask. Analyze the sources they cite and the gaps in their knowledge.",
        "Competitive llms.txt Analysis: Examine your competitors' `llms.txt` files (e.g., `competitor.com/llms.txt`). What are they allowing or disallowing? This reveals their AI content strategy.",
        "Use an llms.txt generator tool not just for creation, but for its potential analysis features. Some advanced tools can highlight what's different between your file and a competitor's.",
        "Identify 'Answer Gaps': Find questions that AI struggles to answer well and create definitive content to fill that void.",
        "Monitor AI-Sourced Questions: Use analytics to see what questions users are asking that lead them to your site from an AI.",
      ],
      "Your research should also inform your technical strategy. For example, if you find a competitor is using a specific WordPress plugin to manage their file, you can research the llms.txt tools vs plugin pros and cons for your own stack. You might also want to compare llms.txt tools to see which offers the best features for competitive intelligence.",
      "In 2025, a comprehensive content strategy is built on a foundation of deep research into both human and machine information ecosystems. By understanding how AI discovers and processes content, you can create SEO-driven articles and landing pages that are perfectly positioned to become authoritative sources in the AI era.",
    ],
    readTime: "12 min read",
    tags: [
      "Content Research",
      "AI Optimization",
      "Research Techniques",
      "2025",
      "SEO",
    ],
  },
];
interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const unwrappedParams = React.use(params) as { slug: string };
  const post = blogPosts.find((p) => p.slug === unwrappedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm sm:text-base font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs</span>
          </Link>
        </div>

        {/* Blog Post */}
        <article className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100">
          {/* Post Header */}
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
              {post.featured && (
                <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Featured
                </span>
              )}
              <div className="flex items-center space-x-2 text-gray-500 text-xs sm:text-sm">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Post Content */}
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            {post.content.map((block, idx) =>
              Array.isArray(block) ? (
                <ul key={idx} className="list-disc pl-4 sm:pl-6 mb-4 text-gray-700">
                  {block.map((item, i) => (
                    <li key={i} className="text-sm sm:text-base">{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  {block}
                </p>
              )
            )}
          </div>

          {/* Tags */}
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default BlogPostPage;
