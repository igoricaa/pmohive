# PMO Hive

A modern Next.js 15 application integrated with Sanity CMS for PMO (Project Management Office) services and content management.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router and Turbopack
- **UI Library**: React 19
- **CMS**: Sanity CMS with Studio at `/studio`
- **Styling**: Tailwind CSS v4 + shadcn/ui (New York style)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **State Management**:
  - TanStack Query v5 (server state)
  - nuqs (URL state)
- **Forms**: React Hook Form v7.65.0 + Zod v4.1.11
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) - `npm install -g pnpm`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd pmohive

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Sanity credentials
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Format code
pnpm format

# Lint code
pnpm lint
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Sanity Studio

The Sanity Studio is accessible at [http://localhost:3000/studio](http://localhost:3000/studio) when the dev server is running.

**Type Generation**:
```bash
# Extract Sanity schema
pnpx sanity@latest schema extract --enforce-required-fields

# Generate TypeScript types
pnpx sanity@latest typegen generate
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (frontend)/        # Frontend routes
│   │   ├── blog/          # Blog pages
│   │   ├── contact/       # Contact page
│   │   └── layout.tsx     # Frontend layout
│   ├── api/               # API routes
│   │   └── blog/          # Blog API endpoints
│   └── studio/            # Sanity Studio route
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── blog/             # Blog-specific components
│   ├── sections/         # Page section components
│   └── contact-form.tsx  # Contact form
├── sanity/               # Sanity CMS configuration
│   ├── schemaTypes/      # Content schemas
│   │   ├── pages/        # Page schemas
│   │   └── posts/        # Blog post schemas
│   └── lib/              # Sanity utilities
├── hooks/                # Custom React hooks
├── providers/            # React context providers
└── lib/                  # Shared utilities
```

## Key Features

### Content Management
- **Sanity CMS** integration with custom schemas
- **Blog system** with categories, search, and filtering
- **Reusable content types** (subtitles, buttons, etc.)
- **Rich text editor** support with portable text

### Forms & Validation
- **Contact form** with React Hook Form + Zod v4
- Real-time validation with custom error messages
- 6 form fields: first name, last name, email, country, area of interest, message
- Accessible and responsive design

### State Management
- **Server state**: TanStack Query v5 with SSR hydration
- **URL state**: nuqs for shareable, bookmarkable filters
- **Form state**: React Hook Form with Zod validation

### Developer Experience
- TypeScript strict mode for type safety
- ESLint + Prettier for code quality
- Turbopack for fast development builds
- Hot module replacement (HMR)
- Path aliases (`@/*` for `src/*`)

## Documentation

- **[CLAUDE.md](CLAUDE.md)**: Comprehensive project documentation for AI assistants
  - Architecture patterns
  - Component patterns
  - Schema patterns
  - Form validation
  - Best practices

- **[CHANGELOG.md](CHANGELOG.md)**: Track of all notable changes
  - Feature additions
  - Schema updates
  - Component implementations
  - Known issues

- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**: Design system documentation
  - Component library
  - Styling guidelines
  - UI patterns

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id       # Your Sanity project ID (find in Sanity dashboard)
NEXT_PUBLIC_SANITY_DATASET=production                # Dataset name (usually 'production' or 'development')
NEXT_PUBLIC_SANITY_API_VERSION=2025-10-06           # API version date (format: YYYY-MM-DD)

# Optional: Sanity Token (for write operations in Studio)
SANITY_API_TOKEN=your_token                          # Auth token with write permissions
```

**Variable Descriptions**:

- **`NEXT_PUBLIC_SANITY_PROJECT_ID`** (Required): Your unique Sanity project identifier. Find this in your [Sanity project dashboard](https://sanity.io/manage).

- **`NEXT_PUBLIC_SANITY_DATASET`** (Required): The dataset name within your project. Common values are `production` (for live data) or `development` (for testing). Defaults to `production` if not specified.

- **`NEXT_PUBLIC_SANITY_API_VERSION`** (Required): The API version in `YYYY-MM-DD` format. This locks your queries to a specific version of the Sanity API. Using a recent date ensures you get the latest features. Defaults to `2025-10-06`.

- **`SANITY_API_TOKEN`** (Optional): Authentication token for write operations. Only needed if you're making server-side writes to Sanity (not required for the Studio, which handles auth separately). Generate tokens in your Sanity project settings.

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and can be used in client-side code. Keep sensitive tokens (like `SANITY_API_TOKEN`) without the prefix to keep them server-side only.

## Available Scripts

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The app will automatically deploy on every push to the main branch.

### Other Platforms

The app can be deployed to any platform that supports Next.js 15:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Known Issues

### Zod v4 + @hookform/resolvers Type Compatibility

There's a known type incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2. This is resolved in the codebase using `@ts-expect-error` directives.

**Workaround**: The `@ts-expect-error` directive with documentation is used in [src/components/contact-form.tsx](src/components/contact-form.tsx).

**Tracking**: [GitHub Issue #813](https://github.com/react-hook-form/resolvers/issues/813)

**Impact**: No runtime issues, purely a TypeScript type checking problem.

## Common Issues

### TypeScript Errors After Installing Dependencies

**Problem**: TypeScript shows errors related to Zod version incompatibility

**Solution**: Restart your TypeScript server in your IDE:
- **VS Code**: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- **Other IDEs**: Restart the IDE or TypeScript language service

### Sanity Studio Not Loading

**Problem**: `/studio` route shows errors or doesn't load

**Solutions**:
1. Verify all environment variables are set correctly in `.env.local`
2. Ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` matches your Sanity project
3. Check that the dataset name exists in your Sanity project
4. Run `pnpm dev` to restart the development server

### Form Validation Not Working

**Problem**: Contact form doesn't show validation errors

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify Zod schema is imported correctly
3. Ensure React Hook Form is configured with `mode: 'onBlur'`
4. Check that shadcn/ui form components are installed: `pnpx shadcn@latest add form`

### Build Errors with Turbopack

**Problem**: Build fails with Turbopack-related errors

**Solutions**:
1. Clear build cache: `rm -rf .next`
2. Reinstall dependencies: `pnpm install`
3. Check Next.js version: should be 15.5.4+
4. Try building without Turbopack: `pnpm build --no-turbopack` (temporary)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add your license here]

## Support

For issues and questions:
- Check [CLAUDE.md](CLAUDE.md) for architectural guidance
- Review [CHANGELOG.md](CHANGELOG.md) for recent changes
- Open an issue in the repository

---

Built with ❤️ using Next.js 15, Sanity CMS, and shadcn/ui
