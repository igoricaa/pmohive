# Design System & Component Library

Design rules and conventions for PMO Hive project.

---

## 1. Design Rules (Must Follow)

**Styling**:

- ALWAYS use `cn()` utility for className merging
- Mobile-first responsive design
- Grid: 8 columns (tablet), 12 columns (desktop)
- File naming: kebab-case files, PascalCase exports

**Forms**:

- Inputs: `rounded-full`, `h-11 md:h-12.5`, `text-xs sm:text-sm`
- Borders: `border-input` (default), `border-white` (focus), `border-destructive` (error)
- Validation: Use `<FormMessage>` + `aria-invalid`

**Components**:

- Always support `className` prop
- Use CVA for variants
- Export component + variants if reusable

---

## 2. Token Reference

**Location**: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)

**Key Colors**:

- Primary: `#f09a60` (orange accent)
- Background: `oklch(1 0 0)` (white)
- Foreground: `oklch(0.145 0 0)` (near black)

**Typography** (responsive CSS variables):
| Element | Mobile | Tablet | Desktop | XL |
|---------|--------|--------|---------|-----|
| H1 | 2.5rem | 3.25rem | 4rem | 5rem |
| H2 | 2rem | 2.5rem | 3rem | 3.75rem |

**Fonts**:

- Sans: `Geist Sans` (headings) - `--font-geist-sans`
- Mono: `Geist Mono` (body) - `--font-geist-mono`

**Spacing**:

- Side padding: `--padding-side` (1rem → 1.5rem → 2rem)
- Use Tailwind default scale otherwise (0.25rem increments)

**Radius**:

- Base: `--radius` (10px)
- Buttons: `rounded-[44px]` (pill shape)

---

## 3. Component Conventions

**Base Pattern**:

```tsx
import { cn } from '@/lib/utils';

interface ComponentProps {
  className?: string;
}

const Component = ({ className }: ComponentProps) => (
  <div className={cn('base-classes responsive-classes', className)}>
    {/* content */}
  </div>
);

export default Component;
```

**shadcn/ui**:

- Config: [components.json](components.json) (New York style)
- Install: `pnpx shadcn@latest add [component]`
- Location: [src/components/ui/](src/components/ui/)

**Advanced Components** (see files for implementation):

- **AnimatedButton**: [src/components/animated-button.tsx](src/components/animated-button.tsx)
  - Link XOR Button (discriminated union)
  - Icon types: Lucide (string name), Sanity, URL
- **LetterSwapPingPong**: [src/components/fancy/text/letter-swap-pingpong-anim.tsx](src/components/fancy/text/letter-swap-pingpong-anim.tsx)
  - Letter-by-letter hover animation
  - Parent-controlled via `isParentHovered` prop
- **Link**: [src/components/motion-link.tsx](src/components/motion-link.tsx)
  - View Transitions API integration
  - Use instead of `next/link`
- **StickyHeaderWrapper**: [src/components/header/sticky-header-wrapper.tsx](src/components/header/sticky-header-wrapper.tsx)
  - Hides while scrolling, shows after 300ms pause

**Blog Components**:

- Self-contained with `useQueryState()` for URL params
- Location: [src/components/blog/](src/components/blog/)
- No props needed (URL state synced)

---

## 4. Styling Rules

**Class Merging**:

```tsx
import { cn } from '@/lib/utils';
<div className={cn('base', 'responsive', className)}>
```

**Responsive Pattern**:

```tsx
className = 'grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-4';
```

**Breakpoints**:

- `sm`: 640px
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px
- `2xl`: 1536px

**Layout**:

- Grid for pages
- Flexbox for components
- No container component (use `max-w-*`)

---

## 5. Asset Management

**Static Assets**:

- Location: `/public/`
- Reference: `<img src="/file.svg" />`

**Sanity Images**:

```typescript
import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';

<Image
  src={urlForUncropped(image).url()}
  alt={image.alt}
  width={1000}
  height={1000}
  className="w-full h-auto"
/>
```

Helpers: `urlForUncropped()`, `urlForFill()`, `urlForClip()`, `urlForWithHotspot()`

---

## 6. MCP Tool Usage

### For Library Documentation → Context7 MCP

```typescript
// 1. Resolve library ID
mcp__context7__resolve - library - id({ libraryName: 'shadcn/ui' });

// 2. Get docs
mcp__context7__get -
  library -
  docs({
    context7CompatibleLibraryID: '/shadcn/ui',
    topic: 'button component',
  });
```

