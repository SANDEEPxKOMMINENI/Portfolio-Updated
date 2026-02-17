/**
 * Robots.txt Generator Module
 * 
 * Generates robots.txt file for search engine crawlers.
 * Includes User-agent directives, Allow/Disallow rules, and Sitemap reference.
 * 
 * Requirements: 4.3, 4.4
 */

/**
 * Generate robots.txt content
 * 
 * @param sitemapUrl - Full URL to the sitemap.xml file
 * @returns robots.txt content string
 */
export function generateRobotsTxt(sitemapUrl: string): string {
  return `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}`;
}
