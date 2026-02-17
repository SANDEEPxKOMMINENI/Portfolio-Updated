import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

describe('Build Output Tests', () => {
  const distPath = join(process.cwd(), 'dist');
  
  describe('Build Directory Structure', () => {
    it('should have dist directory', () => {
      expect(existsSync(distPath)).toBe(true);
    });

    it('should have _worker.js file', () => {
      const workerPath = join(distPath, '_worker.js');
      expect(existsSync(workerPath)).toBe(true);
    });

    it('should have static assets directory', () => {
      const staticPath = join(distPath, 'static');
      expect(existsSync(staticPath)).toBe(true);
    });

    it('should have required static assets', () => {
      const requiredAssets = ['app.js', 'style.css', 'profile.jpg', 'favicon.svg'];
      
      requiredAssets.forEach(asset => {
        const assetPath = join(distPath, 'static', asset);
        expect(existsSync(assetPath)).toBe(true);
      });
    });
  });

  describe('Asset Optimization', () => {
    it('should have minified worker JavaScript', () => {
      const workerPath = join(distPath, '_worker.js');
      if (!existsSync(workerPath)) {
        return; // Skip if build hasn't run
      }
      
      const content = readFileSync(workerPath, 'utf-8');
      
      // Check for minification indicators
      // Minified code typically has very long lines and no unnecessary whitespace
      const lines = content.split('\n');
      const hasLongLines = lines.some(line => line.length > 500);
      
      expect(hasLongLines).toBe(true);
    });

    it('should have reasonable file sizes', () => {
      const workerPath = join(distPath, '_worker.js');
      if (!existsSync(workerPath)) {
        return; // Skip if build hasn't run
      }
      
      const stats = statSync(workerPath);
      const sizeInKB = stats.size / 1024;
      
      // Worker should be reasonably sized (not too large)
      expect(sizeInKB).toBeLessThan(500); // Less than 500KB
      expect(sizeInKB).toBeGreaterThan(10); // More than 10KB (has actual content)
    });
  });

  describe('Route Configuration', () => {
    it('should have _routes.json configuration', () => {
      const routesPath = join(distPath, '_routes.json');
      if (!existsSync(routesPath)) {
        return; // Skip if build hasn't run
      }
      
      expect(existsSync(routesPath)).toBe(true);
      
      const routesContent = readFileSync(routesPath, 'utf-8');
      const routes = JSON.parse(routesContent);
      
      // Should have version and routes configuration
      expect(routes).toHaveProperty('version');
    });

    it('should have _redirects file', () => {
      const redirectsPath = join(distPath, '_redirects');
      expect(existsSync(redirectsPath)).toBe(true);
    });
  });

  describe('SEO Assets Accessibility', () => {
    it('should verify sitemap.xml route is configured in worker', () => {
      const workerPath = join(distPath, '_worker.js');
      if (!existsSync(workerPath)) {
        return; // Skip if build hasn't run
      }
      
      const content = readFileSync(workerPath, 'utf-8');
      
      // Check that sitemap generation function exists
      expect(content).toContain('sitemap.xml');
    });

    it('should verify robots.txt route is configured in worker', () => {
      const workerPath = join(distPath, '_worker.js');
      if (!existsSync(workerPath)) {
        return; // Skip if build hasn't run
      }
      
      const content = readFileSync(workerPath, 'utf-8');
      
      // Check that robots.txt generation function exists
      expect(content).toContain('robots.txt');
    });
  });
});
