# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application integrated with Sanity CMS. The project uses:

- **Next.js 15.5.4** with App Router and Turbopack
- **React 19**
- **Sanity CMS** for content management with Studio mounted at `/studio`
- **Tailwind CSS v4** for styling
- **shadcn/ui** components (New York style)
- **TypeScript** with strict mode enabled
- **pnpm** as package manager
- **React Query (TanStack Query v5)** for server state management
- **nuqs** for URL state management
- **React Hook Form v7.65.0** for form handling
- **Zod v4.1.11** for schema validation

## Commands

**IMPORTANT**: This project uses **pnpm** as the package manager. Always use:

- `pnpm` instead of `npm`
- `pnpx` instead of `npx`

### Development

```bash
pnpm dev           # Start dev server with Turbopack
pnpm build         # Build for production with Turbopack
pnpm start         # Start production server
```

### Sanity Studio

The Sanity Studio is accessible at `/studio` route when the dev server is running. Configuration is in [sanity.config.ts](sanity.config.ts).

### Sanity Type Generation

```bash
pnpx sanity@latest schema extract --enforce-required-fields  # Extract schema
pnpx sanity@latest typegen generate                          # Generate TypeScript types
```

## Architecture

### Directory Structure

- **[src/app/](src/app/)** - Next.js App Router pages and layouts
  - [studio/[[...tool]]/](src/app/studio/[[...tool]]/) - Sanity Studio catch-all route
  - [api/blog/](src/app/api/blog/) - Blog API routes
- **[src/sanity/](src/sanity/)** - All Sanity CMS related code
  - [schemaTypes/](src/sanity/schemaTypes/) - Content type definitions
    - [pages/](src/sanity/schemaTypes/pages/) - Page-specific schemas (home, about-us, etc.)
    - [posts/](src/sanity/schemaTypes/posts/) - Blog post schemas (post, postCategory)
  - [lib/](src/sanity/lib/) - Sanity utilities
    - [client.ts](src/sanity/lib/client.ts) - Sanity client and `sanityFetch` wrapper
    - [queries.ts](src/sanity/lib/queries.ts) - GROQ queries
    - [image.ts](src/sanity/lib/image.ts) - Image URL builder
  - [env.ts](src/sanity/env.ts) - Environment variable configuration
  - [structure.ts](src/sanity/structure.ts) - Studio structure configuration
- **[src/components/](src/components/)** - React components
  - [ui/](src/components/ui/) - shadcn/ui components
  - [blog/](src/components/blog/) - Blog-specific components
  - [sections/](src/components/sections/) - Page section components
  - [contact-form.tsx](src/components/contact-form.tsx) - Contact form component
- **[src/providers/](src/providers/)** - React context providers
  - [query-provider.tsx](src/providers/query-provider.tsx) - React Query provider
- **[src/hooks/](src/hooks/)** - Custom React hooks
  - [use-blog-posts.ts](src/hooks/use-blog-posts.ts) - Blog posts React Query hook
  - [use-post-categories.ts](src/hooks/use-post-categories.ts) - Categories React Query hook
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

## Blog System Architecture

### Sanity Schemas

**Post Categories** ([src/sanity/schemaTypes/posts/postCategoryType.ts](src/sanity/schemaTypes/posts/postCategoryType.ts)):
- Document type: `postCategory`
- Fields: `name` (string), `slug` (slug)
- Used for categorizing blog posts

**Blog Posts** ([src/sanity/schemaTypes/posts/index.ts](src/sanity/schemaTypes/posts/index.ts)):
- Document type: `post`
- Required category reference field
- Relationship: Each post must have one category
- Creating posts: Can select existing category or create new one in Sanity Studio

### GROQ Queries

**Blog Post Queries** ([src/sanity/lib/queries.ts](src/sanity/lib/queries.ts)):
- `BLOG_POSTS_QUERY` - Descending date sort (newest first)
- `BLOG_POSTS_QUERY_ASC` - Ascending date sort (oldest first)
- Features:
  - Search filtering by title (partial match with `*`)
  - Category filtering by reference ID
  - Limited to 12 posts `[0...11]`
  - Populates category data via `category->{...}`
