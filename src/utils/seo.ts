/**
 * SEO utility functions to prevent duplicate titles and improve SEO
 */

/**
 * Generates a unique title for 404 pages to prevent duplicate title issues
 */
export function generate404Title(slug: string, baseTitle: string = "Page Not Found"): string {
  // Create a more unique title by including the slug in a more descriptive way
  const cleanSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  return `${baseTitle} - ${cleanSlug} | TheLLMsTxt`;
}

/**
 * Generates a unique title for blog posts to prevent duplicates
 */
export function generateBlogTitle(title: string): string {
  const baseTitle = title || "Untitled Blog Post";
  return `${baseTitle} – TheLLMsTxt`;
}

/**
 * Generates a unique title for dynamic pages
 */
export function generateDynamicTitle(pageName: string, identifier: string): string {
  return `${pageName}: ${identifier} – TheLLMsTxt`;
}

/**
 * Validates that a title is unique and not too long
 */
export function validateTitle(title: string): { isValid: boolean; message?: string } {
  if (!title || title.trim().length === 0) {
    return { isValid: false, message: "Title cannot be empty" };
  }
  
  if (title.length > 60) {
    return { isValid: false, message: "Title should be under 60 characters for optimal SEO" };
  }
  
  if (title.length < 10) {
    return { isValid: false, message: "Title should be at least 10 characters for better SEO" };
  }
  
  return { isValid: true };
}

/**
 * Generates a unique meta description
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  if (!content || content.trim().length === 0) {
    return "Professional SEO analysis and website optimization tools. Improve your search engine rankings with our comprehensive SEO tools.";
  }
  
  if (content.length <= maxLength) {
    return content;
  }
  
  // Truncate at the last complete sentence or word
  const truncated = content.substring(0, maxLength - 3);
  const lastSentence = truncated.lastIndexOf('.');
  const lastWord = truncated.lastIndexOf(' ');
  
  const cutPoint = lastSentence > lastWord ? lastSentence + 1 : lastWord;
  
  return truncated.substring(0, cutPoint) + '...';
}

/**
 * Generates canonical URL
 */
export function generateCanonicalUrl(path: string, baseUrl: string = "https://thellmstxt.com"): string {
  // Remove trailing slash and ensure proper formatting
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
