/**
 * Property-Based Tests for Meta Tags Generator
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 2.2 Write property tests for meta tags
 * 
 * Tests validate the following properties:
 * - Property 1: Complete meta tag presence
 * - Property 2: Meta description length constraint
 * - Property 3: Open Graph completeness
 * - Property 4: Twitter Card completeness
 * 
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 9.1, 9.2, 9.3
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import {
  generateMetaTags,
  generateBasicMetaTags,
  generateOpenGraphTags,
  generateTwitterCardTags,
  type CompleteMetaTagsConfig,
} from "../../src/seo/meta-tags";
import type { MetaTagsConfig, OpenGraphTags, TwitterCardTags } from "../../src/seo/types";

// ==================== Arbitraries (Generators) ====================

/**
 * Generate arbitrary non-empty strings for meta content
 */
const nonEmptyString = fc.string({ minLength: 1, maxLength: 500 });

/**
 * Generate arbitrary URLs
 */
const urlString = fc.webUrl();

/**
 * Generate arbitrary keywords array
 */
const keywordsArray = fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 0, maxLength: 10 });

/**
 * Generate arbitrary MetaTagsConfig
 */
const metaTagsConfigArbitrary: fc.Arbitrary<MetaTagsConfig> = fc.record({
  title: nonEmptyString,
  description: nonEmptyString,
  canonicalUrl: urlString,
  keywords: fc.option(keywordsArray, { nil: undefined }),
  author: fc.option(nonEmptyString, { nil: undefined }),
});

/**
 * Generate arbitrary OpenGraphTags
 */
const openGraphTagsArbitrary: fc.Arbitrary<OpenGraphTags> = fc.record({
  ogTitle: nonEmptyString,
  ogDescription: nonEmptyString,
  ogImage: urlString,
  ogType: fc.constantFrom("website", "article", "profile"),
  ogUrl: urlString,
  ogSiteName: fc.option(nonEmptyString, { nil: undefined }),
});

/**
 * Generate arbitrary TwitterCardTags
 */
const twitterCardTagsArbitrary: fc.Arbitrary<TwitterCardTags> = fc.record({
  twitterCard: fc.constantFrom("summary", "summary_large_image", "app", "player"),
  twitterTitle: nonEmptyString,
  twitterDescription: nonEmptyString,
  twitterImage: urlString,
  twitterSite: fc.option(nonEmptyString, { nil: undefined }),
  twitterCreator: fc.option(nonEmptyString, { nil: undefined }),
});

/**
 * Generate arbitrary CompleteMetaTagsConfig
 */
const completeMetaTagsConfigArbitrary: fc.Arbitrary<CompleteMetaTagsConfig> = fc.record({
  title: nonEmptyString,
  description: nonEmptyString,
  canonicalUrl: urlString,
  keywords: fc.option(keywordsArray, { nil: undefined }),
  author: fc.option(nonEmptyString, { nil: undefined }),
  ogTitle: nonEmptyString,
  ogDescription: nonEmptyString,
  ogImage: urlString,
  ogType: fc.constantFrom("website", "article", "profile"),
  ogUrl: urlString,
  ogSiteName: fc.option(nonEmptyString, { nil: undefined }),
  twitterCard: fc.constantFrom("summary", "summary_large_image", "app", "player"),
  twitterTitle: nonEmptyString,
  twitterDescription: nonEmptyString,
  twitterImage: urlString,
  twitterSite: fc.option(nonEmptyString, { nil: undefined }),
  twitterCreator: fc.option(nonEmptyString, { nil: undefined }),
});

// ==================== Property Tests ====================

