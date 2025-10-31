# PMO Hive

Next.js 16 + Sanity CMS application for PMO services.

## Tech Stack

Next.js 16 • React 19.2 • Sanity CMS • Tailwind v4 • shadcn/ui • TypeScript • pnpm • TanStack Query • nuqs • Framer Motion

## Quick Start

### Install & Run

```bash
# Install
pnpm install

# Configure
cp .env.example .env.local
# Add Sanity credentials to .env.local

# Development
pnpm dev              # → http://localhost:3000
                      # Studio → http://localhost:3000/studio

# Production
pnpm build
pnpm start
```

### Sanity Type Generation

```bash
pnpx sanity@latest schema extract --enforce-required-fields
pnpx sanity@latest typegen generate
```

## Environment Variables

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id    # Required (Sanity dashboard)
NEXT_PUBLIC_SANITY_DATASET=production             # Required (default: production)
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-06        # Required (YYYY-MM-DD format)
SANITY_API_TOKEN=your_token                       # Optional (write operations)

# Contact Form
RESEND_API_KEY=your_resend_api_key                # Email delivery (https://resend.com)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key      # reCAPTCHA v3 (https://google.com/recaptcha)
RECAPTCHA_SECRET_KEY=your_secret_key              # reCAPTCHA v3 server-side

# Analytics & GDPR
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX                    # Google Tag Manager
NEXT_PUBLIC_TERMLY_UUID=xxxxxxxx-xxxx-xxxx        # Termly consent management

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key      # Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id        # Map ID (Vector type, required for Advanced Markers)
```

## Key Features

- **CMS**: Sanity with blog system, categories, search, filtering, modular case studies
- **UI**: Advanced components (AnimatedButton, LetterSwapPingPong, motion-based page transitions)
- **Header**: Scroll-responsive sticky header with intelligent hide/show
- **Forms**: React Hook Form + Zod v4 validation, reCAPTCHA v3, GDPR consent checkboxes
- **State**: TanStack Query (server), nuqs (URL), React Hook Form (forms)
- **GDPR**: Termly cookie consent, GTM Consent Mode v2, legal pages (Sanity CMS)

## Project Structure

```
src/
├── app/                # Next.js App Router
│   ├── (frontend)/    # Pages & layouts
│   ├── api/blog/      # API routes
│   └── studio/        # Sanity Studio
├── components/        # React components
│   ├── ui/           # shadcn/ui
│   ├── blog/         # Blog components
│   ├── fancy/text/   # Text animations
│   └── *.tsx         # Advanced components
├── sanity/           # CMS schemas & utilities
├── hooks/            # Custom hooks
├── providers/        # Context providers
└── lib/              # Utils (cn() helper)
```

## Documentation

- **[CLAUDE.md](CLAUDE.md)**: AI assistant operating manual (rules, gotchas, patterns, MCP routing)
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**: Design rules, component conventions, MCP tool usage

## Google Maps Setup

To use the GoogleMap component with Advanced Markers:

1. **Get API Key**: [Google Cloud Console - Credentials](https://console.cloud.google.com/google/maps-apis/credentials)
2. **Create Map ID**: [Google Cloud Console - Maps Management](https://console.cloud.google.com/google/maps-apis/studio/maps)
   - Map type: **JavaScript**
   - Rendering: **Vector** (required for Advanced Markers)
3. Add both to `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=your_map_id_here
   ```

**Note**: Advanced Markers require a Vector Map ID. Raster maps are not supported.

### Map Styling

When using a Map ID with Advanced Markers:

- **Cloud-based styling ONLY**: The `styles` prop is ignored when `mapId` is present
- **Apply styles in Cloud Console**:
  1. Go to [Maps Management](https://console.cloud.google.com/google/maps-apis/studio/maps)
  2. Select your Map ID → Edit → Map Styles
  3. Paste your custom JSON styling
  4. Save and associate with Map ID
- **No programmatic override**: Cannot change styles at runtime with Map IDs

### Sticky Map Layout

The contact page ([contact-us/page.tsx](<src/app/(frontend)/contact-us/page.tsx>)) uses a sticky map on XL+ screens:

- **Position**: `sticky` with `top: 184px`
- **Height**: `calc(100vh - 184px)` (full viewport minus header/padding)
- **Responsive**: Only sticky on XL screens (≥1280px), scrolls normally below that
- **Layout**: Map stays fixed on right while contact form scrolls on left

## Commands

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint
pnpm format           # Prettier

# shadcn/ui
pnpx shadcn@latest add [component]

# Sanity
pnpx sanity@latest schema extract
pnpx sanity@latest typegen generate
```

## Deployment

Optimized for **Vercel** (Next.js 16 platform support).

---

**Version**: 1.1.0 | **Next.js**: 16.0.0 | **React**: 19.2.0
