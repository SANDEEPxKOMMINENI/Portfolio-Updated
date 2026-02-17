/**
 * Property-Based Tests for Sitemap Generator
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 4.2 Write property tests for sitemap
 * 
 * Tests validate the following properties:
 * - Property 10: Sitemap XML validity
 * - Property 11: Sitemap entry completeness
 * - Property 28: Clean URL structure
 * 
 * Validates: Requirements 4.1, 4.2, 10.2
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import { generateSitemap } from "../../src/seo/sitemap";
import type { SitemapURL } from "../../src/seo/types";

// ==================== Arbitraries (Generators) ====================

/**
 * Generate arbitrary change frequency values
 */
const changefreqArbitrary = fc.constantFrom(
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never"
);

/**
 * Generate arbitrary priority values (0.0 to 1.0)
 * Excludes NaN, Infinity, and negative infinity
 */
const priorityArbitrary = fc.double({ min: 0.0, max: 1.0, noNaN: true });

/**
 * Generate arbitrary ISO 8601 date strings
 * Uses a constrained date range to avoid invalid dates
 */
const isoDateArbitrary = fc
  .date({ min: new Date("1970-01-01"), max: new Date("2100-12-31") })
  .filter((date) => !isNaN(date.getTime()))
  .map((date) => date.toISOString());

/**
 * Generate clean URLs without query parameters or fragments
 */
const cleanUrlArbitrary = fc
  .webUrl()
  .map((url) => {
    // Remove query parameters and fragments to ensure clean URLs
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  });

/**
 * Generate arbitrary SitemapURL entry
 */
const sitemapURLArbitrary: fc.Arbitrary<SitemapURL> = fc.record({
  loc: cleanUrlArbitrary,
  lastmod: isoDateArbitrary,
  changefreq: changefreqArbitrary,
  priority: priorityArbitrary,
});

/**
 * Generate array of SitemapURL entries
 */
const sitemapURLArrayArbitrary = fc.array(sitemapURLArbitrary, {
  minLength: 1,
  maxLength: 20,
});

// ==================== Property Tests ====================

