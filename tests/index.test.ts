/**
 * Integration Tests for Main Application
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 7.2 Write integration tests for main page
 * 
 * Tests validate:
 * - HTML output contains all meta tags
 * - Structured data is present and valid
 * - Routes respond correctly
 * 
 * Validates: Requirements 2.1, 3.1, 4.1, 4.3
 */

import { describe, test, expect } from "vitest";
import app from "../src/index";

// ==================== Helper Functions ====================

/**
 * Make a request to the Hono app and get the response
 */
async function makeRequest(path: string): Promise<Response> {
  const req = new Request(`http://localhost${path}`);
  return await app.fetch(req);
}

/**
 * Get HTML content from response
 */
async function getHtmlContent(path: string): Promise<string> {
  const response = await makeRequest(path);
  return await response.text();
}

/**
 * Parse JSON-LD structured data from HTML
 */
function extractJsonLd(html: string): any[] {
  const jsonLdRegex = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g;
  const matches = [];
  let match;
  
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      matches.push(parsed);
    } catch (e) {
      // Skip invalid JSON
    }
  }
  
  return matches;
}

// ==================== Integration Tests ====================

describe("Main Page Integration Tests", () => {
  /**
   * Test that HTML output contains all meta tags
   * Validates: Requirements 2.1
   */
  describe("Meta Tags Presence", () => {
    test("should contain all required basic meta tags", async () => {
      const html = await getHtmlContent("/");

      // Basic meta tags
      expect(html).toContain('<meta charset="UTF-8">');
      expect(html).toContain('<meta name="viewport"');
      expect(html).toContain("<title>");
      expect(html).toContain("</title>");
      expect(html).toContain('<meta name="description"');
      expect(html).toContain('<link rel="canonical"');
    });

    test("should contain title with site name", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain("<title>Sandeep Kommineni");
      expect(html).toContain("AI/ML Engineer");
    });

    test("should contain meta description", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="description"');
      expect(html).toContain("AI/ML Engineer");
      expect(html).toContain("production-grade AI platforms");
    });

    test("should contain canonical URL", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<link rel="canonical"');
      expect(html).toContain("https://sandeepkommineni.me");
    });

    test("should contain keywords meta tag", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="keywords"');
    });

    test("should contain author meta tag", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="author"');
      expect(html).toContain("Sandeep Kommineni");
    });
  });

  /**
   * Test Open Graph tags
   * Validates: Requirements 2.3, 9.1, 9.2
   */
  describe("Open Graph Tags", () => {
    test("should contain all required Open Graph tags", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain('<meta property="og:description"');
      expect(html).toContain('<meta property="og:image"');
      expect(html).toContain('<meta property="og:type"');
      expect(html).toContain('<meta property="og:url"');
    });

    test("should have og:type set to website", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta property="og:type" content="website">');
    });

    test("should have og:image with profile picture", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta property="og:image"');
      expect(html).toContain("/static/profile.jpg");
    });

    test("should have og:url with site URL", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta property="og:url"');
      expect(html).toContain("https://sandeepkommineni.me");
    });
  });

  /**
   * Test Twitter Card tags
   * Validates: Requirements 2.4, 9.3
   */
  describe("Twitter Card Tags", () => {
    test("should contain all required Twitter Card tags", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="twitter:card"');
      expect(html).toContain('<meta name="twitter:title"');
      expect(html).toContain('<meta name="twitter:description"');
      expect(html).toContain('<meta name="twitter:image"');
    });

    test("should have twitter:card set to summary_large_image", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="twitter:card" content="summary_large_image">');
    });

    test("should have twitter:image with profile picture", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<meta name="twitter:image"');
      expect(html).toContain("/static/profile.jpg");
    });
  });

  /**
   * Test that structured data is present and valid
   * Validates: Requirements 3.1
   */
  describe("Structured Data (JSON-LD)", () => {
    test("should contain JSON-LD structured data scripts", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<script type="application/ld+json">');
      
      // Count the number of JSON-LD scripts (should have 4: Person, Work, Projects, Education)
      const jsonLdCount = (html.match(/<script type="application\/ld\+json">/g) || []).length;
      expect(jsonLdCount).toBeGreaterThanOrEqual(4);
    });

    test("should have valid Person schema", async () => {
      const html = await getHtmlContent("/");
      const jsonLdData = extractJsonLd(html);

      // Find Person schema
      const personSchema = jsonLdData.find(
        (data) => data["@type"] === "Person"
      );

      expect(personSchema).toBeDefined();
      expect(personSchema["@context"]).toBe("https://schema.org");
      expect(personSchema["@type"]).toBe("Person");
      expect(personSchema.name).toBe("Sandeep Kommineni");
      expect(personSchema.jobTitle).toContain("AI/ML Engineer");
      expect(personSchema.email).toBe("sandeepkommineni2@gmail.com");
      expect(personSchema.telephone).toBe("+919573456001");
      expect(personSchema.address).toBeDefined();
      expect(personSchema.address["@type"]).toBe("PostalAddress");
      expect(personSchema.address.addressLocality).toBe("Guntur");
      expect(personSchema.address.addressRegion).toBe("Andhra Pradesh");
      expect(personSchema.address.addressCountry).toBe("India");
      expect(personSchema.sameAs).toBeDefined();
      expect(Array.isArray(personSchema.sameAs)).toBe(true);
      expect(personSchema.sameAs.length).toBeGreaterThan(0);
    });

    test("should have valid WorkExperience schema", async () => {
      const html = await getHtmlContent("/");
      const jsonLdData = extractJsonLd(html);

      // Find WorkExperience schemas (should be an array)
      const workSchemas = jsonLdData.filter(
        (data) => Array.isArray(data) && data.some((item) => item["@type"] === "WorkExperience")
      );

      expect(workSchemas.length).toBeGreaterThan(0);
      
      // Check the first work experience array
      const workArray = workSchemas[0];
      expect(Array.isArray(workArray)).toBe(true);
      expect(workArray.length).toBeGreaterThan(0);

      // Validate first work experience
      const firstWork = workArray[0];
      expect(firstWork["@context"]).toBe("https://schema.org");
      expect(firstWork["@type"]).toBe("WorkExperience");
      expect(firstWork.name).toBeDefined();
      expect(firstWork.description).toBeDefined();
      expect(firstWork.startDate).toBeDefined();
      expect(firstWork.employer).toBeDefined();
      expect(firstWork.employer["@type"]).toBe("Organization");
      expect(firstWork.employer.name).toBeDefined();
    });

    test("should have valid CreativeWork schema", async () => {
      const html = await getHtmlContent("/");
      const jsonLdData = extractJsonLd(html);

      // Find CreativeWork schemas (should be an array)
      const creativeWorkSchemas = jsonLdData.filter(
        (data) => Array.isArray(data) && data.some((item) => item["@type"] === "CreativeWork")
      );

      expect(creativeWorkSchemas.length).toBeGreaterThan(0);
      
      // Check the first creative work array
      const creativeWorkArray = creativeWorkSchemas[0];
      expect(Array.isArray(creativeWorkArray)).toBe(true);
      expect(creativeWorkArray.length).toBeGreaterThan(0);

      // Validate first creative work
      const firstProject = creativeWorkArray[0];
      expect(firstProject["@context"]).toBe("https://schema.org");
      expect(firstProject["@type"]).toBe("CreativeWork");
      expect(firstProject.name).toBeDefined();
      expect(firstProject.description).toBeDefined();
      expect(firstProject.author).toBeDefined();
      expect(firstProject.author["@type"]).toBe("Person");
      expect(firstProject.author.name).toBe("Sandeep Kommineni");
    });

    test("should have valid EducationalOccupationalCredential schema", async () => {
      const html = await getHtmlContent("/");
      const jsonLdData = extractJsonLd(html);

      // Find Education schemas (should be an array)
      const educationSchemas = jsonLdData.filter(
        (data) => Array.isArray(data) && data.some((item) => item["@type"] === "EducationalOccupationalCredential")
      );

      expect(educationSchemas.length).toBeGreaterThan(0);
      
      // Check the first education array
      const educationArray = educationSchemas[0];
      expect(Array.isArray(educationArray)).toBe(true);
      expect(educationArray.length).toBeGreaterThan(0);

      // Validate first education
      const firstEducation = educationArray[0];
      expect(firstEducation["@context"]).toBe("https://schema.org");
      expect(firstEducation["@type"]).toBe("EducationalOccupationalCredential");
      expect(firstEducation.name).toBeDefined();
      expect(firstEducation.recognizedBy).toBeDefined();
      expect(firstEducation.recognizedBy["@type"]).toBe("Organization");
      expect(firstEducation.recognizedBy.name).toBeDefined();
    });

    test("should have all structured data with valid JSON syntax", async () => {
      const html = await getHtmlContent("/");
      const jsonLdData = extractJsonLd(html);

      // Should have extracted at least 4 valid JSON-LD objects
      expect(jsonLdData.length).toBeGreaterThanOrEqual(4);

      // All should have @context
      jsonLdData.forEach((data) => {
        if (Array.isArray(data)) {
          data.forEach((item) => {
            expect(item["@context"]).toBe("https://schema.org");
            expect(item["@type"]).toBeDefined();
          });
        } else {
          expect(data["@context"]).toBe("https://schema.org");
          expect(data["@type"]).toBeDefined();
        }
      });
    });
  });

  /**
   * Test that routes respond correctly
   * Validates: Requirements 4.1, 4.3
   */
  describe("Route Responses", () => {
    test("should respond to root path with 200 status", async () => {
      const response = await makeRequest("/");

      expect(response.status).toBe(200);
    });

    test("should respond to root path with HTML content type", async () => {
      const response = await makeRequest("/");

      const contentType = response.headers.get("content-type");
      expect(contentType).toContain("text/html");
    });

    test("should respond to /sitemap.xml with 200 status", async () => {
      const response = await makeRequest("/sitemap.xml");

      expect(response.status).toBe(200);
    });

    test("should respond to /sitemap.xml with XML content type", async () => {
      const response = await makeRequest("/sitemap.xml");

      const contentType = response.headers.get("content-type");
      expect(contentType).toContain("application/xml");
    });

    test("should respond to /sitemap.xml with valid XML", async () => {
      const response = await makeRequest("/sitemap.xml");
      const xml = await response.text();

      expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(xml).toContain("<urlset");
      expect(xml).toContain("</urlset>");
      expect(xml).toContain("<url>");
      expect(xml).toContain("<loc>");
      expect(xml).toContain("https://sandeepkommineni.me");
    });

    test("should respond to /robots.txt with 200 status", async () => {
      const response = await makeRequest("/robots.txt");

      expect(response.status).toBe(200);
    });

    test("should respond to /robots.txt with text/plain content type", async () => {
      const response = await makeRequest("/robots.txt");

      const contentType = response.headers.get("content-type");
      expect(contentType).toContain("text/plain");
    });

    test("should respond to /robots.txt with valid content", async () => {
      const response = await makeRequest("/robots.txt");
      const text = await response.text();

      expect(text).toContain("User-agent:");
      expect(text).toContain("Allow:");
      expect(text).toContain("Sitemap:");
      expect(text).toContain("https://sandeepkommineni.me/sitemap.xml");
    });
  });

  /**
   * Test HTML structure and semantic elements
   * Validates: Requirements 10.1
   */
  describe("HTML Structure", () => {
    test("should have valid HTML5 doctype", async () => {
      const html = await getHtmlContent("/");

      expect(html).toMatch(/^<!DOCTYPE html>/i);
    });

    test("should have lang attribute on html element", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain('<html lang="en"');
    });

    test("should contain semantic HTML5 elements", async () => {
      const html = await getHtmlContent("/");

      // The portfolio uses nav, section, article, and footer elements
      expect(html).toContain("<nav");
      expect(html).toContain("<section");
      expect(html).toContain("<article");
      expect(html).toContain("<footer");
    });

    test("should have exactly one h1 element", async () => {
      const html = await getHtmlContent("/");

      const h1Count = (html.match(/<h1[^>]*>/g) || []).length;
      expect(h1Count).toBe(1);
    });
  });

  /**
   * Test content optimization
   * Validates: Requirements 7.1, 11.4
   */
  describe("Content Optimization", () => {
    test("should contain primary keywords in visible content", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain("Sandeep Kommineni");
      expect(html).toContain("AI/ML Engineer");
      expect(html).toContain("Full-Stack Developer");
    });

    test("should contain location-based keywords", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain("Guntur");
      expect(html).toContain("Andhra Pradesh");
      expect(html).toContain("India");
    });

    test("should contain technology keywords", async () => {
      const html = await getHtmlContent("/");

      expect(html).toContain("Generative AI");
      expect(html).toContain("LLM");
      expect(html).toContain("React");
      expect(html).toContain("Python");
      expect(html).toContain("FastAPI");
    });
  });
});
