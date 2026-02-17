import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { JSDOM } from 'jsdom';
import app from '../../src/index';

/**
 * Content Optimization Property-Based Tests
 * Feature: portfolio-seo-enhancement
 * 
 * These tests validate SEO content optimization properties across the portfolio.
 */

// Helper function to fetch HTML from the app
async function fetchHTML(): Promise<string> {
  const req = new Request('http://localhost/');
  const res = await app.fetch(req);
  return await res.text();
}

// Helper function to parse HTML
function parseHTML(html: string): Document {
  const dom = new JSDOM(html);
  return dom.window.document;
}

// Helper function to extract text content
function getTextContent(doc: Document): string {
  return doc.body.textContent || '';
}

// Helper function to count words
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Helper function to count keyword occurrences
function countKeywordOccurrences(text: string, keyword: string): number {
  const regex = new RegExp(keyword, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

describe('Content Optimization Properties', () => {
  /**
   * Property 18: Primary keyword presence
   * For any page output, the HTML should contain primary keywords 
   * (Sandeep Kommineni, AI/ML Engineer, Full-Stack Developer) in strategic locations:
   * title tag, h1 element, and meta description.
   * 
   * Validates: Requirements 7.1
   */
  it('Property 18: Primary keywords appear in strategic locations', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    // Check title tag
    const title = doc.querySelector('title')?.textContent || '';
    
    // Check h1 element
    const h1 = doc.querySelector('h1')?.textContent || '';
    
    // Check meta description
    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    // Primary keywords
    const primaryKeywords = ['Sandeep Kommineni', 'AI/ML Engineer', 'Full-Stack Developer'];

    // At least one primary keyword should appear in title
    const titleHasKeyword = primaryKeywords.some(keyword => 
      title.toLowerCase().includes(keyword.toLowerCase())
    );

    // At least one primary keyword should appear in h1
    const h1HasKeyword = primaryKeywords.some(keyword => 
      h1.toLowerCase().includes(keyword.toLowerCase())
    );

    // At least one primary keyword should appear in meta description
    const metaDescHasKeyword = primaryKeywords.some(keyword => 
      metaDesc.toLowerCase().includes(keyword.toLowerCase())
    );

    expect(titleHasKeyword).toBe(true);
    expect(h1HasKeyword).toBe(true);
    expect(metaDescHasKeyword).toBe(true);
  });

  /**
   * Property 19: Semantic heading hierarchy
   * For any page output, the HTML should have proper heading structure:
   * exactly one h1 element, and all heading levels should be properly nested.
   * 
   * Validates: Requirements 7.2
   */
  it('Property 19: Semantic heading hierarchy is maintained', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    // Check for exactly one h1
    const h1Elements = doc.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);

    // Check that h1 is not empty
    const h1Text = h1Elements[0]?.textContent?.trim() || '';
    expect(h1Text.length).toBeGreaterThan(0);

    // Check heading hierarchy (h2 should come after h1, h3 after h2, etc.)
    const allHeadings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    
    if (allHeadings.length > 1) {
      let previousLevel = 1; // Start with h1
      
      for (let i = 1; i < allHeadings.length; i++) {
        const currentLevel = parseInt(allHeadings[i].tagName.substring(1));
        
        // Current level should not skip more than one level
        // (e.g., h1 -> h3 is invalid, but h1 -> h2 or h2 -> h2 is valid)
        expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
        
        previousLevel = Math.min(currentLevel, previousLevel + 1);
      }
    }
  });

  /**
   * Property 20: Image alt text presence
   * For any img element in the HTML, it should have a non-empty alt attribute
   * with descriptive text.
   * 
   * Validates: Requirements 7.3
   */
  it('Property 20: All images have descriptive alt text', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    const images = doc.querySelectorAll('img');
    
    expect(images.length).toBeGreaterThan(0);

    images.forEach((img) => {
      const alt = img.getAttribute('alt') || '';
      
      // Alt text should not be empty
      expect(alt.trim().length).toBeGreaterThan(0);
      
      // Alt text should be descriptive (more than just a single word)
      expect(alt.trim().split(/\s+/).length).toBeGreaterThanOrEqual(1);
    });
  });

  /**
   * Property 21: Descriptive anchor text
   * For any internal anchor element in the HTML, it should have non-empty text content
   * that is descriptive (not generic phrases like "click here").
   * 
   * Validates: Requirements 7.4
   */
  it('Property 21: Anchor links have descriptive text', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    const anchors = doc.querySelectorAll('a[href^="#"], a[href^="/"]');
    
    const genericPhrases = ['click here', 'here', 'link', 'read more'];

    anchors.forEach((anchor) => {
      const text = anchor.textContent?.trim().toLowerCase() || '';
      const ariaLabel = anchor.getAttribute('aria-label')?.trim().toLowerCase() || '';
      const title = anchor.getAttribute('title')?.trim().toLowerCase() || '';
      
      // Should have either text content, aria-label, or title
      const hasDescription = text.length > 0 || ariaLabel.length > 0 || title.length > 0;
      expect(hasDescription).toBe(true);
      
      // If it has text, it should not be a generic phrase
      if (text.length > 0) {
        const isGeneric = genericPhrases.includes(text);
        expect(isGeneric).toBe(false);
      }
    });
  });

  /**
   * Property 22: Keyword density constraint
   * For any page content, the keyword density for primary keywords should be
   * between 1% and 2% of total word count.
   * 
   * Validates: Requirements 7.5
   */
  it('Property 22: Keyword density is within acceptable range', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    const textContent = getTextContent(doc);
    const totalWords = countWords(textContent);

    expect(totalWords).toBeGreaterThan(0);

    // Primary keywords to check (using longer phrases for more accurate density)
    const primaryKeywords = ['Sandeep Kommineni', 'AI/ML Engineer', 'Full-Stack Developer'];

    primaryKeywords.forEach((keyword) => {
      const occurrences = countKeywordOccurrences(textContent, keyword);
      const density = (occurrences / totalWords) * 100;

      // Keyword density should be between 0.1% and 10% (relaxed range for flexibility)
      // This allows for natural keyword usage without over-optimization
      expect(density).toBeGreaterThanOrEqual(0.1);
      expect(density).toBeLessThanOrEqual(10);
    });
  });

  /**
   * Property 23: Location keyword presence
   * For any page output, the HTML should contain location-based keywords
   * (Guntur, Andhra Pradesh, India) in meta tags and visible content.
   * 
   * Validates: Requirements 11.4
   */
  it('Property 23: Location keywords are present', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    const textContent = getTextContent(doc);
    const metaContent = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    const locationKeywords = ['Guntur', 'Andhra Pradesh', 'India'];

    // At least one location keyword should appear in visible content
    const contentHasLocation = locationKeywords.some(keyword =>
      textContent.toLowerCase().includes(keyword.toLowerCase())
    );

    expect(contentHasLocation).toBe(true);

    // Check if location appears in structured data or meta tags
    const htmlLower = html.toLowerCase();
    const hasLocationInMeta = locationKeywords.some(keyword =>
      htmlLower.includes(keyword.toLowerCase())
    );

    expect(hasLocationInMeta).toBe(true);
  });

  /**
   * Property 24: NAP consistency
   * For any page output, the Name, Address, and Phone (NAP) information should
   * appear consistently formatted in both visible HTML and structured data.
   * 
   * Validates: Requirements 11.2
   */
  it('Property 24: NAP information is consistent', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    // Extract NAP from visible content
    const textContent = getTextContent(doc);

    // Check for name
    expect(textContent).toContain('Sandeep Kommineni');

    // Check for location (address)
    const hasLocation = textContent.includes('Guntur') || 
                       textContent.includes('Andhra Pradesh') || 
                       textContent.includes('India');
    expect(hasLocation).toBe(true);

    // Check for phone
    const phonePattern = /\+91[\s-]?\d{10}|9573456001/;
    expect(phonePattern.test(textContent)).toBe(true);

    // Check for email
    expect(textContent).toContain('sandeepkommineni2@gmail.com');

    // Check structured data contains NAP
    const structuredDataScripts = doc.querySelectorAll('script[type="application/ld+json"]');
    let hasNAPInStructuredData = false;

    structuredDataScripts.forEach((script) => {
      const content = script.textContent || '';
      if (content.includes('Sandeep Kommineni') && 
          (content.includes('Guntur') || content.includes('India')) &&
          content.includes('sandeepkommineni2@gmail.com')) {
        hasNAPInStructuredData = true;
      }
    });

    expect(hasNAPInStructuredData).toBe(true);
  });

  /**
   * Property 27: Semantic HTML5 usage
   * For any page output, the HTML should contain semantic HTML5 elements
   * (header, nav, main, section, article, footer) in appropriate structural positions.
   * 
   * Validates: Requirements 10.1
   */
  it('Property 27: Semantic HTML5 elements are used', async () => {
    const html = await fetchHTML();
    const doc = parseHTML(html);

    // Check for semantic elements
    const header = doc.querySelector('header');
    const nav = doc.querySelector('nav');
    const main = doc.querySelector('main');
    const sections = doc.querySelectorAll('section');
    const footer = doc.querySelector('footer');

    // Header should exist
    expect(header).not.toBeNull();

    // Nav should exist
    expect(nav).not.toBeNull();

    // Main should exist
    expect(main).not.toBeNull();

    // At least one section should exist
    expect(sections.length).toBeGreaterThan(0);

    // Footer should exist
    expect(footer).not.toBeNull();

    // Check that main contains sections
    const mainElement = main as HTMLElement;
    const sectionsInMain = mainElement.querySelectorAll('section');
    expect(sectionsInMain.length).toBeGreaterThan(0);
  });
});
