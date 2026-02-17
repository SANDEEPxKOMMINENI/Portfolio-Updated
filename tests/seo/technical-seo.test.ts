/**
 * Property-Based Tests for Technical SEO
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 11.2 Write property tests for technical SEO
 * 
 * Tests validate the following properties:
 * - Property 29: Security header presence
 * - Property 30: Successful response status
 * - Property 31: Server-side content availability
 * 
 * Validates: Requirements 10.3, 10.4, 10.5
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import app from "../../src/index";

// ==================== Property Tests ====================

describe("Technical SEO Property-Based Tests", () => {
  /**
   * Property 29: Security header presence
   * 
   * For any HTTP response, the headers should include security headers:
   * X-Content-Type-Options: nosniff and X-Frame-Options: DENY or SAMEORIGIN.
   * 
   * Validates: Requirements 10.3
   */
  test("Property 29: Security header presence", async () => {
    // Test main route
    const mainResponse = await app.request("/");
    
    expect(mainResponse.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(mainResponse.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
  });

  test("Property 29 (Extended): Security headers on sitemap route", async () => {
    const sitemapResponse = await app.request("/sitemap.xml");
    
    expect(sitemapResponse.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(sitemapResponse.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
  });

  test("Property 29 (Extended): Security headers on robots route", async () => {
    const robotsResponse = await app.request("/robots.txt");
    
    expect(robotsResponse.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(robotsResponse.headers.get("X-Frame-Options")).toBe("SAMEORIGIN");
  });

  /**
   * Property 30: Successful response status
   * 
   * For any valid page request, the HTTP response status code should be 200.
   * 
   * Validates: Requirements 10.4
   */
  test("Property 30: Successful response status for main route", async () => {
    const response = await app.request("/");
    
    expect(response.status).toBe(200);
  });

  test("Property 30 (Extended): Successful response status for sitemap", async () => {
    const response = await app.request("/sitemap.xml");
    
    expect(response.status).toBe(200);
  });

  test("Property 30 (Extended): Successful response status for robots.txt", async () => {
    const response = await app.request("/robots.txt");
    
    expect(response.status).toBe(200);
  });

  /**
   * Property 31: Server-side content availability
   * 
   * For any critical content (name, job title, contact information), it should be
   * present in the initial HTML response before JavaScript execution.
   * 
   * Validates: Requirements 10.5
   */
  test("Property 31: Server-side content availability - critical personal information", async () => {
    const response = await app.request("/");
    const html = await response.text();
    
    // Critical content should be in the initial HTML
    expect(html).toContain("Sandeep Kommineni");
    expect(html).toContain("AI/ML Engineer");
    expect(html).toContain("sandeepkommineni2@gmail.com");
    expect(html).toContain("+91 9573456001");
  });

  test("Property 31 (Extended): Server-side content availability - location information", async () => {
    const response = await app.request("/");
    const html = await response.text();
    
    // Location information should be in the initial HTML
    expect(html).toContain("Guntur");
    expect(html).toContain("Andhra Pradesh");
    expect(html).toContain("India");
  });

  test("Property 31 (Extended): Server-side content availability - professional experience", async () => {
    const response = await app.request("/");
    const html = await response.text();
    
    // Professional experience should be in the initial HTML
    expect(html).toContain("Truviz.AI");
    expect(html).toContain("TruGen.AI");
    expect(html).toContain("MoveLogic.ai");
  });

  test("Property 31 (Extended): Server-side content availability - structured data", async () => {
    const response = await app.request("/");
    const html = await response.text();
    
    // Structured data should be in the initial HTML
    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain('"@type": "Person"');
    expect(html).toContain('"@type": "WorkExperience"');
  });

  test("Property 31 (Extended): Server-side content availability - meta tags", async () => {
    const response = await app.request("/");
    const html = await response.text();
    
    // Meta tags should be in the initial HTML
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta name="twitter:card"');
  });
});

// ==================== Unit Tests for Edge Cases ====================

describe("Technical SEO Unit Tests - Edge Cases", () => {
  /**
   * Test content type headers
   */
  describe("Content type headers", () => {
    test("should return text/html for main route", async () => {
      const response = await app.request("/");
      
      expect(response.headers.get("Content-Type")).toContain("text/html");
    });

    test("should return application/xml for sitemap", async () => {
      const response = await app.request("/sitemap.xml");
      
      expect(response.headers.get("Content-Type")).toBe("application/xml");
    });

    test("should return text/plain for robots.txt", async () => {
      const response = await app.request("/robots.txt");
      
      expect(response.headers.get("Content-Type")).toBe("text/plain");
    });
  });

  /**
   * Test cache headers
   */
  describe("Cache headers", () => {
    test("should include cache-control header for main route", async () => {
      const response = await app.request("/");
      
      expect(response.headers.get("Cache-Control")).toBeTruthy();
    });

    test("should include cache-control header for sitemap", async () => {
      const response = await app.request("/sitemap.xml");
      
      expect(response.headers.get("Cache-Control")).toBeTruthy();
    });

    test("should include cache-control header for robots.txt", async () => {
      const response = await app.request("/robots.txt");
      
      expect(response.headers.get("Cache-Control")).toBeTruthy();
    });
  });

  /**
   * Test HTML structure
   */
  describe("HTML structure", () => {
    test("should have valid HTML5 doctype", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toMatch(/^<!DOCTYPE html>/i);
    });

    test("should have lang attribute on html tag", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain('<html lang="en"');
    });

    test("should have charset meta tag", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain('<meta charset="UTF-8">');
    });

    test("should have viewport meta tag", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain('<meta name="viewport"');
    });
  });

  /**
   * Test semantic HTML5 elements
   */
  describe("Semantic HTML5 elements", () => {
    test("should contain semantic header element", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<header>");
    });

    test("should contain semantic nav element", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<nav");
    });

    test("should contain semantic main element", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<main>");
    });

    test("should contain semantic section elements", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<section");
    });

    test("should contain semantic footer element", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<footer");
    });
  });

  /**
   * Test critical rendering path
   */
  describe("Critical rendering path", () => {
    test("should have title in head before body", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      const titleIndex = html.indexOf("<title>");
      const bodyIndex = html.indexOf("<body>");
      
      expect(titleIndex).toBeGreaterThan(-1);
      expect(bodyIndex).toBeGreaterThan(-1);
      expect(titleIndex).toBeLessThan(bodyIndex);
    });

    test("should have meta tags in head before body", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      const metaIndex = html.indexOf('<meta name="description"');
      const bodyIndex = html.indexOf("<body>");
      
      expect(metaIndex).toBeGreaterThan(-1);
      expect(bodyIndex).toBeGreaterThan(-1);
      expect(metaIndex).toBeLessThan(bodyIndex);
    });

    test("should have structured data in head before body", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      const structuredDataIndex = html.indexOf('<script type="application/ld+json">');
      const bodyIndex = html.indexOf("<body>");
      
      expect(structuredDataIndex).toBeGreaterThan(-1);
      expect(bodyIndex).toBeGreaterThan(-1);
      expect(structuredDataIndex).toBeLessThan(bodyIndex);
    });
  });

  /**
   * Test no JavaScript dependency for critical content
   */
  describe("No JavaScript dependency", () => {
    test("should have h1 heading in HTML without JavaScript", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("<h1");
      expect(html).toContain("Sandeep Kommineni");
    });

    test("should have contact information in HTML without JavaScript", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain("sandeepkommineni2@gmail.com");
      expect(html).toContain("+91 9573456001");
    });

    test("should have navigation links in HTML without JavaScript", async () => {
      const response = await app.request("/");
      const html = await response.text();
      
      expect(html).toContain('href="#about"');
      expect(html).toContain('href="#experience"');
      expect(html).toContain('href="#contact"');
    });
  });
});
