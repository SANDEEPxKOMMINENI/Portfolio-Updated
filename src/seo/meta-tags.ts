/**
 * Meta Tags Generator Module
 * 
 * Generates comprehensive HTML meta tags for SEO optimization including:
 * - Basic meta tags (title, description, viewport, charset)
 * - Open Graph tags for social media sharing
 * - Twitter Card tags
 * - Canonical URL
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 9.1, 9.2, 9.3
 */

import type { MetaTagsConfig, OpenGraphTags, TwitterCardTags } from "./types";

/**
 * Complete meta tags configuration combining all tag types
 */
export interface CompleteMetaTagsConfig extends MetaTagsConfig, OpenGraphTags, TwitterCardTags {}

/**
 * Truncate description to maximum length (160 characters recommended for SEO)
 */
function truncateDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3) + "...";
}

/**
 * Escape HTML special characters to prevent XSS and ensure valid HTML
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate basic meta tags (title, description, viewport, charset)
 * 
 * @param config - Meta tags configuration
 * @returns HTML string with basic meta tags
 */
export function generateBasicMetaTags(config: MetaTagsConfig): string {
  const description = truncateDescription(config.description);
  const tags: string[] = [];

  // Charset (should be first)
  tags.push('<meta charset="UTF-8">');

  // Viewport for mobile optimization
  tags.push('<meta name="viewport" content="width=device-width, initial-scale=1.0">');

  // Title
  tags.push(`<title>${escapeHtml(config.title)}</title>`);

  // Description
  tags.push(`<meta name="description" content="${escapeHtml(description)}">`);

  // Keywords (if provided)
  if (config.keywords && config.keywords.length > 0) {
    const keywordsStr = config.keywords.join(", ");
    tags.push(`<meta name="keywords" content="${escapeHtml(keywordsStr)}">`);
  }

  // Author (if provided)
  if (config.author) {
    tags.push(`<meta name="author" content="${escapeHtml(config.author)}">`);
  }

  // Canonical URL
  tags.push(`<link rel="canonical" href="${escapeHtml(config.canonicalUrl)}">`);

  return tags.join("\n");
}

/**
 * Generate Open Graph meta tags for social media sharing
 * 
 * @param config - Open Graph configuration
 * @returns HTML string with Open Graph meta tags
 */
export function generateOpenGraphTags(config: OpenGraphTags): string {
  const tags: string[] = [];

  // Required OG tags
  tags.push(`<meta property="og:title" content="${escapeHtml(config.ogTitle)}">`);
  tags.push(`<meta property="og:description" content="${escapeHtml(config.ogDescription)}">`);
  tags.push(`<meta property="og:image" content="${escapeHtml(config.ogImage)}">`);
  tags.push(`<meta property="og:type" content="${escapeHtml(config.ogType)}">`);
  tags.push(`<meta property="og:url" content="${escapeHtml(config.ogUrl)}">`);

  // Optional OG site name
  if (config.ogSiteName) {
    tags.push(`<meta property="og:site_name" content="${escapeHtml(config.ogSiteName)}">`);
  }

  return tags.join("\n");
}

/**
 * Generate Twitter Card meta tags for Twitter sharing
 * 
 * @param config - Twitter Card configuration
 * @returns HTML string with Twitter Card meta tags
 */
export function generateTwitterCardTags(config: TwitterCardTags): string {
  const tags: string[] = [];

  // Required Twitter Card tags
  tags.push(`<meta name="twitter:card" content="${escapeHtml(config.twitterCard)}">`);
  tags.push(`<meta name="twitter:title" content="${escapeHtml(config.twitterTitle)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeHtml(config.twitterDescription)}">`);
  tags.push(`<meta name="twitter:image" content="${escapeHtml(config.twitterImage)}">`);

  // Optional Twitter handles
  if (config.twitterSite) {
    tags.push(`<meta name="twitter:site" content="${escapeHtml(config.twitterSite)}">`);
  }
  if (config.twitterCreator) {
    tags.push(`<meta name="twitter:creator" content="${escapeHtml(config.twitterCreator)}">`);
  }

  return tags.join("\n");
}

/**
 * Generate all meta tags (basic, Open Graph, and Twitter Card)
 * 
 * This is the main function that combines all meta tag types into a single HTML string.
 * 
 * @param config - Complete meta tags configuration
 * @returns HTML string with all meta tags
 * 
 * @example
 * ```typescript
 * const metaTags = generateMetaTags({
 *   title: "Sandeep Kommineni — AI/ML Engineer",
 *   description: "AI/ML Engineer building production-grade AI platforms...",
 *   canonicalUrl: "https://sandeepkommineni.me",
 *   keywords: ["AI/ML Engineer", "Full-Stack Developer"],
 *   author: "Sandeep Kommineni",
 *   ogTitle: "Sandeep Kommineni — AI/ML Engineer",
 *   ogDescription: "AI/ML Engineer building production-grade AI platforms...",
 *   ogImage: "https://sandeepkommineni.me/static/profile.jpg",
 *   ogType: "website",
 *   ogUrl: "https://sandeepkommineni.me",
 *   twitterCard: "summary_large_image",
 *   twitterTitle: "Sandeep Kommineni — AI/ML Engineer",
 *   twitterDescription: "AI/ML Engineer building production-grade AI platforms...",
 *   twitterImage: "https://sandeepkommineni.me/static/profile.jpg"
 * });
 * ```
 */
export function generateMetaTags(config: CompleteMetaTagsConfig): string {
  const sections: string[] = [];

  // Basic meta tags
  sections.push(generateBasicMetaTags({
    title: config.title,
    description: config.description,
    canonicalUrl: config.canonicalUrl,
    keywords: config.keywords,
    author: config.author,
  }));

  // Open Graph tags
  sections.push(generateOpenGraphTags({
    ogTitle: config.ogTitle,
    ogDescription: config.ogDescription,
    ogImage: config.ogImage,
    ogType: config.ogType,
    ogUrl: config.ogUrl,
    ogSiteName: config.ogSiteName,
  }));

  // Twitter Card tags
  sections.push(generateTwitterCardTags({
    twitterCard: config.twitterCard,
    twitterTitle: config.twitterTitle,
    twitterDescription: config.twitterDescription,
    twitterImage: config.twitterImage,
    twitterSite: config.twitterSite,
    twitterCreator: config.twitterCreator,
  }));

  return sections.join("\n");
}