- Parameters: `$search` (string|null), `$category` (string|null)

**Server Functions**:
- `getInitialBlogPosts()` - Fetches first 12 posts (no filters)
- `getAllPostCategories()` - Fetches all categories (sorted by name)

### API Routes

**Blog Posts Endpoint** ([src/app/api/blog/posts/route.ts](src/app/api/blog/posts/route.ts)):
- Path: `/api/blog/posts`
- Method: GET
- Query params: `search`, `category`, `sort`
- Returns: Filtered and sorted blog posts
- Uses raw Sanity `client.fetch()` (not `sanityFetch`)
- Note: Passes `null` (not `undefined`) for empty params to satisfy GROQ

### Caching Strategy

**Hybrid Approach**:
1. **Categories** (Static Data):
   - Fetched server-side only with `sanityFetch`
   - Leverages Next.js cache (12hr revalidation)
   - Prefetched via React Query and hydrated to client
   - No client-side API calls
   - Revalidate with `revalidateTag('postCategory')`

2. **Posts** (Dynamic Data):
   - Initial 12 posts prefetched server-side
   - Subsequent filtering via client-side API calls
   - Dynamic based on search/category/sort params

## Data Fetching & State Management

### React Query (TanStack Query v5)

**Provider Setup** ([src/providers/query-provider.tsx](src/providers/query-provider.tsx)):
- Client-side QueryClient configuration
- Default options:
  - `staleTime: Infinity` - Data never considered stale
  - `gcTime: 10 * 60 * 1000` - 10 minutes garbage collection
  - `retry: 1` - Single retry on failure
  - All refetch options disabled by default
- Wrapped in app layout with `<QueryProvider>`

### Server-Side Prefetching Pattern

**TanStack Official Pattern** - Used in [src/app/(frontend)/blog/page.tsx](src/app/(frontend)/blog/page.tsx):

```typescript
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function Blog() {
  // Create server-side QueryClient
  const queryClient = new QueryClient();

  // Prefetch data during SSR
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['blog-posts', '', '', 'desc'],
      queryFn: getInitialBlogPosts,
    }),
    queryClient.prefetchQuery({
      queryKey: ['post-categories'],
      queryFn: getAllPostCategories,
    }),
  ]);

  // Dehydrate and pass to client
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Client components read from hydrated cache */}
    </HydrationBoundary>
  );
}
```

**Three QueryClient Instances**:
1. Server-side (in async page component) - For prefetching
2. Client-side main (in QueryProvider) - For app-wide queries
3. Hydration bridge (HydrationBoundary) - Transfers server → client

### URL State Management with nuqs

**Installation**: `nuqs` package with Next.js App Router adapter

**Setup** ([src/app/(frontend)/layout.tsx](src/app/(frontend)/layout.tsx)):
```typescript
import { NuqsAdapter } from 'nuqs/adapters/next/app';

<QueryProvider>
  <NuqsAdapter>
    {children}
  </NuqsAdapter>
</QueryProvider>
```

**Usage Pattern**:
```typescript
import { useQueryState, parseAsString } from 'nuqs';

const [search, setSearch] = useQueryState(
  'search',
  parseAsString.withDefault('').withOptions({ history: 'push' })
);
```

**Benefits**:
- Type-safe URL search params
- Browser history integration
- Shareable URLs
- Back button support
- Self-contained components (no prop drilling)

### Custom Hooks

**Blog Posts Hook** ([src/hooks/use-blog-posts.ts](src/hooks/use-blog-posts.ts)):
- Fetches posts from `/api/blog/posts`
- Parameters: `search`, `categoryId`, `sortOrder`
- Query key includes all params for proper caching
- Returns: `{ data, isLoading, error }`

**Post Categories Hook** ([src/hooks/use-post-categories.ts](src/hooks/use-post-categories.ts)):
- Returns server-hydrated categories (no fetch)
- `queryFn` returns empty array (should never execute)
- Configuration: `staleTime: Infinity`, `gcTime: Infinity`, all refetch disabled
- Only reads from React Query cache

### Debouncing Pattern

