/**
 * Property-Based Tests for SEO Configuration Module
 * 
 * Tests environment-based configuration functionality
 */

import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import { 
  createSEOConfig, 
  createSiteConfig, 
  createAnalyticsConfig,
  type Env 
} from '../../src/seo/config';

describe('SEO Configuration - Property-Based Tests', () => {
  /**
   * Feature: portfolio-seo-enhancement
   * Property 33: Environment-based configuration
   * 
   * For any environment setting (development or production), 
   * the application should load appropriate configuration values 
   * from environment variables.
   * 
   * Validates: Requirements 12.3
   */
  test('Property 33: Environment-based configuration - site config uses environment variables when provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          SITE_URL: fc.webUrl({ withFragments: false, withQueryParameters: false }),
          SITE_DOMAIN: fc.domain(),
        }),
        (env) => {
          const config = createSiteConfig(env);
          
          // Configuration should use environment variables when provided
          expect(config.url).toBe(env.SITE_URL);
          expect(config.domain).toBe(env.SITE_DOMAIN);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 33: Environment-based configuration - analytics config uses environment variables when provided', () => {
    fc.assert(
      fc.property(
        fc.record({
          GA_MEASUREMENT_ID: fc.string({ minLength: 1, maxLength: 50 }),
          GSC_VERIFICATION_ID: fc.string({ minLength: 1, maxLength: 50 }),
          ENVIRONMENT: fc.constantFrom('development', 'production'),
        }),
        (env) => {
          const config = createAnalyticsConfig(env);
          
          // Configuration should use environment variables when provided
          expect(config.googleAnalyticsId).toBe(env.GA_MEASUREMENT_ID);
          expect(config.googleSearchConsoleId).toBe(env.GSC_VERIFICATION_ID);
          
          // Debug mode should be enabled in development, disabled in production
          if (env.ENVIRONMENT === 'development') {
            expect(config.enableDebug).toBe(true);
          } else {
            expect(config.enableDebug).toBe(false);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 33: Environment-based configuration - complete SEO config uses environment variables', () => {
    fc.assert(
      fc.property(
        fc.record({
          SITE_URL: fc.webUrl({ withFragments: false, withQueryParameters: false }),
          SITE_DOMAIN: fc.domain(),
          GA_MEASUREMENT_ID: fc.string({ minLength: 1, maxLength: 50 }),
          GSC_VERIFICATION_ID: fc.string({ minLength: 1, maxLength: 50 }),
          ENVIRONMENT: fc.constantFrom('development', 'production'),
        }),
        (env) => {
          const config = createSEOConfig(env);
          
          // Site configuration should use environment variables
          expect(config.site.url).toBe(env.SITE_URL);
          expect(config.site.domain).toBe(env.SITE_DOMAIN);
          
          // Analytics configuration should use environment variables
          expect(config.analytics.googleAnalyticsId).toBe(env.GA_MEASUREMENT_ID);
          expect(config.analytics.googleSearchConsoleId).toBe(env.GSC_VERIFICATION_ID);
          
          // Environment should match
          expect(config.environment).toBe(env.ENVIRONMENT);
          
          // Meta OG image should use the site URL
          expect(config.meta.ogImage).toContain(env.SITE_URL);
          
          // Person image should use the site URL
          expect(config.person.image).toContain(env.SITE_URL);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 33: Environment-based configuration - falls back to defaults when no environment provided', () => {
    fc.assert(
      fc.property(
        fc.constant(undefined),
        (env) => {
          const config = createSEOConfig(env);
          
          // Should have valid configuration even without environment variables
          expect(config.site.url).toBeTruthy();
          expect(config.site.domain).toBeTruthy();
          expect(config.site.name).toBeTruthy();
          expect(config.site.author).toBeTruthy();
          expect(config.site.description).toBeTruthy();
          
          // Should have valid meta configuration
          expect(config.meta.title).toBeTruthy();
          expect(config.meta.description).toBeTruthy();
          expect(config.meta.keywords).toBeInstanceOf(Array);
          expect(config.meta.keywords.length).toBeGreaterThan(0);
          expect(config.meta.ogImage).toBeTruthy();
          
          // Should have valid person configuration
          expect(config.person.name).toBeTruthy();
          expect(config.person.jobTitle).toBeTruthy();
          expect(config.person.email).toBeTruthy();
          expect(config.person.image).toBeTruthy();
          
          // Should have valid analytics configuration (may be empty)
          expect(config.analytics).toBeDefined();
          expect(typeof config.analytics.enableDebug).toBe('boolean');
          
          // Should have valid environment
          expect(['development', 'production']).toContain(config.environment);
        }
      ),
      { numRuns: 100 }
    );
  });

  test('Property 33: Environment-based configuration - partial environment variables work correctly', () => {
    fc.assert(
      fc.property(
        fc.record({
          SITE_URL: fc.option(fc.webUrl({ withFragments: false, withQueryParameters: false }), { nil: undefined }),
          GA_MEASUREMENT_ID: fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
        }),
        (env) => {
          // Remove undefined values to simulate partial environment
          const partialEnv: Env = {};
          if (env.SITE_URL) partialEnv.SITE_URL = env.SITE_URL;
          if (env.GA_MEASUREMENT_ID) partialEnv.GA_MEASUREMENT_ID = env.GA_MEASUREMENT_ID;
          
          const config = createSEOConfig(partialEnv);
          
          // Should always have valid configuration
          expect(config.site.url).toBeTruthy();
          expect(config.site.domain).toBeTruthy();
          
          // If SITE_URL was provided, it should be used
          if (env.SITE_URL) {
            expect(config.site.url).toBe(env.SITE_URL);
          }
          
          // If GA_MEASUREMENT_ID was provided, it should be used
          if (env.GA_MEASUREMENT_ID) {
            expect(config.analytics.googleAnalyticsId).toBe(env.GA_MEASUREMENT_ID);
          }
          
          // Configuration should be complete and valid
          expect(config.meta.title).toBeTruthy();
          expect(config.person.name).toBeTruthy();
        }
      ),
      { numRuns: 100 }
    );
  });
});
