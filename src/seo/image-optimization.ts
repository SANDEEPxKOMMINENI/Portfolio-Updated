/**
 * Image Optimization Utilities
 * Generates responsive image markup with WebP format and fallbacks
 */

export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Generate responsive image HTML with WebP format and fallbacks
 * Creates picture element with source elements for WebP and fallback formats
 */
export function generateResponsiveImage(config: ResponsiveImageConfig): string {
  const { src, alt, sizes = '100vw', loading = 'lazy', className = '' } = config;
  
  // Extract file extension and base path
  const lastDotIndex = src.lastIndexOf('.');
  const basePath = lastDotIndex > 0 ? src.substring(0, lastDotIndex) : src;
  const extension = lastDotIndex > 0 ? src.substring(lastDotIndex) : '.jpg';
  
  // Generate WebP source
  const webpSrc = `${basePath}.webp`;
  
  // Generate srcset for different sizes (1x, 2x for retina)
  const srcset = `${src} 1x, ${src} 2x`;
  const webpSrcset = `${webpSrc} 1x, ${webpSrc} 2x`;
  
  return `<picture>
  <source type="image/webp" srcset="${webpSrcset}" sizes="${sizes}">
  <source type="image/${extension.substring(1)}" srcset="${srcset}" sizes="${sizes}">
  <img src="${src}" alt="${alt}" loading="${loading}" class="${className}">
</picture>`;
}

/**
 * Generate simple img tag with lazy loading
 * For cases where picture element is not needed
 */
export function generateOptimizedImg(config: ResponsiveImageConfig): string {
  const { src, alt, loading = 'lazy', className = '' } = config;
  
  return `<img src="${src}" alt="${alt}" loading="${loading}" class="${className}">`;
}