describe("Sitemap Property-Based Tests", () => {
  /**
   * Property 10: Sitemap XML validity
   * 
   * For any sitemap configuration, requesting /sitemap.xml should return valid XML
   * with proper urlset namespace and at least one url entry.
   * 
   * Validates: Requirements 4.1
   */
  test("Property 10: Sitemap XML validity", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        // Check XML declaration
        expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');

        // Check urlset with proper namespace
        expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        expect(xml).toContain("</urlset>");

        // Check that at least one url entry exists
        expect(xml).toContain("<url>");
        expect(xml).toContain("</url>");

        // Verify XML structure is well-formed (basic check)
        const openTags = (xml.match(/<url>/g) || []).length;
        const closeTags = (xml.match(/<\/url>/g) || []).length;
        expect(openTags).toBe(closeTags);
        expect(openTags).toBe(urls.length);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 11: Sitemap entry completeness
   * 
   * For any URL entry in the sitemap, it should include all required elements:
   * loc, lastmod, changefreq, and priority.
   * 
   * Validates: Requirements 4.2
   */
  test("Property 11: Sitemap entry completeness", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        // For each URL, verify all required elements are present
        urls.forEach((url) => {
          // Check loc element
          expect(xml).toContain("<loc>");
          expect(xml).toContain("</loc>");

          // Check lastmod element
          expect(xml).toContain("<lastmod>");
          expect(xml).toContain("</lastmod>");

          // Check changefreq element
          expect(xml).toContain("<changefreq>");
          expect(xml).toContain("</changefreq>");

          // Check priority element
          expect(xml).toContain("<priority>");
          expect(xml).toContain("</priority>");
        });

        // Verify count of each element matches URL count
        const locCount = (xml.match(/<loc>/g) || []).length;
        const lastmodCount = (xml.match(/<lastmod>/g) || []).length;
        const changefreqCount = (xml.match(/<changefreq>/g) || []).length;
        const priorityCount = (xml.match(/<priority>/g) || []).length;

        expect(locCount).toBe(urls.length);
        expect(lastmodCount).toBe(urls.length);
        expect(changefreqCount).toBe(urls.length);
        expect(priorityCount).toBe(urls.length);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 28: Clean URL structure
   * 
   * For any URL in the sitemap, it should be clean and descriptive without
   * unnecessary query parameters or session identifiers.
   * 
   * Validates: Requirements 10.2
   */
  test("Property 28: Clean URL structure", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        urls.forEach((url) => {
          // Extract the URL from the XML (it may be escaped)
          const locMatch = xml.match(new RegExp(`<loc>([^<]*${url.loc.replace(/[&<>"']/g, (c) => {
            const escapes: Record<string, string> = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&apos;'
            };
            return escapes[c] || c;
          }).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*)<\/loc>`));
          
          expect(locMatch).toBeTruthy();

          // Check that original URL doesn't contain query parameters
          // (Our generator already ensures this, but we verify the input)
          expect(url.loc).not.toContain("?");
          expect(url.loc).not.toContain("#");

          // Verify URL has proper structure (protocol + host + path)
          expect(url.loc).toMatch(/^https?:\/\/[^\/]+/);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: XML special character escaping
   * 
   * For any URL with special XML characters, they should be properly escaped
   * in the generated sitemap.
   */
  test("Property: XML special character escaping", () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            loc: fc.string().map((s) => `https://example.com/${s}`),
            lastmod: isoDateArbitrary,
            changefreq: changefreqArbitrary,
            priority: priorityArbitrary,
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (urls) => {
          const xml = generateSitemap(urls);

          // Verify that raw special characters are not present in URLs
          // (they should be escaped)
          const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
          if (urlMatches) {
            urlMatches.forEach((match) => {
              // Check that if original URL had &, it's escaped to &amp;
              if (match.includes("&") && !match.includes("&amp;")) {
                // If there's an & that's not part of &amp;, it should be escaped
                const hasUnescapedAmpersand = /&(?!amp;|lt;|gt;|quot;|apos;)/.test(match);
                expect(hasUnescapedAmpersand).toBe(false);
              }
            });
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Valid changefreq values
   * 
   * For any sitemap entry, the changefreq value should be one of the valid
   * values defined in the Sitemap Protocol.
   */
  test("Property: Valid changefreq values", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        const validChangefreqs = [
          "always",
          "hourly",
          "daily",
          "weekly",
          "monthly",
          "yearly",
          "never",
        ];

        urls.forEach((url) => {
          expect(validChangefreqs).toContain(url.changefreq);
          expect(xml).toContain(`<changefreq>${url.changefreq}</changefreq>`);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Valid priority range
   * 
   * For any sitemap entry, the priority value should be between 0.0 and 1.0.
   */
  test("Property: Valid priority range", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        urls.forEach((url) => {
          expect(url.priority).toBeGreaterThanOrEqual(0.0);
          expect(url.priority).toBeLessThanOrEqual(1.0);
          expect(xml).toContain(`<priority>${url.priority}</priority>`);
        });
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Valid ISO 8601 date format
   * 
   * For any sitemap entry, the lastmod date should be in valid ISO 8601 format.
   */
  test("Property: Valid ISO 8601 date format", () => {
    fc.assert(
      fc.property(sitemapURLArrayArbitrary, (urls) => {
        const xml = generateSitemap(urls);

        urls.forEach((url) => {
          // Check that lastmod is a valid ISO 8601 date
          const date = new Date(url.lastmod);
          expect(date.toISOString()).toBe(url.lastmod);
          expect(xml).toContain(`<lastmod>${url.lastmod}</lastmod>`);
        });
      }),
      { numRuns: 100 }
    );
  });
});


// ==================== Unit Tests for Edge Cases ====================

describe("Sitemap Unit Tests - Edge Cases", () => {
  /**
   * Test XML structure and formatting
   * Validates: Requirements 4.1, 4.2
   */
  describe("XML structure and formatting", () => {
    test("should generate valid XML with proper declaration", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    });

    test("should include proper urlset namespace", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "daily",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(xml).toContain("</urlset>");
    });

    test("should properly format URL entries with indentation", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/page",
          lastmod: "2024-01-15T12:00:00.000Z",
          changefreq: "monthly",
          priority: 0.5,
        },
      ];

      const xml = generateSitemap(urls);

      // Check for proper indentation and structure
      expect(xml).toContain("  <url>");
      expect(xml).toContain("    <loc>");
      expect(xml).toContain("    <lastmod>");
      expect(xml).toContain("    <changefreq>");
      expect(xml).toContain("    <priority>");
      expect(xml).toContain("  </url>");
    });

    test("should close all XML tags properly", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      // Count opening and closing tags
      const urlOpenCount = (xml.match(/<url>/g) || []).length;
      const urlCloseCount = (xml.match(/<\/url>/g) || []).length;
      const locOpenCount = (xml.match(/<loc>/g) || []).length;
      const locCloseCount = (xml.match(/<\/loc>/g) || []).length;
      const lastmodOpenCount = (xml.match(/<lastmod>/g) || []).length;
      const lastmodCloseCount = (xml.match(/<\/lastmod>/g) || []).length;
      const changefreqOpenCount = (xml.match(/<changefreq>/g) || []).length;
      const changefreqCloseCount = (xml.match(/<\/changefreq>/g) || []).length;
      const priorityOpenCount = (xml.match(/<priority>/g) || []).length;
      const priorityCloseCount = (xml.match(/<\/priority>/g) || []).length;

      expect(urlOpenCount).toBe(urlCloseCount);
      expect(locOpenCount).toBe(locCloseCount);
      expect(lastmodOpenCount).toBe(lastmodCloseCount);
      expect(changefreqOpenCount).toBe(changefreqCloseCount);
      expect(priorityOpenCount).toBe(priorityCloseCount);
    });
  });

  /**
   * Test with single and multiple URLs
   * Validates: Requirements 4.1, 4.2
   */
  describe("Single and multiple URLs", () => {
    test("should handle single URL entry", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<url>");
      expect(xml).toContain("https://example.com/");
      expect(xml).toContain("2024-01-01T00:00:00.000Z");
      expect(xml).toContain("weekly");
      expect(xml).toContain("1.0");

      // Verify only one URL entry
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(1);
    });

    test("should handle multiple URL entries", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
        {
          loc: "https://example.com/about",
          lastmod: "2024-01-02T00:00:00.000Z",
          changefreq: "monthly",
          priority: 0.8,
        },
        {
          loc: "https://example.com/contact",
          lastmod: "2024-01-03T00:00:00.000Z",
          changefreq: "yearly",
          priority: 0.5,
        },
      ];

      const xml = generateSitemap(urls);

      // Verify all URLs are present
      expect(xml).toContain("https://example.com/");
      expect(xml).toContain("https://example.com/about");
      expect(xml).toContain("https://example.com/contact");

      // Verify correct number of URL entries
      const urlCount = (xml.match(/<url>/g) || []).length;
      expect(urlCount).toBe(3);
    });

    test("should maintain order of URLs", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/first",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "daily",
          priority: 1.0,
        },
        {
          loc: "https://example.com/second",
          lastmod: "2024-01-02T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "https://example.com/third",
          lastmod: "2024-01-03T00:00:00.000Z",
          changefreq: "monthly",
          priority: 0.6,
        },
      ];

      const xml = generateSitemap(urls);

      // Check that URLs appear in the correct order
      const firstIndex = xml.indexOf("https://example.com/first");
      const secondIndex = xml.indexOf("https://example.com/second");
      const thirdIndex = xml.indexOf("https://example.com/third");

      expect(firstIndex).toBeLessThan(secondIndex);
      expect(secondIndex).toBeLessThan(thirdIndex);
    });
  });

  /**
   * Test XML escaping for special characters
   * Validates: Requirements 4.1, 4.2
   */
  describe("XML escaping for special characters", () => {
    test("should escape ampersands in URLs", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/page?param1=value1&param2=value2",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      // Ampersands should be escaped
      expect(xml).toContain("&amp;");
      expect(xml).toContain("param1=value1&amp;param2=value2");
      
      // Should not contain unescaped ampersands in URLs
      const locContent = xml.match(/<loc>(.*?)<\/loc>/)?.[1];
      if (locContent) {
        // Check for unescaped ampersands (not part of entity)
        const hasUnescapedAmpersand = /&(?!amp;|lt;|gt;|quot;|apos;)/.test(locContent);
        expect(hasUnescapedAmpersand).toBe(false);
      }
    });

    test("should escape less-than and greater-than signs", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/<test>",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("&lt;");
      expect(xml).toContain("&gt;");
      expect(xml).not.toContain("<test>");
    });

    test("should escape quotes in URLs", () => {
      const urls: SitemapURL[] = [
        {
          loc: 'https://example.com/page?title="test"',
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("&quot;");
    });

    test("should escape apostrophes in URLs", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/page?title='test'",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("&apos;");
    });

    test("should handle multiple special characters in same URL", () => {
      const urls: SitemapURL[] = [
        {
          loc: 'https://example.com/page?a=1&b=2&title="test\'s"',
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("&amp;");
      expect(xml).toContain("&quot;");
      expect(xml).toContain("&apos;");
    });

    test("should not double-escape already escaped entities", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/page?param=value",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
      ];

      const xml = generateSitemap(urls);

      // Should not contain double-escaped entities like &amp;amp;
      expect(xml).not.toContain("&amp;amp;");
      expect(xml).not.toContain("&amp;lt;");
      expect(xml).not.toContain("&amp;gt;");
    });
  });

  /**
   * Test different changefreq values
   * Validates: Requirements 4.2
   */
  describe("Change frequency values", () => {
    test("should handle all valid changefreq values", () => {
      const changefreqs: Array<SitemapURL["changefreq"]> = [
        "always",
        "hourly",
        "daily",
        "weekly",
        "monthly",
        "yearly",
        "never",
      ];

      changefreqs.forEach((freq) => {
        const urls: SitemapURL[] = [
          {
            loc: "https://example.com/",
            lastmod: "2024-01-01T00:00:00.000Z",
            changefreq: freq,
            priority: 0.8,
          },
        ];

        const xml = generateSitemap(urls);

        expect(xml).toContain(`<changefreq>${freq}</changefreq>`);
      });
    });
  });

  /**
   * Test different priority values
   * Validates: Requirements 4.2
   */
  describe("Priority values", () => {
    test("should handle priority 0.0", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<priority>0</priority>");
    });

    test("should handle priority 1.0", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<priority>1</priority>");
    });

    test("should handle decimal priority values", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.5,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<priority>0.5</priority>");
    });

    test("should handle various priority values", () => {
      const priorities = [0.0, 0.1, 0.25, 0.5, 0.75, 0.9, 1.0];

      priorities.forEach((priority) => {
        const urls: SitemapURL[] = [
          {
            loc: "https://example.com/",
            lastmod: "2024-01-01T00:00:00.000Z",
            changefreq: "weekly",
            priority: priority,
          },
        ];

        const xml = generateSitemap(urls);

        expect(xml).toContain(`<priority>${priority}</priority>`);
      });
    });
  });

  /**
   * Test date formatting
   * Validates: Requirements 4.2
   */
  describe("Date formatting", () => {
    test("should include ISO 8601 formatted dates", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-15T10:30:45.123Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<lastmod>2024-01-15T10:30:45.123Z</lastmod>");
    });

    test("should handle dates without milliseconds", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<lastmod>2024-01-01T00:00:00Z</lastmod>");
    });

    test("should handle different date formats", () => {
      const dates = [
        "2024-01-01T00:00:00.000Z",
        "2024-12-31T23:59:59.999Z",
        "2024-06-15T12:30:45.500Z",
      ];

      dates.forEach((date) => {
        const urls: SitemapURL[] = [
          {
            loc: "https://example.com/",
            lastmod: date,
            changefreq: "weekly",
            priority: 1.0,
          },
        ];

        const xml = generateSitemap(urls);

        expect(xml).toContain(`<lastmod>${date}</lastmod>`);
      });
    });
  });

  /**
   * Test URL variations
   * Validates: Requirements 4.1, 4.2
   */
  describe("URL variations", () => {
    test("should handle root URL", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<loc>https://example.com/</loc>");
    });

    test("should handle URLs with paths", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/about/team",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "monthly",
          priority: 0.7,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<loc>https://example.com/about/team</loc>");
    });

    test("should handle URLs with query parameters", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/search?q=test&category=blog",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "daily",
          priority: 0.6,
        },
      ];

      const xml = generateSitemap(urls);

      // Query parameters should be escaped
      expect(xml).toContain("q=test&amp;category=blog");
    });

    test("should handle HTTPS and HTTP URLs", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/secure",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          loc: "http://example.com/insecure",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 0.5,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<loc>https://example.com/secure</loc>");
      expect(xml).toContain("<loc>http://example.com/insecure</loc>");
    });

    test("should handle URLs with different domains", () => {
      const urls: SitemapURL[] = [
        {
          loc: "https://example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "weekly",
          priority: 1.0,
        },
        {
          loc: "https://blog.example.com/",
          lastmod: "2024-01-01T00:00:00.000Z",
          changefreq: "daily",
          priority: 0.9,
        },
      ];

      const xml = generateSitemap(urls);

      expect(xml).toContain("<loc>https://example.com/</loc>");
      expect(xml).toContain("<loc>https://blog.example.com/</loc>");
    });
  });
});