Libraries: shadcn/ui, tailwindcss, lucide-react, framer-motion, react-hook-form, zod

### For Framer Motion → Motion MCP

- Spring animations: `mcp__motion__generate-css-spring`
- Bounce easing: `mcp__motion__generate-css-bounce-easing`
- Docs: Query motion MCP tools

### For Figma Designs → Figma MCP

**Workflow**:

1. Screenshot: `mcp__figma-dev-mode-mcp-server__get_screenshot(nodeId, fileKey)`
2. Metadata: `mcp__figma-dev-mode-mcp-server__get_metadata(nodeId, fileKey)`
3. Code: `mcp__figma-dev-mode-mcp-server__get_code(nodeId, fileKey, clientFrameworks: 'react')`
4. Adapt: Replace inline styles with Tailwind, add `cn()`, TypeScript types
5. Place: Determine location (ui/, sections/, components/)

---

## 7. Figma → Tailwind Mapping

| Figma     | Tailwind                       | Notes        |
| --------- | ------------------------------ | ------------ |
| Width     | `w-full`, `max-w-*`            | Semantic     |
| Height    | `h-auto`                       | Responsive   |
| Padding   | `p-4`, `px-6`                  | 4 = 1rem     |
| Gap       | `gap-2`, `gap-4`               | Flex/Grid    |
| Font Size | `text-sm`, `text-lg`           | Or h1-h6     |
| Color     | `bg-primary`, `text-white`     | Semantic     |
| Radius    | `rounded-md`, `rounded-[44px]` | Or variables |

---

## 8. Sanity Patterns

**Modular Content Blocks**:

- Use discriminated union with `_type` property for block routing
- Example: [src/app/(frontend)/case-study/[slug]/page.tsx](<src/app/(frontend)/case-study/[slug]/page.tsx>)

```typescript
switch (block._type) {
  case 'headingBlock':
    return <HeadingBlock heading={block.heading} />;
  case 'textareaBlock':
    return <TextareaBlock content={block.content} />;
  // ... more blocks
}
```

**Reusable Field Composition**:

- Define shared fields once, reuse across schemas
- Example: `headingField` used in both `headingBlock` and `textGridItem`
- Location: [src/sanity/schemaTypes/case-study/fields/](src/sanity/schemaTypes/case-study/fields/)

**Type Generation Workflow**:

```typescript
// 1. Use Sanity's auto-generated types (NOT manual interfaces)
import type { HeadingBlock } from '../../../sanity.types';

// 2. Extract nested types with indexed access
({ heading }: { heading: HeadingBlock['heading'] })

// 3. Keep GROQ queries simple - fetch entire document
export const CASE_STUDY_QUERY = defineQuery(`{
  "caseStudy": *[_type == "caseStudy" && slug.current == $slug][0]
}`);
```

**Discriminated Unions in Schemas**:

- Use conditional `hidden` + custom `validation` for XOR fields
- Example: textGridItem indicator (Number XOR Icon)

```typescript
defineField({
  name: 'number',
  hidden: ({ parent }) => parent?.indicatorType !== 'number',
  validation: (rule) =>
    rule.custom((value, context) => {
      if (context.parent?.indicatorType === 'number' && !value) {
        return 'Number is required when indicator type is "Number"';
      }
      return true;
    }),
});
```

---

## 9. Quick Lookup

**Key Files**:

- Tokens: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)
- Utils: [src/lib/utils.ts](src/lib/utils.ts) (`cn()`)
- Config: [components.json](components.json)
- Patterns: [CLAUDE.md](CLAUDE.md)

**Commands**:

```bash
pnpm dev                        # Dev server
pnpm build                      # Production
pnpx shadcn@latest add button   # Add component
pnpx sanity@latest typegen      # Generate types
```

**Common Imports**:

```typescript
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from '@/components/motion-link';
import { urlForUncropped } from '@/sanity/lib/image';
import { useQueryState, parseAsString } from 'nuqs';
import { motion } from 'motion/react';
```

**Common Patterns**:

```tsx
// Grid
<div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4">

// URL State
const [search, setSearch] = useQueryState('search', parseAsString.withDefault(''));

// Button
<Button><ArrowRight /></Button>

// Sanity Image
<Image src={urlForUncropped(image).url()} alt={image.alt} width={1000} height={1000} />
```

---

**Version**: 1.1.0 (Next.js 16)
**Last Updated**: 2025-10-23