**Search Input Debouncing** ([src/components/blog/search-input.tsx](src/components/blog/search-input.tsx)):
```typescript
import { debounce } from 'nuqs';

<Input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value === '' ? undefined : debounce(500),
    })
  }
/>
```

- 500ms delay before URL update (and subsequent query)
- Instant clear when input is empty
- Prevents excessive API calls during typing

## Component Patterns

### Self-Contained Components

Blog components manage their own state via `useQueryState`:

```typescript
// SearchInput.tsx
const [search, setSearch] = useQueryState('search', ...);

// CategoryFilter.tsx
const [category, setCategory] = useQueryState('category', ...);

// SortSelect.tsx
const [sort, setSort] = useQueryState('sort', ...);

// PostsGrid.tsx
const [search] = useQueryState('search', ...);
const [category] = useQueryState('category', ...);
const [sort] = useQueryState('sort', ...);
const { data: posts } = useBlogPosts(search, categoryId, sort);
```

No props needed - components read/write directly to URL state.

## Forms & Validation

### React Hook Form with Zod v4

**Installation**:
```bash
pnpx shadcn@latest add form label textarea radio-group
pnpm add react-hook-form @hookform/resolvers zod
```

**Contact Form Implementation** ([src/components/contact-form.tsx](src/components/contact-form.tsx)):

**Schema Definition (Zod v4 syntax)**:
```typescript
import * as z from 'zod';

const contactFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select your country'),
  interest: z.enum(['introduction-to-pmo', 'data-center-potentials'], {
    error: 'Please select an area of interest',  // Zod v4 syntax
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;
```

**Form Setup**:
```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const form = useForm<ContactFormValues>({
  // @ts-expect-error - Known type incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2
  // See: https://github.com/react-hook-form/resolvers/issues/813
  resolver: zodResolver(contactFormSchema),
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    interest: undefined,
    message: '',
  },
  mode: 'onBlur',
});
```

**Form Fields**:
- **Text Inputs**: First Name, Last Name, Email
- **Select Dropdown**: Country (195 countries)
- **Radio Group**: Interest selection (2 options)
- **Textarea**: Message field

**Form Features**:
- ✅ Zod v4 schema validation
- ✅ Real-time validation on blur
- ✅ Loading states during submission
- ✅ Form reset after successful submission
- ✅ Disabled inputs while submitting
- ✅ Accessible with proper ARIA attributes
- ✅ Responsive grid layout (2 columns for name fields on desktop)

**Known Issue - Zod v4 Compatibility**:

