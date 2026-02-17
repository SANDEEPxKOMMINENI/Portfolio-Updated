/**
 * SEO Type Definitions
 * 
 * TypeScript interfaces for SEO configuration, meta tags, and structured data schemas
 * following Schema.org vocabulary for portfolio-seo-enhancement feature.
 */

// ==================== Meta Tags Types ====================

/**
 * Configuration for generating HTML meta tags
 */
export interface MetaTagsConfig {
  /** Page title (appears in browser tab and search results) */
  title: string;
  /** Meta description (max 160 characters recommended) */
  description: string;
  /** Canonical URL for the page */
  canonicalUrl: string;
  /** Keywords for SEO (comma-separated) */
  keywords?: string[];
  /** Author name */
  author?: string;
}

/**
 * Open Graph meta tags for social media sharing
 */
export interface OpenGraphTags {
  /** OG title */
  ogTitle: string;
  /** OG description */
  ogDescription: string;
  /** OG image URL (minimum 1200x630px recommended) */
  ogImage: string;
  /** OG type (e.g., "website", "article") */
  ogType: string;
  /** OG URL */
  ogUrl: string;
  /** OG site name */
  ogSiteName?: string;
}

/**
 * Twitter Card meta tags for Twitter sharing
 */
export interface TwitterCardTags {
  /** Twitter card type (e.g., "summary_large_image") */
  twitterCard: string;
  /** Twitter title */
  twitterTitle: string;
  /** Twitter description */
  twitterDescription: string;
  /** Twitter image URL */
  twitterImage: string;
  /** Twitter site handle (optional) */
  twitterSite?: string;
  /** Twitter creator handle (optional) */
  twitterCreator?: string;
}

// ==================== Structured Data Types ====================

/**
 * Schema.org Person structured data
 * Represents a person's professional profile
 */
export interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  url: string;
  email: string;
  telephone: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  /** Social media profile URLs */
  sameAs: string[];
  /** Optional profile image URL */
  image?: string;
  /** Optional description/bio */
  description?: string;
}

/**
 * Schema.org WorkExperience structured data
 * Represents professional work experience
 */
export interface WorkExperienceSchema {
  "@context": "https://schema.org";
  "@type": "WorkExperience";
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  employer: {
    "@type": "Organization";
    name: string;
    url?: string;
  };
  /** Job location */
  location?: string;
  /** Skills used in this role */
  skills?: string[];
}

/**
 * Schema.org CreativeWork structured data
 * Represents projects and creative works
 */
export interface CreativeWorkSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  url?: string;
  dateCreated?: string;
  datePublished?: string;
  author?: {
    "@type": "Person";
    name: string;
  };
  /** Technologies/tools used */
  keywords?: string[];
}

/**
 * Schema.org EducationalOccupationalCredential structured data
 * Represents education and certifications
 */
export interface EducationSchema {
  "@context": "https://schema.org";
  "@type": "EducationalOccupationalCredential";
  name: string;
  description?: string;
  educationalLevel?: string;
  credentialCategory?: string;
  recognizedBy?: {
    "@type": "Organization";
    name: string;
  };
  /** Start date */
  startDate?: string;
  /** End date */
  endDate?: string;
  /** GPA or grade */
  grade?: string;
}

// ==================== SEO Configuration Types ====================

/**
 * Site-wide information
 */
export interface SiteInfo {
  /** Site name */
  name: string;
  /** Full site URL (e.g., "https://sandeepkommineni.me") */
  url: string;
  /** Domain name (e.g., "sandeepkommineni.me") */
  domain: string;
  /** Site author/owner */
  author: string;
  /** Site description */
  description: string;
}

/**
 * Person/profile data for structured data
 */
export interface PersonData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  socialProfiles: {
    github: string;
    linkedin: string;
  };
  /** Optional profile image URL */
  image?: string;
  /** Optional bio/description */
  bio?: string;
}

/**
 * Work experience data
 */
export interface ExperienceData {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  skills?: string[];
  companyUrl?: string;
}

/**
 * Project data
 */
export interface ProjectData {
  name: string;
  description: string;
  url?: string;
  technologies: string[];
  dateCreated?: string;
  datePublished?: string;
}

/**
 * Education data
 */
export interface EducationData {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
}

/**
 * Analytics configuration
 */
export interface AnalyticsConfig {
  /** Google Analytics 4 Measurement ID */
  googleAnalyticsId?: string;
  /** Google Search Console verification ID */
  googleSearchConsoleId?: string;
  /** Enable debug mode for analytics */
  enableDebug?: boolean;
}

/**
 * Complete SEO configuration
 */
export interface SEOConfig {
  site: SiteInfo;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  person: PersonData;
  analytics: AnalyticsConfig;
  /** Environment (development or production) */
  environment: "development" | "production";
}

// ==================== Sitemap Types ====================

/**
 * Sitemap URL entry
 */
export interface SitemapURL {
  /** URL location */
  loc: string;
  /** Last modification date (ISO 8601 format) */
  lastmod: string;
  /** Change frequency */
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Priority (0.0 to 1.0) */
  priority: number;
}

// ==================== Analytics Types ====================

/**
 * Analytics event data
 */
export interface AnalyticsEvent {
  /** Event name */
  eventName: string;
  /** Event category */
  eventCategory: string;
  /** Event label (optional) */
  eventLabel?: string;
  /** Event value (optional) */
  eventValue?: number;
  /** Custom parameters */
  customParameters?: Record<string, any>;
}
