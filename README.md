# Portfolio Website

A modern, SEO-optimized personal portfolio built with Hono and deployed on Cloudflare Pages.

## Getting Started

### Installation

```txt
npm install
```

### Development

```txt
npm run dev
```

### Build

```txt
npm run build
```

### Deployment

```txt
npm run deploy
```

## Environment Variables

This project supports environment-based configuration for SEO and analytics. Copy `.env.example` to `.env` and configure the following variables:

### Site Configuration

- `SITE_URL` - Full site URL with protocol (default: `https://sandeepkommineni.me`)
- `SITE_DOMAIN` - Domain name without protocol (default: `sandeepkommineni.me`)

### Analytics Configuration

- `GA_MEASUREMENT_ID` - Google Analytics 4 Measurement ID (format: `G-XXXXXXXXXX`)
  - Get this from your Google Analytics dashboard
  - Leave empty to disable analytics
- `GSC_VERIFICATION_ID` - Google Search Console verification ID
  - Get this from Google Search Console
  - Used for search performance monitoring

### Environment Mode

- `ENVIRONMENT` - Environment mode: `development` or `production` (default: `production`)
  - Controls analytics debug mode and other environment-specific features
  - Set to `development` for local testing

### Setting Environment Variables

#### Local Development (Node.js)

Create a `.env` file in the project root:

```bash
SITE_URL=http://localhost:5173
SITE_DOMAIN=localhost
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GSC_VERIFICATION_ID=your-verification-id
ENVIRONMENT=development
```

#### Cloudflare Pages Deployment

Set environment variables in the Cloudflare Pages dashboard:

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** > **Environment Variables**
3. Add variables for both **Production** and **Preview** environments
4. Redeploy your site for changes to take effect

Example production configuration:
```
SITE_URL=https://sandeepkommineni.me
SITE_DOMAIN=sandeepkommineni.me
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GSC_VERIFICATION_ID=your-verification-id
ENVIRONMENT=production
```

## Testing

Run tests:

```txt
npm test
```

Watch mode:

```txt
npm run test:watch
```

## Type Generation

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