The `@ts-expect-error` directive is necessary due to a known type incompatibility between Zod v4 and `@hookform/resolvers` v5.2.2. This is tracked in [GitHub issue #813](https://github.com/react-hook-form/resolvers/issues/813).

**Zod v4 Syntax Changes**:
- ❌ **Zod v3**: `z.enum([...], { required_error: "..." })`
- ✅ **Zod v4**: `z.enum([...], { error: "..." })`

The `required_error` parameter has been replaced with the unified `error` parameter in Zod v4.

**Integration Example**:

```typescript
// In page component
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <main>
      <ContactForm />
    </main>
  );
}
```

## Sanity CMS Schema Patterns

### Reusable Schema Types

**Subtitle Type** ([src/sanity/schemaTypes/subtitleType.ts](src/sanity/schemaTypes/subtitleType.ts)):

A reusable schema type for subtitles with optional highlighted text:

```typescript
import { defineField, defineType } from 'sanity';

export const subtitleType = defineType({
  name: 'subtitle',
  title: 'Subtitle',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required().error('Text is required'),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    }),
  ],
});
```

**Usage in Other Schemas**:
```typescript
defineField({
  name: 'subtitle',
  title: 'Subtitle',
  type: 'subtitle',  // Reference the reusable type
  validation: (rule) => rule.required().error('Subtitle is required'),
})
```

**Schemas Using Subtitle Type**:
- [contactPageType.ts](src/sanity/schemaTypes/pages/contactPageType.ts)
- [postType.ts](src/sanity/schemaTypes/posts/index.ts)
- [blogSectionType.ts](src/sanity/schemaTypes/pages/home/blogSectionType.ts)
- [teamSectionType.ts](src/sanity/schemaTypes/pages/home/teamSectionType.ts)
- [heroSectionType.ts](src/sanity/schemaTypes/pages/home/heroSectionType.ts)
- [pmoPromoSectionType.ts](src/sanity/schemaTypes/pages/home/pmoPromoSectionType.ts)
- [aboutSectionType.ts](src/sanity/schemaTypes/pages/home/aboutSectionType.ts)

### Contact Page Schema

**Contact Page Type** ([src/sanity/schemaTypes/pages/contactPageType.ts](src/sanity/schemaTypes/pages/contactPageType.ts)):

```typescript
import { defineField, defineType } from 'sanity';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      type: 'subtitle',  // Uses reusable subtitle type
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'blockContent',  // Rich text editor
      validation: (rule) => rule.required(),
    }),
  ],
});
```

**Fields**:
- `subtitle` (subtitle type): Text + optional highlighted text
- `heading` (string): Main page heading
- `description` (blockContent): Rich text description

**Querying Contact Page Data**:

```typescript
// In src/sanity/lib/queries.ts
export const CONTACT_PAGE_QUERY = defineQuery(`{
  "contactPage": *[_type == "contactPage"][0] {
    subtitle {
      text,
      highlightedText
    },
    heading,
    description[]
  }
}`);

export const getContactPageData = async () => {
  return await sanityFetch({
    query: CONTACT_PAGE_QUERY,
    tags: ['contact-page-data'],
  });
};
```

### Schema Best Practices

1. **Extract Reusable Types**: When a field pattern repeats across schemas (like `subtitle`), extract it into a separate type definition
2. **Use Validation**: Always add appropriate validation rules with custom error messages
3. **Document Field Descriptions**: Add descriptions to help content editors understand field purposes
4. **Group Related Fields**: Use `groups` to organize complex schemas (see [aboutPageType.ts](src/sanity/schemaTypes/pages/aboutPageType.ts))
5. **Export All Types**: Always export new types through [src/sanity/schemaTypes/index.ts](src/sanity/schemaTypes/index.ts)

## Troubleshooting

### Zod v4 + @hookform/resolvers Compatibility

**Issue**: TypeScript type errors when using Zod v4 with @hookform/resolvers

**Error Message**:
```
Type '1' is not assignable to type '0' (_zod.version.minor incompatibility)
Argument of type 'ZodObject<...>' is not assignable to parameter of type 'Zod3Type<...>'
```

**Root Cause**:
- Zod v4.1.11 has breaking type changes from v3
- `@hookform/resolvers` v5.2.2 type definitions expect Zod v3 structure
- No runtime issues, purely TypeScript type checking problem
- Tracked in [GitHub issue #813](https://github.com/react-hook-form/resolvers/issues/813)

**Solution**:
Use `@ts-expect-error` directive with documentation:

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const form = useForm<ContactFormValues>({
  // @ts-expect-error - Known type incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2
  // See: https://github.com/react-hook-form/resolvers/issues/813
  resolver: zodResolver(contactFormSchema),
  defaultValues: { /* ... */ },
});
```

**Why This Works**:
- Suppresses the specific type error only
- Runtime behavior unaffected (libraries work perfectly)
- Self-documenting with GitHub issue reference
- Future-proof: Will error if issue is fixed (prompting cleanup)
- More explicit than `as any` type assertion

**Alternative Solutions** (not recommended):
1. Downgrade to `@hookform/resolvers` v5.2.0
2. Downgrade to Zod v3 (lose new features)
3. Enable `skipLibCheck` in tsconfig.json (hides all library type errors)
4. Use manual validation instead of zodResolver

**Zod v4 Syntax Changes**:

When migrating from Zod v3 to v4, update enum error syntax:

```typescript
// ❌ Zod v3 syntax (will not work in v4)
z.enum(['option1', 'option2'], {
  required_error: 'Please select an option'
})

// ✅ Zod v4 syntax (correct)
z.enum(['option1', 'option2'], {
  error: 'Please select an option'
})
```

The `required_error` parameter was replaced with the unified `error` parameter in Zod v4.
