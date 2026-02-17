/**
 * Unit Tests for Asset Optimization
 * Tests specific examples and edge cases for performance optimizations
 */

import { describe, test, expect } from 'vitest';
import { generateResponsiveImage, generateOptimizedImg } from '../../src/seo/image-optimizationoptimization';
import app from '../../src/indexc/index';

describe('Asset Optimization Unit Tests', () => {
  describe('Image Optimization', () => {
    test('generateResponsiveImage creates picture element with WebP and fallback', () => {
      const result = generateResponsiveImage({
        src: '/static/profile.jpg',
        alt: 'Profile photo',
        sizes: '(max-width: 768px) 100vw, 50vw',
        loading: 'lazy'
      });

      expect(result).toContain('<picture>');
      expect(result).toContain('</picture>');
      expect(result).toContain('type="image/webp"');
      expect(result).toContain('/static/profile.webp');
      expect(result).toContain('/static/profile.jpg');
      expect(result).toContain('loading="lazy"');
      expect(result).toContain('alt="Profile photo"');
    });

    test('generateResponsiveImage handles different file extensions', () => {
      const pngResult = generateResponsiveImage({
        src: '/images/logo.png',
        alt: 'Logo'
      });

      expect(pngResult).toContain('type="image/webp"');
      expect(pngResult).toContain('type="image/png"');
      expect(pngResult).toContain('/images/logo.webp');
      expect(pngResult).toContain('/images/logo.png');
    });

    test('generateResponsiveImage defaults to lazy loading', () => {
      const result = generateResponsiveImage({
        src: '/test.jpg',
        alt: 'Test'
      });

      expect(result).toContain('loading="lazy"');
    });

    test('generateResponsiveImage supports eager loading', () => {
      const result = generateResponsiveImage({
        src: '/test.jpg',
        alt: 'Test',
        loading: 'eager'
      });

      expect(result).toContain('loading="eager"');
    });

    test('generateOptimizedImg creates simple img tag with lazy loading', () => {
      const result = generateOptimizedImg({
        src: '/icon.svg',
        alt: 'Icon',
        loading: 'lazy',
        className: 'icon-class'
      });

      expect(result).toContain('<img');
      expect(result).toContain('src="/icon.svg"');
      expect(result).toContain('alt="Icon"');
      expect(result).toContain('loading="lazy"');
      expect(result).toContain('class="icon-class"');
    });

    test('generateOptimizedImg handles missing optional parameters', () => {
      const result = generateOptimizedImg({
        src: '/test.jpg',
        alt: 'Test'
      });

      expect(result).toContain('loading="lazy"');
      expect(result).toContain('class=""');
    });
  });

  describe('Cache Headers', () => {
    test('CSS files have long-term cache headers', async () => {
      const res = await app.request('/static/style.css');
      const cacheControl = res.headers.get('Cache-Control');

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=31536000');
      expect(cacheControl).toContain('immutable');
    });

    test('Image files have long-term cache headers', async () => {
      const res = await app.request('/static/profile.jpg');
      const cacheControl = res.headers.get('Cache-Control');

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=31536000');
      expect(cacheControl).toContain('immutable');
    });

    test('HTML pages have shorter cache with revalidation', async () => {
      const res = await app.request('/');
      const cacheControl = res.headers.get('Cache-Control');

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=3600');
      expect(cacheControl).toContain('must-revalidate');
    });

    test('Sitemap has daily cache', async () => {
      const res = await app.request('/sitemap.xml');
      const cacheControl = res.headers.get('Cache-Control');

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=86400');
    });

    test('Robots.txt has daily cache', async () => {
      const res = await app.request('/robots.txt');
      const cacheControl = res.headers.get('Cache-Control');

      expect(cacheControl).toContain('public');
      expect(cacheControl).toContain('max-age=86400');
    });

    test('Security headers are present on all responses', async () => {
      const paths = ['/', '/sitemap.xml', '/robots.txt'];

      for (const path of paths) {
        const res = await app.request(path);
        
        expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
        expect(res.headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
      }
    });
  });

  describe('HTML Optimization', () => {
    test('HTML contains optimized image tags with dimensions', async () => {
      const res = await app.request('/');
      const html = await res.text();

      // Hero image should have width and height
      expect(html).toMatch(/width=["']\d+["']/);
      expect(html).toMatch(/height=["']\d+["']/);
    });

    test('HTML contains lazy loading for below-fold images', async () => {
      const res = await app.request('/');
      const html = await res.text();

      // About section image should be lazy loaded
      expect(html).toContain('loading="lazy"');
    });

    test('HTML contains eager loading for above-fold images', async () => {
      const res = await app.request('/');
      const html = await res.text();

      // Hero image should be eager loaded
      expect(html).toContain('loading="eager"');
    });

    test('HTML contains font preload', async () => {
      const res = await app.request('/');
      const html = await res.text();

      expect(html).toContain('rel="preload"');
      expect(html).toContain('as="style"');
    });

    test('HTML contains font preconnect', async () => {
      const res = await app.request('/');
      const html = await res.text();

      expect(html).toContain('rel="preconnect"');
      expect(html).toContain('fonts.googleapis.com');
      expect(html).toContain('fonts.gstatic.com');
    });
  });

  describe('Edge Cases', () => {
    test('generateResponsiveImage handles files without extension', () => {
      const result = generateResponsiveImage({
        src: '/image',
        alt: 'No extension'
      });

      expect(result).toContain('<picture>');
      expect(result).toContain('/image.webp');
      expect(result).toContain('/image');
    });

    test('generateResponsiveImage handles empty className', () => {
      const result = generateResponsiveImage({
        src: '/test.jpg',
        alt: 'Test',
        className: ''
      });

      expect(result).toContain('class=""');
    });

    test('Cache headers work for various file extensions', async () => {
      const extensions = ['.css', '.jpg', '.svg'];
      
      for (const ext of extensions) {
        const res = await app.request(`/static/test${ext}`);
        const cacheControl = res.headers.get('Cache-Control');
        
        expect(cacheControl).toBeTruthy();
        expect(cacheControl).toContain('public');
      }
    });
  });
});
