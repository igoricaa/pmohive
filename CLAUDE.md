# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application integrated with Sanity CMS. The project uses:
- **Next.js 15.5.4** with App Router and Turbopack
- **React 19**
- **Sanity CMS** for content management with Studio mounted at `/studio`
- **Biome** for linting and formatting (NOT ESLint/Prettier)
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style)
- **TypeScript** with strict mode enabled
- **pnpm** as package manager

## Commands

### Development
```bash
pnpm dev           # Start dev server with Turbopack
pnpm build         # Build for production with Turbopack
pnpm start         # Start production server
```

### Code Quality
```bash
pnpm lint          # Run Biome checks
pnpm format        # Format code with Biome
```

### Sanity Studio
The Sanity Studio is accessible at `/studio` route when the dev server is running. Configuration is in [sanity.config.ts](sanity.config.ts).

## Architecture

### Directory Structure

- **[src/app/](src/app/)** - Next.js App Router pages and layouts
  - [studio/[[...tool]]/](src/app/studio/[[...tool]]/) - Sanity Studio catch-all route
- **[src/sanity/](src/sanity/)** - All Sanity CMS related code
  - [schemaTypes/](src/sanity/schemaTypes/) - Content type definitions
    - [pages/](src/sanity/schemaTypes/pages/) - Page-specific schemas (home, about-us, etc.)
    - [posts/](src/sanity/schemaTypes/posts/) - Blog post schemas
  - [lib/](src/sanity/lib/) - Sanity utilities
    - [client.ts](src/sanity/lib/client.ts) - Sanity client and `sanityFetch` wrapper
    - [queries.ts](src/sanity/lib/queries.ts) - GROQ queries
    - [image.ts](src/sanity/lib/image.ts) - Image URL builder
  - [env.ts](src/sanity/env.ts) - Environment variable configuration
  - [structure.ts](src/sanity/structure.ts) - Studio structure configuration
- **[src/lib/](src/lib/)** - Shared utilities (e.g., [utils.ts](src/lib/utils.ts) for cn() helper)

### Key Patterns

**Sanity Data Fetching**: Use the `sanityFetch()` wrapper from [src/sanity/lib/client.ts](src/sanity/lib/client.ts) instead of the raw client. It includes:
- 12-hour default cache revalidation
- Tag-based revalidation support
- Proper Next.js cache configuration

**Schema Organization**: Sanity schemas are organized by content type (pages/posts) and exported through [src/sanity/schemaTypes/index.ts](src/sanity/schemaTypes/index.ts). When adding new schemas, follow the existing pattern.

**Environment Variables**: Sanity configuration requires:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (defaults to "2025-10-06")

These are validated in [src/sanity/env.ts](src/sanity/env.ts) and will throw errors if missing.

**Path Aliases**: The project uses `@/*` to reference [src/](src/) directory. shadcn/ui components use additional aliases defined in [components.json](components.json).

**Styling**: Uses Tailwind CSS v4 with the `cn()` utility from [src/lib/utils.ts](src/lib/utils.ts) for conditional class merging. shadcn/ui components follow the New York style variant.

**Linting**: This project uses **Biome**, not ESLint or Prettier. Always run `pnpm lint` or `pnpm format` for code quality checks.
