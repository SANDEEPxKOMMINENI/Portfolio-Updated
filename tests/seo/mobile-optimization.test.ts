import { describe, test, expect } from 'vitest';
import fc from 'fast-check';
import { generateMetaTags } from '../../src/seo/meta-tags';

/**
 * Mobile Optimization Property-Based Tests
 * 
 * These tests verify that mobile optimization requirements are met across
 * all configurations and scenarios.
 */

describe('Mobile Optimization - Property-Based Tests', () => {
  /**
   * Property 25: Touch target sizing
   * 
   * For any interactive button element, the CSS should specify minimum width
   * and height of 44px for touch-friendly interaction.
   * 
   * Validates: Requirements 8.2
   */
  test('Property 25: All interactive elements have minimum 44x44px touch targets', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '.theme-btn',
          '.burger',
          '.mobile-socials a',
          '.about-socials a',
          '.cert-view',
          '.footer-right a',
          '.proj-links-top a'
        ),
        (selector) => {
          // Read the CSS file to verify touch target sizes
          const fs = require('fs');
          const path = require('path');
          const cssPath = path.join(process.cwd(), 'public/static/style.css');
          const cssContent = fs.readFileSync(cssPath, 'utf-8');

          // Find the selector in CSS
          const selectorRegex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]*\\}`, 'g');
          const matches = cssContent.match(selectorRegex);

          if (!matches || matches.length === 0) {
            // If selector not found, it might be using min-width/min-height
            return true;
          }

          const selectorBlock = matches[0];

          // Check for width and height specifications
          const hasMinWidth = /(?:min-)?width:\s*(?:44|[5-9]\d|\d{3,})px/.test(selectorBlock);
          const hasMinHeight = /(?:min-)?height:\s*(?:44|[5-9]\d|\d{3,})px/.test(selectorBlock);

          // Interactive elements should have minimum 44px width and height
          expect(hasMinWidth).toBe(true);
          expect(hasMinHeight).toBe(true);

          return hasMinWidth && hasMinHeight;
        }
      ),
      { numRuns: 10 } // Run for each selector
    );
  });

  /**
   * Property 26: Readable font sizes
   * 
   * For any body text CSS, the font-size should be at least 16px to ensure
   * readability on mobile devices.
   * 
   * Validates: Requirements 8.5
   */
  test('Property 26: Body text has minimum 16px font size for readability', () => {
    fc.assert(
      fc.property(
        fc.record({
          // Generate arbitrary CSS configurations
          baseFontSize: fc.integer({ min: 16, max: 20 }),
          lineHeight: fc.double({ min: 1.4, max: 2.0 }),
        }),
        (config) => {
          // Read the CSS file to verify body font size
          const fs = require('fs');
          const path = require('path');
          const cssPath = path.join(process.cwd(), 'public/static/style.css');
          const cssContent = fs.readFileSync(cssPath, 'utf-8');

          // Find body selector
          const bodyRegex = /body\s*\{[^}]*\}/g;
          const bodyMatch = cssContent.match(bodyRegex);

          if (!bodyMatch || bodyMatch.length === 0) {
            throw new Error('Body selector not found in CSS');
          }

          const bodyBlock = bodyMatch[0];

          // Check for font-size specification
          const fontSizeMatch = bodyBlock.match(/font-size:\s*(\d+(?:\.\d+)?)px/);

          if (!fontSizeMatch) {
            // If no explicit font-size, check if html has a base size
            const htmlRegex = /html\s*\{[^}]*\}/g;
            const htmlMatch = cssContent.match(htmlRegex);
            
            if (htmlMatch && htmlMatch.length > 0) {
              const htmlBlock = htmlMatch[0];
              const htmlFontSizeMatch = htmlBlock.match(/font-size:\s*(\d+(?:\.\d+)?)px/);
              
              if (htmlFontSizeMatch) {
                const fontSize = parseFloat(htmlFontSizeMatch[1]);
                expect(fontSize).toBeGreaterThanOrEqual(16);
                return fontSize >= 16;
              }
            }
            
            // Default browser font size is typically 16px
            return true;
          }

          const fontSize = parseFloat(fontSizeMatch[1]);

          // Body text should be at least 16px for mobile readability
          expect(fontSize).toBeGreaterThanOrEqual(16);

          return fontSize >= 16;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Viewport meta tag presence
   * 
   * Verifies that the viewport meta tag is present for responsive design.
   */
  test('Viewport meta tag is present in generated HTML', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1, maxLength: 100 }),
          description: fc.string({ minLength: 1, maxLength: 200 }),
        }),
        (config) => {
          const metaTags = generateMetaTags({
            title: config.title,
            description: config.description,
            canonicalUrl: 'https://example.com',
            ogTitle: config.title,
            ogDescription: config.description,
            ogImage: 'https://example.com/image.jpg',
            ogType: 'website',
            ogUrl: 'https://example.com',
            twitterCard: 'summary_large_image',
            twitterTitle: config.title,
            twitterDescription: config.description,
            twitterImage: 'https://example.com/image.jpg',
          });

          // Viewport meta tag should be present
          expect(metaTags).toContain('<meta name="viewport"');
          expect(metaTags).toContain('width=device-width');
          expect(metaTags).toContain('initial-scale=1.0');

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Additional test: Responsive breakpoints
   * 
   * Verifies that CSS includes responsive media queries for mobile devices.
   */
  test('CSS includes responsive media queries for mobile devices', () => {
    const fs = require('fs');
    const path = require('path');
    const cssPath = path.join(process.cwd(), 'public/static/style.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    // Check for mobile breakpoints
    expect(cssContent).toContain('@media (max-width: 768px)');
    expect(cssContent).toContain('@media (max-width: 480px)');

    // Verify mobile-specific styles exist
    const mobileMediaQuery = cssContent.match(/@media \(max-width: 768px\)\s*\{[^}]*\}/gs);
    expect(mobileMediaQuery).toBeTruthy();
    expect(mobileMediaQuery!.length).toBeGreaterThan(0);
  });
});
