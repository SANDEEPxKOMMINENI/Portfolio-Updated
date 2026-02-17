/**
 * SEO Configuration Module
 * 
 * Centralized SEO configuration for the portfolio website.
 * Supports environment-based configuration (development vs production).
 * 
 * Environment Variables:
 * - SITE_URL: Full site URL (default: https://sandeepkommineni.me)
 * - SITE_DOMAIN: Domain name (default: sandeepkommineni.me)
 * - GA_MEASUREMENT_ID: Google Analytics 4 Measurement ID
 * - GSC_VERIFICATION_ID: Google Search Console verification ID
 * - ENVIRONMENT: Environment mode (development or production)
 * 
 * Configuration can be provided in three ways:
 * 1. Environment variables (via process.env in Node.js or Cloudflare Pages dashboard)
 * 2. Cloudflare Pages environment bindings (passed through context)
 * 3. Default values (fallback)
 */

import type { SEOConfig, ExperienceData, ProjectData, EducationData } from "./types";

// ==================== Environment Variables ====================

/**
 * Environment bindings interface for Cloudflare Pages
 * These can be set in the Cloudflare Pages dashboard under Settings > Environment Variables
 */
export interface Env {
  SITE_URL?: string;
  SITE_DOMAIN?: string;
  GA_MEASUREMENT_ID?: string;
  GSC_VERIFICATION_ID?: string;
  ENVIRONMENT?: string;
}

/**
 * Get environment variable with fallback
 * Supports both Node.js process.env and Cloudflare environment bindings
 */
function getEnv(key: string, defaultValue: string = "", env?: Env): string {
  // Try Cloudflare environment bindings first (if provided)
  if (env && env[key as keyof Env]) {
    return env[key as keyof Env] as string;
  }
  
  // Try Node.js process.env (for local development)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  
  // Fall back to default value
  return defaultValue;
}

/**
 * Determine if running in production environment
 */
const isProduction = (env?: Env): boolean => {
  const environment = getEnv("ENVIRONMENT", "production", env);
  return environment === "production";
};

// ==================== Site Configuration ====================

/**
 * Create site configuration with environment support
 * @param env Optional Cloudflare environment bindings
 */
export function createSiteConfig(env?: Env) {
  const siteUrl = getEnv("SITE_URL", "https://sandeepkommineni.me", env);
  const siteDomain = getEnv("SITE_DOMAIN", "sandeepkommineni.me", env);
  
  return {
    url: siteUrl,
    domain: siteDomain,
  };
}

/**
 * Base site URL (with protocol)
 * Default configuration - can be overridden with environment variables
 */
export const SITE_URL = getEnv("SITE_URL", "https://sandeepkommineni.me");

/**
 * Site domain (without protocol)
 * Default configuration - can be overridden with environment variables
 */
export const SITE_DOMAIN = getEnv("SITE_DOMAIN", "sandeepkommineni.me");

/**
 * Site name
 */
export const SITE_NAME = "Sandeep Kommineni — AI/ML Engineer & Full-Stack Developer";

/**
 * Site author
 */
export const SITE_AUTHOR = "Sandeep Kommineni";

/**
 * Site description
 */
export const SITE_DESCRIPTION = "Sandeep Kommineni — AI/ML Engineer building production-grade AI platforms. Expert in Generative AI, LLMs, real-time systems, and full-stack development.";

// ==================== Person Data ====================

/**
 * Personal/professional information
 */
export const PERSON_DATA = {
  name: "Sandeep Kommineni",
  jobTitle: "AI/ML Engineer & Full-Stack Developer",
  email: "sandeepkommineni2@gmail.com",
  phone: "+919573456001",
  location: {
    city: "Guntur",
    region: "Andhra Pradesh",
    country: "India",
  },
  socialProfiles: {
    github: "https://github.com/SANDEEPxKOMMINENI",
    linkedin: "https://www.linkedin.com/in/sandeep-chowdary-kommineni/",
  },
  image: `${SITE_URL}/static/profile.jpg`,
  bio: "AI/ML Engineer with real-world experience building and deploying production-grade AI platforms. Expert in Generative AI, LLMs, real-time systems, and scalable full-stack applications.",
};

// ==================== SEO Keywords ====================

/**
 * Primary keywords for SEO optimization
 */
export const PRIMARY_KEYWORDS = [
  "Sandeep Kommineni",
  "AI/ML Engineer",
  "Full-Stack Developer",
  "Generative AI Engineer",
  "LLM Engineer",
  "AI Developer",
];

/**
 * Secondary keywords for SEO optimization
 */
export const SECONDARY_KEYWORDS = [
  "React Developer",
  "Python Developer",
  "FastAPI",
  "Next.js",
  "LiveKit",
  "OpenAI",
  "Machine Learning",
  "Deep Learning",
  "NLP",
  "Computer Vision",
  "RAG",
  "Agentic AI",
  "Real-time AI",
  "Multimodal AI",
];

/**
 * Location-based keywords for local SEO
 */
export const LOCATION_KEYWORDS = [
  "Guntur",
  "Andhra Pradesh",
  "India",
  "AI Engineer India",
  "ML Engineer Andhra Pradesh",
];

/**
 * Combined keywords array
 */
export const ALL_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  ...SECONDARY_KEYWORDS,
  ...LOCATION_KEYWORDS,
];

// ==================== Analytics Configuration ====================

/**
 * Create analytics configuration with environment support
 * @param env Optional Cloudflare environment bindings
 */
