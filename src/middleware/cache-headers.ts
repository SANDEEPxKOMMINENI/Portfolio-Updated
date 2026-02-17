/**
 * Cache Headers Middleware
 * Adds appropriate cache headers for static assets
 */

import { Context, Next } from 'hono';

/**
 * Middleware to add cache headers for static assets
 * Configures cache-control headers based on file type
 */
export async function cacheHeaders(c: Context, next: Next) {
  await next();
  
  const path = c.req.path;
  
  // Static assets (images, fonts, CSS, JS) - cache for 1 year
  if (
    path.match(/\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|eot)$/i) ||
    path.match(/\.(css|js)$/i)
  ) {
    c.header('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // HTML pages - cache for 1 hour with revalidation
  else if (path.endsWith('.html') || path === '/') {
    c.header('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  // Sitemap and robots - cache for 1 day
  else if (path === '/sitemap.xml' || path === '/robots.txt') {
    c.header('Cache-Control', 'public, max-age=86400');
  }
  
  // Add security headers
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'SAMEORIGIN');
}