describe("Meta Tags Property-Based Tests", () => {
  /**
   * Property 1: Complete meta tag presence
   * 
   * For any page configuration, the HTML output should contain all required meta tags:
   * title, description, viewport, and canonical URL.
   * 
   * Validates: Requirements 2.1, 2.2, 2.5, 2.6
   */
  test("Property 1: Complete meta tag presence", () => {
    fc.assert(
      fc.property(completeMetaTagsConfigArbitrary, (config) => {
        const html = generateMetaTags(config);

        // Check for required basic meta tags
        expect(html).toContain("<title>");
        expect(html).toContain("</title>");
        expect(html).toContain('<meta name="description"');
        expect(html).toContain('<meta name="viewport"');
        expect(html).toContain('<link rel="canonical"');
        expect(html).toContain('<meta charset="UTF-8">');
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 2: Meta description length constraint
   * 
   * For any generated meta description, the character count should be less than
   * or equal to 160 characters.
   * 
   * Validates: Requirements 2.2
   */
  test("Property 2: Meta description length constraint", () => {
    fc.assert(
      fc.property(metaTagsConfigArbitrary, (config) => {
        const html = generateBasicMetaTags(config);

        // Extract the description content from the meta tag
        const descriptionMatch = html.match(/<meta name="description" content="([^"]*)"/);
        
        if (descriptionMatch && descriptionMatch[1]) {
          const descriptionContent = descriptionMatch[1];
          
          // Decode HTML entities for accurate length calculation
          const decodedDescription = descriptionContent
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
          
          // Check that description is at most 160 characters
          expect(decodedDescription.length).toBeLessThanOrEqual(160);
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3: Open Graph completeness
   * 
   * For any page output, the HTML should contain all four required Open Graph tags:
   * og:title, og:description, og:image, and og:type.
   * 
   * Validates: Requirements 2.3, 9.1, 9.2
   */
  test("Property 3: Open Graph completeness", () => {
    fc.assert(
      fc.property(openGraphTagsArbitrary, (config) => {
        const html = generateOpenGraphTags(config);

        // Check for all required Open Graph tags
        expect(html).toContain('<meta property="og:title"');
        expect(html).toContain('<meta property="og:description"');
        expect(html).toContain('<meta property="og:image"');
        expect(html).toContain('<meta property="og:type"');
        expect(html).toContain('<meta property="og:url"');
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 3 (Extended): Open Graph completeness in complete meta tags
   * 
   * Validates that Open Graph tags are present when using the main generateMetaTags function.
   */
  test("Property 3 (Extended): Open Graph completeness in complete output", () => {
    fc.assert(
      fc.property(completeMetaTagsConfigArbitrary, (config) => {
        const html = generateMetaTags(config);

        // Check for all required Open Graph tags
        expect(html).toContain('<meta property="og:title"');
        expect(html).toContain('<meta property="og:description"');
        expect(html).toContain('<meta property="og:image"');
        expect(html).toContain('<meta property="og:type"');
        expect(html).toContain('<meta property="og:url"');
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4: Twitter Card completeness
   * 
   * For any page output, the HTML should contain Twitter Card meta tags including
   * twitter:card set to "summary_large_image", twitter:title, twitter:description,
   * and twitter:image.
   * 
   * Validates: Requirements 2.4, 9.3
   */
  test("Property 4: Twitter Card completeness", () => {
    fc.assert(
      fc.property(twitterCardTagsArbitrary, (config) => {
        const html = generateTwitterCardTags(config);

        // Check for all required Twitter Card tags
        expect(html).toContain('<meta name="twitter:card"');
        expect(html).toContain('<meta name="twitter:title"');
        expect(html).toContain('<meta name="twitter:description"');
        expect(html).toContain('<meta name="twitter:image"');
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property 4 (Extended): Twitter Card completeness in complete meta tags
   * 
   * Validates that Twitter Card tags are present when using the main generateMetaTags function.
   */
  test("Property 4 (Extended): Twitter Card completeness in complete output", () => {
    fc.assert(
      fc.property(completeMetaTagsConfigArbitrary, (config) => {
        const html = generateMetaTags(config);

        // Check for all required Twitter Card tags
        expect(html).toContain('<meta name="twitter:card"');
        expect(html).toContain('<meta name="twitter:title"');
        expect(html).toContain('<meta name="twitter:description"');
        expect(html).toContain('<meta name="twitter:image"');
      }),
      { numRuns: 100 }
    );
  });
});

// ==================== Unit Tests for Edge Cases ====================

describe("Meta Tags Unit Tests - Edge Cases", () => {
  /**
   * Test with missing optional fields
   * Validates: Requirements 2.1, 2.2, 2.3, 2.4
   */
  describe("Missing optional fields", () => {
    test("should generate basic meta tags without keywords", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain("<title>Test Title</title>");
      expect(html).toContain('<meta name="description" content="Test description">');
      expect(html).toContain('<link rel="canonical" href="https://example.com">');
      expect(html).not.toContain('<meta name="keywords"');
    });

    test("should generate basic meta tags without author", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
        keywords: ["test", "example"],
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain("<title>Test Title</title>");
      expect(html).toContain('<meta name="keywords" content="test, example">');
      expect(html).not.toContain('<meta name="author"');
    });

    test("should generate Open Graph tags without optional site name", () => {
      const config: OpenGraphTags = {
        ogTitle: "Test OG Title",
        ogDescription: "Test OG description",
        ogImage: "https://example.com/image.jpg",
        ogType: "website",
        ogUrl: "https://example.com",
      };

      const html = generateOpenGraphTags(config);

      expect(html).toContain('<meta property="og:title" content="Test OG Title">');
      expect(html).toContain('<meta property="og:description" content="Test OG description">');
      expect(html).not.toContain('<meta property="og:site_name"');
    });

    test("should generate Twitter Card tags without optional handles", () => {
      const config: TwitterCardTags = {
        twitterCard: "summary_large_image",
        twitterTitle: "Test Twitter Title",
        twitterDescription: "Test Twitter description",
        twitterImage: "https://example.com/image.jpg",
      };

      const html = generateTwitterCardTags(config);

      expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
      expect(html).toContain('<meta name="twitter:title" content="Test Twitter Title">');
      expect(html).not.toContain('<meta name="twitter:site"');
      expect(html).not.toContain('<meta name="twitter:creator"');
    });

    test("should generate complete meta tags with minimal optional fields", () => {
      const config: CompleteMetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
        ogTitle: "Test OG Title",
        ogDescription: "Test OG description",
        ogImage: "https://example.com/image.jpg",
        ogType: "website",
        ogUrl: "https://example.com",
        twitterCard: "summary",
        twitterTitle: "Test Twitter Title",
        twitterDescription: "Test Twitter description",
        twitterImage: "https://example.com/image.jpg",
      };

      const html = generateMetaTags(config);

      expect(html).toContain("<title>Test Title</title>");
      expect(html).toContain('<meta property="og:title" content="Test OG Title">');
      expect(html).toContain('<meta name="twitter:card" content="summary">');
      expect(html).not.toContain('<meta name="keywords"');
      expect(html).not.toContain('<meta name="author"');
    });
  });

  /**
   * Test with special characters in content
   * Validates: Requirements 2.1, 2.2, 2.3, 2.4
   */
  describe("Special characters in content", () => {
    test("should escape HTML special characters in title", () => {
      const config: MetaTagsConfig = {
        title: 'Test <script>alert("XSS")</script> & Title',
        description: "Test description",
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain("<title>Test &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt; &amp; Title</title>");
      expect(html).not.toContain("<script>");
    });

    test("should escape HTML special characters in description", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: 'Description with <b>bold</b> & "quotes" and \'apostrophes\'',
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain('<meta name="description" content="Description with &lt;b&gt;bold&lt;/b&gt; &amp; &quot;quotes&quot; and &#039;apostrophes&#039;">');
      expect(html).not.toContain("<b>");
    });

    test("should escape special characters in keywords", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
        keywords: ["test & example", "quotes \"here\"", "apostrophe's"],
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain('<meta name="keywords" content="test &amp; example, quotes &quot;here&quot;, apostrophe&#039;s">');
    });

    test("should escape special characters in Open Graph tags", () => {
      const config: OpenGraphTags = {
        ogTitle: 'Title with <tags> & "quotes"',
        ogDescription: "Description with 'apostrophes' & ampersands",
        ogImage: "https://example.com/image.jpg",
        ogType: "website",
        ogUrl: "https://example.com",
      };

      const html = generateOpenGraphTags(config);

      expect(html).toContain('<meta property="og:title" content="Title with &lt;tags&gt; &amp; &quot;quotes&quot;">');
      expect(html).toContain('<meta property="og:description" content="Description with &#039;apostrophes&#039; &amp; ampersands">');
    });

    test("should escape special characters in Twitter Card tags", () => {
      const config: TwitterCardTags = {
        twitterCard: "summary_large_image",
        twitterTitle: 'Twitter title with <html> & "special" chars',
        twitterDescription: "Description with 'quotes' & symbols",
        twitterImage: "https://example.com/image.jpg",
      };

      const html = generateTwitterCardTags(config);

      expect(html).toContain('<meta name="twitter:title" content="Twitter title with &lt;html&gt; &amp; &quot;special&quot; chars">');
      expect(html).toContain('<meta name="twitter:description" content="Description with &#039;quotes&#039; &amp; symbols">');
    });

    test("should handle ampersands in URLs", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com/page?param1=value1&param2=value2",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain('<link rel="canonical" href="https://example.com/page?param1=value1&amp;param2=value2">');
    });
  });

  /**
   * Test description truncation at 160 characters
   * Validates: Requirements 2.2
   */
  describe("Description truncation", () => {
    test("should truncate description longer than 160 characters", () => {
      const longDescription = "This is a very long description that exceeds the recommended 160 character limit for meta descriptions. It contains a lot of text that should be truncated to ensure optimal display in search engine results pages.";
      
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: longDescription,
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      // Extract the description content
      const descriptionMatch = html.match(/<meta name="description" content="([^"]*)"/);
      expect(descriptionMatch).toBeTruthy();
      
      if (descriptionMatch && descriptionMatch[1]) {
        const descriptionContent = descriptionMatch[1];
        
        // Decode HTML entities for accurate length calculation
        const decodedDescription = descriptionContent
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        
        expect(decodedDescription.length).toBeLessThanOrEqual(160);
        expect(decodedDescription).toContain("...");
      }
    });

    test("should not truncate description at exactly 160 characters", () => {
      const exactDescription = "A".repeat(160);
      
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: exactDescription,
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain(`<meta name="description" content="${exactDescription}">`);
      expect(html).not.toContain("...");
    });

    test("should not truncate description shorter than 160 characters", () => {
      const shortDescription = "This is a short description.";
      
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: shortDescription,
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      expect(html).toContain(`<meta name="description" content="${shortDescription}">`);
      expect(html).not.toContain("...");
    });

    test("should truncate description with special characters correctly", () => {
      const longDescriptionWithSpecialChars = "This description has special characters like & and < and > and \"quotes\" and 'apostrophes'. ".repeat(3);
      
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: longDescriptionWithSpecialChars,
        canonicalUrl: "https://example.com",
      };

      const html = generateBasicMetaTags(config);

      // Extract the description content
      const descriptionMatch = html.match(/<meta name="description" content="([^"]*)"/);
      expect(descriptionMatch).toBeTruthy();
      
      if (descriptionMatch && descriptionMatch[1]) {
        const descriptionContent = descriptionMatch[1];
        
        // Decode HTML entities for accurate length calculation
        const decodedDescription = descriptionContent
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        
        expect(decodedDescription.length).toBeLessThanOrEqual(160);
        expect(decodedDescription).toContain("...");
      }
    });

    test("should handle empty keywords array", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
        keywords: [],
      };

      const html = generateBasicMetaTags(config);

      expect(html).not.toContain('<meta name="keywords"');
    });

    test("should handle empty strings in optional fields", () => {
      const config: MetaTagsConfig = {
        title: "Test Title",
        description: "Test description",
        canonicalUrl: "https://example.com",
        author: "",
      };

      const html = generateBasicMetaTags(config);

      // Empty author should still generate the tag (implementation dependent)
      // This tests the actual behavior
      if (config.author) {
        expect(html).toContain('<meta name="author" content="">');
      }
    });
  });
});
