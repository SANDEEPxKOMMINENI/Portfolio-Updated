/**
 * Sitemap Generator Module
 * 
 * Generates XML sitemap for search engine crawlers following the Sitemap Protocol.
 * Includes URL location, last modification date, change frequency, and priority.
 * 
 * Requirements: 4.1, 4.2
 */

import type { SitemapURL } from "./types";

/**
 * Generate XML sitemap from array of URLs
 * 
 * @param urls - Array of sitemap URL entries
 * @returns XML sitemap string
 */
export function generateSitemap(urls: SitemapURL[]): string {
  const urlEntries = urls
    .map((url) => {
      return `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Escape special XML characters
 * 
 * @param str - String to escape
 * @returns Escaped string safe for XML
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
