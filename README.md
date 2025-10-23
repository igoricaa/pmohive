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
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id    # Required (Sanity dashboard)
NEXT_PUBLIC_SANITY_DATASET=production             # Required (default: production)
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-06        # Required (YYYY-MM-DD format)
SANITY_API_TOKEN=your_token                       # Optional (write operations)
```

## Key Features

- **CMS**: Sanity with blog system, categories, search, filtering
- **UI**: Advanced components (AnimatedButton, LetterSwapPingPong, motion-based page transitions)
- **Header**: Scroll-responsive sticky header with intelligent hide/show
- **Forms**: React Hook Form + Zod v4 validation
- **State**: TanStack Query (server), nuqs (URL), React Hook Form (forms)

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
