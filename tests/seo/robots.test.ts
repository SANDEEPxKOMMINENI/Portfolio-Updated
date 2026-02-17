/**
 * Property-Based Tests for Robots.txt Generator
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 5.2 Write property tests for robots.txt
 * 
 * Tests validate the following properties:
 * - Property 12: Robots.txt validity
 * - Property 13: Robots sitemap reference
 * 
 * Validates: Requirements 4.3, 4.4
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import { generateRobotsTxt } from "../../src/seo/robotsc/seo/robots";

// ==================== Arbitraries (Generators) ====================

/**
 * Generate arbitrary sitemap URLs
 */
const sitemapUrlArbitrary = fc
  .webUrl()
  .map((url) => `${url}/sitemap.xml`);

// ==================== Property Tests ====================

describe("Robots.txt Property-Based Tests", () => {
  /**
   * Property 12: Robots.txt validity
   * 
   * For any robots.txt configuration, requesting /robots.txt should return valid
   * robots.txt content with User-agent and Allow/Disallow directives.
   * 
   * Validates: Requirements 4.3
   */
  test("Property 12: Robots.txt validity", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        // Check User-agent directive is present
        expect(robotsTxt).toContain("User-agent:");

        // Check that there's at least one Allow or Disallow directive
        const hasAllowOrDisallow = 
          robotsTxt.includes("Allow:") || robotsTxt.includes("Disallow:");
        expect(hasAllowOrDisallow).toBe(true);

        // Verify basic structure (lines separated by newlines)
        const lines = robotsTxt.split("\n");
        expect(lines.length).toBeGreaterThan(0);

        // Check that User-agent line exists
        const hasUserAgent = lines.some((line) => line.startsWith("User-agent:"));
        expect(hasUserAgent).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 13: Robots sitemap reference
   * 
   * For any robots.txt output, it should contain a Sitemap directive with
   * the full sitemap URL.
   * 
   * Validates: Requirements 4.4
   */
  test("Property 13: Robots sitemap reference", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        // Check Sitemap directive is present
        expect(robotsTxt).toContain("Sitemap:");

        // Check that the sitemap URL is included
        expect(robotsTxt).toContain(sitemapUrl);

        // Verify the Sitemap line format
        const lines = robotsTxt.split("\n");
        const sitemapLine = lines.find((line) => line.startsWith("Sitemap:"));
        expect(sitemapLine).toBeDefined();
        expect(sitemapLine).toContain(sitemapUrl);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: User-agent wildcard
   * 
   * For any robots.txt output, it should contain "User-agent: *" to apply
   * rules to all crawlers.
   */
  test("Property: User-agent wildcard", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        // Check for User-agent: * (wildcard for all crawlers)
        expect(robotsTxt).toContain("User-agent: *");
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Allow directive for root
   * 
   * For any robots.txt output, it should contain "Allow: /" to allow
   * crawling of all pages.
   */
  test("Property: Allow directive for root", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        // Check for Allow: / directive
        expect(robotsTxt).toContain("Allow: /");
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Proper line structure
   * 
   * For any robots.txt output, each directive should be on its own line
   * and properly formatted.
   */
  test("Property: Proper line structure", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        const lines = robotsTxt.split("\n");

        // Check that each non-empty line contains a colon (directive format)
        lines.forEach((line) => {
          if (line.trim().length > 0) {
            expect(line).toContain(":");
          }
        });

        // Verify order: User-agent should come before Allow
        const userAgentIndex = lines.findIndex((line) => 
          line.startsWith("User-agent:")
        );
        const allowIndex = lines.findIndex((line) => 
          line.startsWith("Allow:")
        );
        
        expect(userAgentIndex).toBeGreaterThanOrEqual(0);
        expect(allowIndex).toBeGreaterThanOrEqual(0);
        expect(userAgentIndex).toBeLessThan(allowIndex);
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: No trailing whitespace
   * 
   * For any robots.txt output, lines should not have trailing whitespace
   * (except for intentional blank lines).
   */
  test("Property: No trailing whitespace", () => {
    fc.assert(
      fc.property(sitemapUrlArbitrary, (sitemapUrl) => {
        const robotsTxt = generateRobotsTxt(sitemapUrl);

        const lines = robotsTxt.split("\n");

        lines.forEach((line) => {
          // Non-empty lines should not have trailing whitespace
          if (line.length > 0) {
            expect(line).toBe(line.trimEnd());
          }
        });
      }),
      { numRuns: 100 }
    );
  });
});


// ==================== Unit Tests for Edge Cases ====================

describe("Robots.txt Unit Tests - Edge Cases", () => {
  /**
   * Test with default configuration
   * Validates: Requirements 4.3, 4.4
   */
  describe("Default configuration", () => {
    test("should generate valid robots.txt with standard directives", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Check basic structure
      expect(robotsTxt).toBeTruthy();
      expect(typeof robotsTxt).toBe("string");
      expect(robotsTxt.length).toBeGreaterThan(0);

      // Check required directives
      expect(robotsTxt).toContain("User-agent: *");
      expect(robotsTxt).toContain("Allow: /");
      expect(robotsTxt).toContain("Sitemap:");
    });

    test("should have proper line breaks", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const lines = robotsTxt.split("\n");
      
      // Should have at least 3 lines (User-agent, Allow, Sitemap)
      expect(lines.length).toBeGreaterThanOrEqual(3);
    });

    test("should not contain extra whitespace", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Should not start or end with whitespace
      expect(robotsTxt).toBe(robotsTxt.trim());

      // Lines should not have leading whitespace
      const lines = robotsTxt.split("\n");
      lines.forEach((line) => {
        if (line.length > 0) {
          expect(line[0]).not.toBe(" ");
          expect(line[0]).not.toBe("\t");
        }
      });
    });

    test("should follow robots.txt format specification", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Each directive should be on its own line
      const lines = robotsTxt.split("\n");
      
      // Check that directives are properly formatted (key: value)
      lines.forEach((line) => {
        if (line.trim().length > 0) {
          expect(line).toMatch(/^[A-Za-z-]+:\s*.+$/);
        }
      });
    });
  });

  /**
   * Test sitemap URL inclusion
   * Validates: Requirements 4.4
   */
  describe("Sitemap URL inclusion", () => {
    test("should include exact sitemap URL", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain(sitemapUrl);
      expect(robotsTxt).toContain(`Sitemap: ${sitemapUrl}`);
    });

    test("should handle different domain names", () => {
      const sitemapUrl = "https://example.com/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://example.com/sitemap.xml");
    });

    test("should handle sitemap URLs with different paths", () => {
      const sitemapUrl = "https://example.com/sitemaps/main-sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://example.com/sitemaps/main-sitemap.xml");
    });

    test("should handle HTTP and HTTPS sitemap URLs", () => {
      const httpsUrl = "https://example.com/sitemap.xml";
      const httpUrl = "http://example.com/sitemap.xml";

      const robotsTxtHttps = generateRobotsTxt(httpsUrl);
      const robotsTxtHttp = generateRobotsTxt(httpUrl);

      expect(robotsTxtHttps).toContain("https://example.com/sitemap.xml");
      expect(robotsTxtHttp).toContain("http://example.com/sitemap.xml");
    });

    test("should handle sitemap URLs with ports", () => {
      const sitemapUrl = "https://example.com:8080/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://example.com:8080/sitemap.xml");
    });

    test("should handle sitemap URLs with subdomains", () => {
      const sitemapUrl = "https://blog.example.com/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://blog.example.com/sitemap.xml");
    });

    test("should place Sitemap directive after Allow directive", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const allowIndex = robotsTxt.indexOf("Allow:");
      const sitemapIndex = robotsTxt.indexOf("Sitemap:");

      expect(allowIndex).toBeGreaterThan(-1);
      expect(sitemapIndex).toBeGreaterThan(-1);
      expect(sitemapIndex).toBeGreaterThan(allowIndex);
    });
  });

  /**
   * Test User-agent directive
   * Validates: Requirements 4.3
   */
  describe("User-agent directive", () => {
    test("should use wildcard for all crawlers", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("User-agent: *");
    });

    test("should place User-agent directive first", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const lines = robotsTxt.split("\n");
      const firstNonEmptyLine = lines.find((line) => line.trim().length > 0);

      expect(firstNonEmptyLine).toBe("User-agent: *");
    });
  });

  /**
   * Test Allow directive
   * Validates: Requirements 4.3
   */
  describe("Allow directive", () => {
    test("should allow crawling of root path", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("Allow: /");
    });

    test("should place Allow directive after User-agent", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const userAgentIndex = robotsTxt.indexOf("User-agent:");
      const allowIndex = robotsTxt.indexOf("Allow:");

      expect(userAgentIndex).toBeGreaterThan(-1);
      expect(allowIndex).toBeGreaterThan(-1);
      expect(allowIndex).toBeGreaterThan(userAgentIndex);
    });
  });

  /**
   * Test output format
   * Validates: Requirements 4.3
   */
  describe("Output format", () => {
    test("should return plain text format", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Should not contain HTML tags
      expect(robotsTxt).not.toContain("<");
      expect(robotsTxt).not.toContain(">");

      // Should not contain JSON syntax
      expect(robotsTxt).not.toContain("{");
      expect(robotsTxt).not.toContain("}");

      // Should be plain text with directives
      expect(typeof robotsTxt).toBe("string");
    });

    test("should use Unix-style line endings", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Should contain \n for line breaks
      expect(robotsTxt).toContain("\n");

      // Should not contain Windows-style \r\n
      expect(robotsTxt).not.toContain("\r\n");
    });

    test("should have consistent formatting", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const lines = robotsTxt.split("\n");

      // Each directive line should follow "Key: Value" format
      lines.forEach((line) => {
        if (line.trim().length > 0) {
          const parts = line.split(":");
          expect(parts.length).toBeGreaterThanOrEqual(2);
          
          // Key should not have spaces
          const key = parts[0];
          expect(key).not.toContain(" ");
          
          // Value should start with a space
          const value = parts.slice(1).join(":");
          expect(value[0]).toBe(" ");
        }
      });
    });
  });

  /**
   * Test edge cases
   * Validates: Requirements 4.3, 4.4
   */
  describe("Edge cases", () => {
    test("should handle very long sitemap URLs", () => {
      const longPath = "a".repeat(200);
      const sitemapUrl = `https://example.com/${longPath}/sitemap.xml`;
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain(sitemapUrl);
      expect(robotsTxt).toContain("User-agent: *");
      expect(robotsTxt).toContain("Allow: /");
    });

    test("should handle sitemap URLs with special characters", () => {
      const sitemapUrl = "https://example.com/sitemap-2024.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://example.com/sitemap-2024.xml");
    });

    test("should handle sitemap URLs with query parameters", () => {
      const sitemapUrl = "https://example.com/sitemap.xml?version=1";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt).toContain("https://example.com/sitemap.xml?version=1");
    });

    test("should be idempotent", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt1 = generateRobotsTxt(sitemapUrl);
      const robotsTxt2 = generateRobotsTxt(sitemapUrl);

      expect(robotsTxt1).toBe(robotsTxt2);
    });

    test("should produce consistent output for same input", () => {
      const sitemapUrl = "https://example.com/sitemap.xml";
      
      // Generate multiple times
      const results = Array.from({ length: 10 }, () => 
        generateRobotsTxt(sitemapUrl)
      );

      // All results should be identical
      results.forEach((result) => {
        expect(result).toBe(results[0]);
      });
    });
  });

  /**
   * Test compliance with robots.txt standard
   * Validates: Requirements 4.3
   */
  describe("Robots.txt standard compliance", () => {
    test("should follow robots.txt protocol", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Must have User-agent directive
      expect(robotsTxt).toMatch(/User-agent:\s*.+/);

      // Must have at least one Allow or Disallow directive
      const hasDirective = /Allow:\s*.+/.test(robotsTxt) || 
                          /Disallow:\s*.+/.test(robotsTxt);
      expect(hasDirective).toBe(true);

      // Sitemap directive is optional but should be present
      expect(robotsTxt).toMatch(/Sitemap:\s*.+/);
    });

    test("should use correct directive names", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Check for correct capitalization
      expect(robotsTxt).toContain("User-agent:");
      expect(robotsTxt).toContain("Allow:");
      expect(robotsTxt).toContain("Sitemap:");

      // Should not have incorrect variations
      expect(robotsTxt).not.toContain("user-agent:");
      expect(robotsTxt).not.toContain("allow:");
      expect(robotsTxt).not.toContain("sitemap:");
    });

    test("should not contain comments", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      // Should not contain comment character
      expect(robotsTxt).not.toContain("#");
    });

    test("should not contain empty directives", () => {
      const sitemapUrl = "https://sandeepkommineni.me/sitemap.xml";
      const robotsTxt = generateRobotsTxt(sitemapUrl);

      const lines = robotsTxt.split("\n");

      lines.forEach((line) => {
        if (line.includes(":")) {
          const parts = line.split(":");
          const value = parts.slice(1).join(":").trim();
          
          // Value should not be empty
          expect(value.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
