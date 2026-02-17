# SEO Module

This directory contains the SEO configuration and utilities for the portfolio website.

## Files

### `types.ts`
TypeScript type definitions for:
- Meta tags configuration (title, description, Open Graph, Twitter Cards)
- Structured data schemas (Person, WorkExperience, CreativeWork, Education)
- SEO configuration interfaces
- Sitemap and analytics types

### `config.ts`
Centralized SEO configuration including:
- Site information (URL, domain, name, description)
- Person/profile data (name, job title, contact info, location)
- SEO keywords (primary, secondary, location-based)
- Analytics configuration (Google Analytics, Search Console)
- Work experience data
- Project data
- Education data

## Environment Variables

The SEO module supports environment-based configuration. Create a `.env` file based on `.env.example`:

```bash
# Site Configuration
SITE_URL=https://sandeepkommineni.me
SITE_DOMAIN=sandeepkommineni.me

# Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GSC_VERIFICATION_ID=your-verification-id

# Environment
ENVIRONMENT=production
```

## Usage

### Import Configuration

```typescript
import { seoConfig, SITE_URL, PERSON_DATA } from './seo/config';
import type { MetaTagsConfig, PersonSchema } from './seo/types';
```

### Access Configuration Data

```typescript
// Site information
const siteUrl = seoConfig.site.url;
const siteName = seoConfig.site.name;

// Person data
const personName = seoConfig.person.name;
const personEmail = seoConfig.person.email;

// Keywords
const keywords = seoConfig.meta.keywords;

// Analytics
const gaId = seoConfig.analytics.googleAnalyticsId;
```

### Use in Components

```typescript
import { seoConfig, experienceData, projectData } from './seo/config';

// Generate meta tags
const metaTags = {
  title: seoConfig.meta.title,
  description: seoConfig.meta.description,
  canonicalUrl: seoConfig.site.url,
};

// Use experience data for structured data
const experiences = experienceData.map(exp => ({
  company: exp.company,
  role: exp.role,
  // ...
}));
```

## Development vs Production

The configuration automatically detects the environment:

- **Development**: Analytics debug mode enabled, uses default values
- **Production**: Full analytics tracking, uses environment variables

## Next Steps

This module provides the foundation for:
1. Meta tags generation (Task 2)
2. Structured data generation (Task 3)
3. Sitemap generation (Task 4)
4. Analytics integration (Task 13)

## Requirements

Validates: **Requirement 12.3** - Environment variable structure for production vs development configurations