export function createAnalyticsConfig(env?: Env) {
  const gaMeasurementId = getEnv("GA_MEASUREMENT_ID", "", env);
  const gscVerificationId = getEnv("GSC_VERIFICATION_ID", "", env);
  const analyticsDebug = !isProduction(env);
  
  return {
    googleAnalyticsId: gaMeasurementId,
    googleSearchConsoleId: gscVerificationId,
    enableDebug: analyticsDebug,
  };
}

/**
 * Google Analytics 4 Measurement ID
 * Default configuration - can be overridden with environment variables
 */
export const GA_MEASUREMENT_ID = getEnv("GA_MEASUREMENT_ID", "");

/**
 * Google Search Console verification ID
 * Default configuration - can be overridden with environment variables
 */
export const GSC_VERIFICATION_ID = getEnv("GSC_VERIFICATION_ID", "");

/**
 * Enable analytics debug mode in development
 * Default configuration - can be overridden with environment variables
 */
export const ANALYTICS_DEBUG = !isProduction();

// ==================== Open Graph Image ====================

/**
 * Default Open Graph image URL
 */
export const OG_IMAGE_URL = `${SITE_URL}/static/profile.jpg`;

// ==================== Complete SEO Configuration ====================

/**
 * Create complete SEO configuration with environment support
 * @param env Optional Cloudflare environment bindings
 * @returns Complete SEO configuration object
 */
export function createSEOConfig(env?: Env): SEOConfig {
  const siteConfig = createSiteConfig(env);
  const analyticsConfig = createAnalyticsConfig(env);
  
  return {
    site: {
      name: SITE_NAME,
      url: siteConfig.url,
      domain: siteConfig.domain,
      author: SITE_AUTHOR,
      description: SITE_DESCRIPTION,
    },
    meta: {
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      keywords: ALL_KEYWORDS,
      ogImage: `${siteConfig.url}/static/profile.jpg`,
    },
    person: {
      ...PERSON_DATA,
      image: `${siteConfig.url}/static/profile.jpg`,
    },
    analytics: analyticsConfig,
    environment: isProduction(env) ? "production" : "development",
  };
}

/**
 * Main SEO configuration object (default configuration)
 * For environment-specific configuration, use createSEOConfig(env)
 */
export const seoConfig: SEOConfig = createSEOConfig();

// ==================== Experience Data ====================

/**
 * Work experience data for structured data generation
 */
export const experienceData: ExperienceData[] = [
  {
    company: "Truviz.AI",
    role: "AI/ML Engineer",
    description: "Contributed to TruGen.AI platform development, focusing on AI workflows, system architecture, and real-world product delivery. Explored LiveKit for real-time communication and multimodal AI integration.",
    startDate: "2026-01",
    location: "Remote",
    skills: ["LiveKit", "OpenAI", "Groq", "Agentic AI", "WebRTC", "Cloud"],
    companyUrl: "https://TruGen.AI",
  },
  {
    company: "KL University",
    role: "Undergraduate Research Assistant",
    description: "Advanced research in Generative AI and LLMs, developing domain-specific models and intelligent agent prototypes. Experimented with open-source frameworks and fine-tuning techniques.",
    startDate: "2025-06",
    endDate: "2026-01",
    location: "Guntur, India",
    skills: ["Generative AI", "LLMs", "Fine-tuning", "NLP", "Research"],
  },
  {
    company: "Isoft Technologies",
    role: "Full-Stack AI Developer Intern",
    description: "Developed AI-powered web application using Next.js and FastAPI for MoveLogic.ai. Built scalable backend with databases, REST APIs, and cloud platforms, serving 1000+ users.",
    startDate: "2025-03",
    endDate: "2025-06",
    location: "Remote / Auckland, NZ",
    skills: ["Next.js", "FastAPI", "Python", "ML", "Cloud", "REST APIs"],
    companyUrl: "https://movelogic.ai",
  },
];

// ==================== Project Data ====================

/**
 * Featured project data for structured data generation
 */
export const projectData: ProjectData[] = [
  {
    name: "TruGen.AI",
    description: "Multimodal Conversational AI Platform with real-time capabilities using LiveKit, OpenAI, and Groq",
    url: "https://TruGen.AI",
    technologies: ["LiveKit", "OpenAI", "Groq", "Multimodal AI", "Agentic AI", "Cloud"],
    dateCreated: "2026-01",
  },
  {
    name: "MoveLogic.ai",
    description: "AI-Powered Moving Logistics SaaS serving 1000+ users with Next.js, FastAPI, and computer vision",
    url: "https://movelogic.ai",
    technologies: ["Next.js", "FastAPI", "Computer Vision", "Python", "Cloud", "REST APIs"],
    dateCreated: "2025-03",
  },
  {
    name: "San Vortex AI",
    description: "Multi-model AI chat platform with 50+ models, Supabase auth, and media uploads",
    url: "https://san-vortex-ai.netlify.app/",
    technologies: ["React", "Supabase", "OpenRouter", "GenAI"],
    dateCreated: "2024",
  },
];

// ==================== Education Data ====================

/**
 * Education data for structured data generation
 */
export const educationData: EducationData[] = [
  {
    institution: "KL University",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering (AI & ML)",
    startDate: "2022-03",
    endDate: "2026-03",
    gpa: "9.0",
    location: "Vaddeswaram, Andhra Pradesh, India",
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Senior Secondary Education",
    field: "Physics, Chemistry, Mathematics",
    startDate: "2020",
    endDate: "2022",
    gpa: "7.3",
    location: "Guntur, Andhra Pradesh, India",
  },
];

// ==================== Export Default ====================

export default seoConfig;
