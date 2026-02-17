/**
 * Unit Tests for Analytics Module
 * 
 * Feature: portfolio-seo-enhancement
 * Task: 13.2 Write unit tests for analytics
 * 
 * Tests validate:
 * - Analytics script initialization
 * - Event tracking code
 * - Privacy configuration (DNT)
 * 
 * Validates: Requirements 6.1, 6.2, 6.3
 */

import { describe, test, expect } from "vitest";
import { generateAnalyticsScript } from "../../src/seo/analytics";
import type { AnalyticsConfig } from "../../src/seo/types";

// ==================== Analytics Script Generation Tests ====================

describe("generateAnalyticsScript", () => {
  test("should generate GA4 script with measurement ID", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-XXXXXXXXXX",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX");
    expect(script).toContain("gtag('config', 'G-XXXXXXXXXX'");
    expect(script).toContain("anonymize_ip");
    expect(script).toContain("cookie_flags");
  });

  test("should enable debug mode when configured", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: true,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("'debug_mode': true");
  });

  test("should disable debug mode by default", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("'debug_mode': false");
  });

  test("should return empty string when no measurement ID provided", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: undefined,
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toBe("");
  });

  test("should include DNT check in generated script", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("navigator.doNotTrack");
    expect(script).toContain("window.doNotTrack");
    expect(script).toContain("ga-disable-");
  });

  test("should include privacy-friendly configuration", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("'anonymize_ip': true");
    expect(script).toContain("'cookie_flags': 'SameSite=None;Secure'");
  });

  test("should handle empty measurement ID", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toBe("");
  });

  test("should include Google Analytics script tag", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("<script async src=");
    expect(script).toContain("googletagmanager.com/gtag/js");
  });

  test("should initialize dataLayer", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("window.dataLayer");
    expect(script).toContain("function gtag()");
  });

  test("should include Google Analytics comment", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);

    expect(script).toContain("<!-- Google Analytics 4 -->");
  });
});

// ==================== Configuration Tests ====================

describe("Analytics Configuration", () => {
  test("should accept valid measurement ID format", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-1234567890",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("G-1234567890");
  });

  test("should handle debug mode true", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: true,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("'debug_mode': true");
  });

  test("should handle debug mode false", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("'debug_mode': false");
  });

  test("should handle optional googleSearchConsoleId", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      googleSearchConsoleId: "GSC-123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("G-TEST");
  });
});

// ==================== Privacy Tests ====================

describe("Privacy Configuration", () => {
  test("should include DNT detection code", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    
    // Check for DNT detection
    expect(script).toContain('navigator.doNotTrack === "1"');
    expect(script).toContain('window.doNotTrack === "1"');
  });

  test("should disable tracking when DNT is enabled", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST123",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    
    // Check for ga-disable flag
    expect(script).toContain("window['ga-disable-G-TEST123']");
  });

  test("should include anonymize_ip for privacy", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("'anonymize_ip': true");
  });

  test("should include secure cookie flags", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("'cookie_flags': 'SameSite=None;Secure'");
  });
});

// ==================== Script Structure Tests ====================

describe("Script Structure", () => {
  test("should generate valid HTML script tags", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    
    // Count script tags
    const openTags = (script.match(/<script/g) || []).length;
    const closeTags = (script.match(/<\/script>/g) || []).length;
    
    expect(openTags).toBeGreaterThan(0);
    expect(openTags).toBe(closeTags);
  });

  test("should include async attribute for performance", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("async");
  });

  test("should initialize gtag with current date", () => {
    const config: AnalyticsConfig = {
      googleAnalyticsId: "G-TEST",
      enableDebug: false,
    };

    const script = generateAnalyticsScript(config);
    expect(script).toContain("gtag('js', new Date())");
  });
});
