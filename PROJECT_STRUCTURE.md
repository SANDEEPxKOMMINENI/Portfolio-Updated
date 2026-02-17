# Project Structure

This document describes the clean, organized structure of the portfolio project.

## Directory Structure

```
Portfolio-Updated/
├── src/                          # Source code (production)
│   ├── seo/                      # SEO implementation modules
│   │   ├── analytics.ts          # Google Analytics integration
│   │   ├── config.ts             # SEO configuration management
│   │   ├── image-optimization.ts # Image optimization utilities
│   │   ├── meta-tags.ts          # Meta tags generation
│   │   ├── robots.ts             # robots.txt generation
│   │   ├── sitemap.ts            # sitemap.xml generation
│   │   ├── structured-data.ts    # JSON-LD structured data
│   │   ├── types.ts              # TypeScript type definitions
│   │   └── README.md             # SEO module documentation
│   ├── middleware/               # Hono middleware
│   │   └── cache-headers.ts      # Cache header configuration
│   └── index.tsx                 # Main application entry point
│
├── tests/                        # All test files (separate from source)
│   ├── seo/                      # SEO module tests
│   │   ├── analytics.test.ts
│   │   ├── asset-optimization.test.ts
│   │   ├── build-output.test.ts
│   │   ├── config.test.ts
│   │   ├── content-optimization.test.ts
│   │   ├── meta-tags.test.ts
│   │   ├── mobile-optimization.test.ts
│   │   ├── performance-optimization.test.ts
│   │   ├── redirect.test.ts
│   │   ├── robots.test.ts
│   │   ├── sitemap.test.ts
│   │   ├── structured-data.test.ts
│   │   └── technical-seo.test.ts
│   └── index.test.ts             # Main app integration tests
│
├── docs/                         # Documentation
│   └── DOMAIN_SETUP.md           # Custom domain setup guide
│
├── public/                       # Static assets
│   ├── static/                   # Public static files
│   │   ├── app.js
│   │   ├── style.css
│   │   ├── profile.jpg
│   │   └── favicon.svg
│   ├── _redirects               # Cloudflare Pages redirects
│   └── favicon.svg
│
├── dist/                         # Build output (generated, not in git)
│   ├── static/                   # Optimized static assets
│   ├── _worker.js                # Cloudflare Worker bundle
│   ├── _routes.json              # Cloudflare Pages routes
│   └── _redirects                # Redirect rules
│
├── .kiro/                        # Kiro AI assistant configuration
│   └── specs/                    # Feature specifications
│       └── portfolio-seo-enhancement/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
│
├── .vscode/                      # VS Code settings
├── .git/                         # Git repository
├── node_modules/                 # Dependencies (not in git)
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
├── wrangler.jsonc                # Cloudflare Wrangler config
├── ecosystem.config.cjs          # PM2 configuration
├── PROJECT_STRUCTURE.md          # This file
└── README.md                     # Project documentation
```

## Key Principles

### 1. Separation of Concerns
- **Source code** (`src/`) contains only production code
- **Tests** (`tests/`) are completely separate from source
- **Documentation** (`docs/`) is in its own directory

### 2. Clean Source Directory
The `src/` directory is clean and focused:
- No test files mixed with source code
- Clear module organization
- Easy to navigate and understand

### 3. Organized Tests
All tests are in the `tests/` directory:
- Mirrors the `src/` structure for easy navigation
- Import from `../../src/` to reference source code
- All test files use `.test.ts` extension

### 4. Build Output
The `dist/` directory is generated during build:
- Not tracked in git (in `.gitignore`)
- Contains optimized, bundled code
- Only includes production assets (no tests)

## What Gets Deployed?

When you run `npm run build && wrangler pages deploy`, only these are deployed:

✅ **Deployed to Production:**
- `dist/_worker.js` - Bundled application code
- `dist/static/*` - Optimized static assets
- `dist/_redirects` - Redirect rules
- `dist/_routes.json` - Route configuration

❌ **NOT Deployed:**
- Test files (`tests/`)
- Source TypeScript files (`src/`)
- Documentation (`docs/`)
- Configuration files
- `node_modules/`

## Development Workflow

### Running Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for Production
```bash
# Build the project
npm run build

# Preview the build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

### Development Server
```bash
# Start development server
npm run dev
```

## Benefits of This Structure

1. **Clean and Professional**: Source code is not cluttered with test files
2. **Easy Navigation**: Clear separation makes it easy to find what you need
3. **Scalable**: Easy to add new modules and tests
4. **Standard Practice**: Follows industry best practices
5. **Build Optimization**: Build tools only bundle what's needed
6. **Git-Friendly**: Clear structure makes code reviews easier

## File Naming Conventions

- **Source files**: `kebab-case.ts` (e.g., `meta-tags.ts`)
- **Test files**: `kebab-case.test.ts` (e.g., `meta-tags.test.ts`)
- **Type definitions**: `types.ts`
- **Configuration**: `config.ts`
- **Documentation**: `UPPERCASE.md` (e.g., `README.md`, `DOMAIN_SETUP.md`)

## Import Patterns

### In Source Files
```typescript
// Relative imports within src/
import { generateMetaTags } from './meta-tags';
import type { SEOConfig } from './types';
```

### In Test Files
```typescript
// Import from src/ using relative path
import { generateMetaTags } from '../../src/seo/meta-tags';
import type { SEOConfig } from '../../src/seo/types';
```

## Next Steps

Before deploying:
1. ✅ Project structure is organized
2. ✅ All tests pass (250 tests passing)
3. ✅ Documentation is complete
4. 📝 Review `.gitignore` to ensure unnecessary files aren't tracked
5. 📝 Push code to Git repository
6. 📝 Deploy to Cloudflare Pages
7. 📝 Follow `docs/DOMAIN_SETUP.md` to configure custom domain

---

**Last Updated**: February 2026  
**Version**: 1.0
