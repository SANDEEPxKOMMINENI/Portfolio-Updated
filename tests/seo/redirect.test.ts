/**
 * Property-Based Tests for WWW to Apex Domain Redirect
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 14.2 Write property test for redirect
 * 
 * Tests validate the following properties:
 * - Property 32: WWW to apex redirect
 * 
 * Validates: Requirements 1.4
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import { readFileSync } from "fs";
import { join } from "path";

describe("WWW to Apex Domain Redirect Property-Based Tests", () => {
  /**
   * Property 32: WWW to apex redirect
   * 
   * For any request to www subdomain, the system should respond with a 301
   * redirect to the apex domain (sandeepkommineni.me).
   * 
   * **Validates: Requirements 1.4**
   */
  test("Property 32: WWW to apex redirect", () => {
    const redirectsPath = join(process.cwd(), "public", "_redirects");
    const redirectsContent = readFileSync(redirectsPath, "utf-8");

    fc.assert(
      fc.property(fc.constant(null), () => {
        // Check that the redirects file contains the www to apex redirect rule
        expect(redirectsContent).toContain("www.sandeepkommineni.me");
        expect(redirectsContent).toContain("sandeepkommineni.me");
        
        // Check for 301 status code
        expect(redirectsContent).toContain("301");
        
        // Check that the redirect preserves the path using splat
        expect(redirectsContent).toContain(":splat");
        
        // Verify the redirect rule format
        const lines = redirectsContent.split("\n");
        const redirectLine = lines.find((line) => 
          line.includes("www.sandeepkommineni.me") && 
          !line.trim().startsWith("#")
        );
        
        expect(redirectLine).toBeDefined();
        
        if (redirectLine) {
          // Should contain source pattern with wildcard
          expect(redirectLine).toMatch(/www\.sandeepkommineni\.me\/\*/);
          
          // Should contain destination with splat placeholder
          expect(redirectLine).toMatch(/sandeepkommineni\.me\/:\w+/);
          
          // Should specify 301 status
          expect(redirectLine).toContain("301");
          
          // Should have force flag (!)
          expect(redirectLine).toContain("!");
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Property: Redirect file exists and is readable
   * 
   * The _redirects file should exist in the public directory and be readable.
   */
  test("Property: Redirect file exists and is readable", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const redirectsPath = join(process.cwd(), "public", "_redirects");
        
        // File should exist and be readable
        expect(() => readFileSync(redirectsPath, "utf-8")).not.toThrow();
        
        const content = readFileSync(redirectsPath, "utf-8");
        
        // Content should not be empty
        expect(content.length).toBeGreaterThan(0);
      }),
      { numRuns: 10 }
    );
  });

  /**
   * Property: Redirect rule uses HTTPS
   * 
   * The redirect rule should use HTTPS protocol for both source and destination.
   */
  test("Property: Redirect rule uses HTTPS", () => {
    fc.assert(
      fc.property(fc.constant(null), () => {
        const redirectsPath = join(process.cwd(), "public", "_redirects");
        const redirectsContent = readFileSync(redirectsPath, "utf-8");
        
        const lines = redirectsContent.split("\n");
        const redirectLine = lines.find((line) => 
          line.includes("www.sandeepkommineni.me") && 
          !line.trim().startsWith("#")
        );
        
        if (redirectLine) {
          // Both source and destination should use HTTPS
          const httpsMatches = redirectLine.match(/https:\/\//g);
          expect(httpsMatches).toBeDefined();
          expect(httpsMatches?.length).toBe(2);
        }
      }),
      { numRuns: 10 }
    );
  });
});
