# Design System Rules for Figma Integration

This document provides comprehensive guidelines for integrating Figma designs into the PMO Hive codebase using the Model Context Protocol (MCP).

---

## 1. Design Token Definitions

### Color Tokens

**Location**: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>) (lines 47-94)

**Format**: CSS Custom Properties using OKLCH color space

```css
:root {
  /* Brand Colors */
  --color-primary: #f09a60; /* Orange accent */
  --color-light-grey: #e9e9e9;

  /* Semantic Colors (OKLCH format) */
  --background: oklch(1 0 0); /* White */
  --foreground: oklch(0.145 0 0); /* Near black */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Chart Colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  /* ... etc */
}
```

**Usage in Tailwind v4**: Tokens are mapped via `@theme inline` directive (lines 4-45)

```css
@theme inline {
  --color-primary: #f09a60;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}
```

**Utility Classes**:

- `.highlight` - Applies primary color (`var(--color-primary)`)
- Background: `bg-black`, `bg-primary`
- Text: `text-white`, `text-black`, `text-primary`

### Typography Tokens

**Location**: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>) (lines 49-132)

**Responsive Scale**: Mobile-first with breakpoint overrides

```css
:root {
  /* SM Mobile (default) */
  --h1-font-size: 2.5rem; /* 40px */
  --h1-line-height: 1;

  /* MD Tablet (768px+) */
  @media (min-width: 768px) {
    --h1-font-size: 3.25rem; /* 52px */
  }

  /* LG Desktop (1024px+) */
  @media (min-width: 1024px) {
    --h1-font-size: 4rem; /* 64px */
    --h1-line-height: 0.912;
  }

  /* XL Desktop (1920px+) */
  @media (min-width: 1920px) {
    --h1-font-size: 5rem; /* 80px */
  }
}
```

**Font Families**:

- **Sans**: `Geist Sans` - Used for headings (variable: `--font-geist-sans`)
- **Mono**: `Geist Mono` - Default body font (variable: `--font-geist-mono`)

**Implementation**: [src/app/(frontend)/layout.tsx](<src/app/(frontend)/layout.tsx>)

```tsx
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
```

**Typography Styles**: All headings (h1-h6) have predefined responsive styles (lines 144-190)

### Spacing Tokens

**Location**: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)

```css
:root {
  --padding-side: 1rem; /* SM Mobile */

  @media (min-width: 768px) {
    --padding-side: 1.5rem; /* MD Tablet */
  }

  @media (min-width: 1024px) {
    --padding-side: 2rem; /* LG Desktop */
  }
}
```

**Tailwind Standard Scale**: Use Tailwind's default spacing (0.25rem increments)

- `gap-2`, `gap-3`, `gap-4`, `mt-2`, `mt-3`, `mt-4`, etc.

### Border Radius Tokens

```css
:root {
  --radius: 0.625rem; /* 10px base */
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px); /* 6px */
  --radius-md: calc(var(--radius) - 2px); /* 8px */
  --radius-lg: var(--radius); /* 10px */
  --radius-xl: calc(var(--radius) + 4px); /* 14px */
}
```

**Component Usage**:

- Buttons: `rounded-[44px]` (pill shape)
- Cards/General: Use `--radius-*` variables

---

## 2. Component Library

### Component Location Structure

```
src/components/
├── ui/                          # shadcn/ui components
│   ├── button.tsx              # Core button component
│   └── carousel.tsx            # Carousel component (Embla-based)
├── sections/                    # Page section components
│   └── home/
│       ├── hero-section.tsx
│       ├── about-section.tsx
│       └── stat-card.tsx
├── header.tsx                   # Layout components
├── footer.tsx
├── menuLink.tsx                 # Navigation components
├── lenis.tsx                    # Third-party wrappers
├── portable-text.tsx            # CMS content renderers
└── text-gradient-scroll.tsx     # Custom UI components
```

### Component Architecture Pattern

**Base Pattern**: Functional components with TypeScript interfaces

```tsx
// Example: src/components/sections/home/hero-section.tsx
interface HeroSectionProps {
  subtitle: {
    text: string;
    highlightedText: string;
  };
  heading: string;
  description: string;
  buttons: Array<{
    text: string;
    hightlightedText?: string;
    link: string;
  }>;
  images: {
    image1: SanityImageSource & { alt: string };
    image2: SanityImageSource & { alt: string };
    // ...
  };
}

const HeroSection = ({
  subtitle,
  heading,
  description,
  buttons,
  images,
}: HeroSectionProps) => {
  return <section>{/* Component JSX */}</section>;
};

export default HeroSection;
```

### shadcn/ui Component Pattern

**Configuration**: [components.json](components.json)

- Style: `new-york`
- Base color: `neutral`
- CSS Variables: Enabled
- Icon library: `lucide-react`

**Button Component Example**: [src/components/ui/button.tsx](src/components/ui/button.tsx)

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      default: 'bg-black text-white border-1 border-white/40',
      secondary: 'bg-primary text-black border-1 border-black/40',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-12 px-6 xl:px-7',
      sm: 'h-8 rounded-md gap-1.5 px-3',
      lg: 'h-10 rounded-md px-6',
      icon: 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
```

**Key Patterns**:

1. Use `class-variance-authority` for variant management
2. Use `cn()` utility for class merging (from [src/lib/utils.ts](src/lib/utils.ts))
3. Support `asChild` prop via `@radix-ui/react-slot`
4. Export both component and variants for external usage

### Carousel Component

**Location**: [src/components/ui/carousel.tsx](src/components/ui/carousel.tsx)

**Underlying Library**: `embla-carousel-react` v8.6.0

**Usage Pattern**:

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

<Carousel opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>Item 1</CarouselItem>
    <CarouselItem>Item 2</CarouselItem>
    <CarouselItem>Item 3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>;
```

**Key Features**:

- Horizontal/vertical orientation support
- Keyboard navigation (Arrow keys)
- Accessible (ARIA roles)
- Embla carousel options via `opts` prop
- Plugin support via `plugins` prop
- Built-in Previous/Next buttons with ArrowLeft/ArrowRight icons

**Common Options**:

```tsx
opts={{
  loop: true,           // Enable infinite loop
  align: "start",       // Alignment: start | center | end
  slidesToScroll: 1,    // Number of slides to scroll
}}
```

**Custom Styling**:

- Use `className` prop on any component
- Navigation buttons positioned absolutely by default
- Override button variants: `variant` and `size` props

**Standard Practice**: Use this carousel component for ALL carousel implementations in the project.

### Component Documentation

**Currently**: No Storybook or component documentation
**Future**: Consider adding Storybook for component catalog

---

## 3. Frameworks & Libraries

### Core Stack

**Framework**: Next.js 15.5.4

- App Router architecture
- React Server Components (RSC) enabled
- Turbopack for dev/build

**React**: 19.1.0

- React Compiler enabled (`babel-plugin-react-compiler`)

**TypeScript**: v5

- Strict mode enabled
- Path alias: `@/*` → `src/*`

### Styling Stack

**Primary**: Tailwind CSS v4

- PostCSS integration: `@tailwindcss/postcss`
- Utility-first CSS
- Custom `@theme inline` directive

**CSS Methodology**: Utility-first with CSS variables

- No CSS Modules
- No Styled Components for styling (installed but not used)
- Global styles in [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)

**Utility Libraries**:

- `clsx` - Conditional class names
- `tailwind-merge` - Merge Tailwind classes without conflicts
- `class-variance-authority` (CVA) - Component variants

**Animation & Interaction**:

- `tw-animate-css` - Tailwind animation utilities
- `motion` (Framer Motion) - Advanced animations
- `lenis` - Smooth scrolling
- `embla-carousel-react` - Carousel functionality (via shadcn/ui carousel component)

### UI Component Libraries

**shadcn/ui**: Component collection (New York style)

- Install: `pnpx shadcn@latest add [component]`
- Components stored in `src/components/ui/`

**Radix UI**: Headless UI primitives

- `@radix-ui/react-slot` - Composition primitive

**Icons**: `lucide-react`

- Import pattern: `import { IconName } from 'lucide-react'`

### Build System

**Package Manager**: **pnpm** (REQUIRED)

- Use `pnpm` instead of `npm`
- Use `pnpx` instead of `npx`

**Commands**:

```bash
pnpm dev           # Turbopack dev server
pnpm build         # Production build with Turbopack
pnpm start         # Production server
```

## 4. Asset Management

### Static Assets

**Location**: `/public/`

**Current Assets**:

- `/public/hexagonal-pattern.svg` - Background pattern
- `/public/burger.svg` - Menu icon

**Reference Pattern**: Absolute path from public root

```tsx
// In JSX
<img src='/hexagonal-pattern.svg' alt='Pattern' />
```

### CMS Images (Sanity)

**Location**: [src/sanity/lib/image.ts](src/sanity/lib/image.ts)

**Image URL Builder Utilities**:

```typescript
import {
  urlFor,
  urlForUncropped,
  urlForFill,
  urlForClip,
  urlForWithHotspot,
} from '@/sanity/lib/image';

// Uncropped with auto format
urlForUncropped(image).url();

// Fill to dimensions
urlForFill(image, 800, 600).url();

// Clip to dimensions
urlForClip(image, 800, 600).url();

// Crop with hotspot
urlForWithHotspot(image, 800, 600).url();
```

**Next.js Image Integration**:

```tsx
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';

<Image
  src={urlForUncropped(images.image1).url()}
  alt={images.image1.alt}
  width={1000}
  height={1000}
  className='w-full h-auto object-cover'
/>;
```

**Best Practices**:

1. Always provide `alt` text from CMS
2. Use `width`/`height` for aspect ratio
3. Use Tailwind classes for sizing (`w-full`, `h-auto`)
4. Auto format enabled for optimization

### Asset Optimization

**Techniques**:

- Sanity CDN automatic image optimization
- `auto('format')` - Serves WebP/AVIF when supported
- `fit()` methods - Cropping strategies
- Next.js Image component - Lazy loading, srcset generation

**CDN**: Sanity's built-in CDN (configured via env vars)

---

## 5. Icon System

### Icon Library

**Primary**: `lucide-react` v0.544.0

**Storage**: npm package (not local files)

**Import Pattern**:

```tsx
import { ArrowRight, Menu, X, Github } from 'lucide-react';

// Usage
<ArrowRight className='size-4' />;
```

### Icon Usage in Components

**Button Example**: [src/components/ui/button.tsx](src/components/ui/button.tsx)

```tsx
// SVG sizing handled automatically
const buttonVariants = cva(
  "[&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0"
  // ...
);

// Usage
<Button>
  Click me <ArrowRight />
</Button>;
```

**Sizing Classes**:

- `size-4` (16px) - Default in buttons
- `size-5` (20px)
- `size-6` (24px)
- `size-8` (32px)

### Icon Naming Convention

**Pattern**: PascalCase matching Lucide's naming

- `ArrowRight`, `Menu`, `X`, `Github`, `ChevronDown`, etc.

**Finding Icons**: Use Context7 MCP to query lucide-react documentation

---

## 6. Styling Approach

### CSS Methodology

**Primary**: Tailwind Utility-First

**Global Styles**: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)

```css
@layer base {
  * {
    @apply font-mono;
  }
  body {
    @apply bg-black text-white;
  }

  /* Responsive Typography - H Tags */
  h1 {
    font-family: var(--font-geist-sans);
    font-size: var(--h1-font-size);
    line-height: var(--h1-line-height);
    letter-spacing: 0;
    font-weight: 700;
  }
  /* ... h2-h6 */
}
```

**Custom Utilities**:

```css
.highlight {
  color: var(--color-primary);
}
```

### Component Styling Pattern

**Recommended Approach**:

```tsx
import { cn } from '@/lib/utils';

const Component = ({ className, ...props }: Props) => {
  return (
    <div className={cn('base-classes', 'responsive-classes', className)}>
      {/* Content */}
    </div>
  );
};
```

**Class Merging**: Always use `cn()` utility from [src/lib/utils.ts](src/lib/utils.ts)

```typescript
import { clsx, type ClassValue } from "clsx"
import { tailwind-merge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Responsive Design Implementation

**Breakpoints** (Tailwind defaults):

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- Custom: `1920px` for XL typography scaling

**Mobile-First Pattern**:

```tsx
<div className="
  grid grid-cols-1           {/* Mobile: 1 column */}
  md:grid-cols-8             {/* Tablet: 8 columns */}
  lg:grid-cols-12            {/* Desktop: 12 columns */}
  gap-2 md:gap-4             {/* Responsive gaps */}
">
```

**Responsive Typography**:

- Use CSS variables that change per breakpoint
- Or Tailwind responsive classes: `text-sm md:text-base lg:text-lg`

**Responsive Spacing**:

```tsx
<div className="
  mt-3 xl:mt-4               {/* Responsive margin */}
  px-4 md:px-6 lg:px-8       {/* Responsive padding */}
">
```

### Layout System

**Grid**: Preferred for page layouts

```tsx
<section className='grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4'>
  <div className='md:col-span-4 lg:col-span-5'>...</div>
  <div className='md:col-span-4 lg:col-span-7'>...</div>
</section>
```

**Flexbox**: Used for component-level layouts

```tsx
<div className="flex gap-3 items-center justify-between">
```

**Container**: No explicit container component

- Use `max-w-*` utilities directly
- Example: `max-w-xl`, `max-w-7xl`

---

## 7. Project Structure

### Directory Architecture

```
pmohive/
├── public/                      # Static assets
│   ├── hexagonal-pattern.svg
│   └── burger.svg
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (frontend)/          # Route group: frontend routes
│   │   │   ├── (home)/          # Nested route group: home page
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx       # Frontend layout
│   │   │   └── globals.css      # Global styles
│   │   └── studio/              # Sanity Studio route
│   │       └── [[...tool]]/
│   │           └── page.tsx
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── carousel.tsx    # Embla-based carousel
│   │   ├── sections/            # Page section components
│   │   │   └── home/
│   │   │       ├── hero-section.tsx
│   │   │       ├── about-section.tsx
│   │   │       └── stat-card.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── menuLink.tsx
│   │   ├── lenis.tsx            # Smooth scroll wrapper
│   │   ├── portable-text.tsx    # Sanity PortableText renderer
│   │   └── text-gradient-scroll.tsx # Custom UI components
│   ├── lib/                     # Shared utilities
│   │   └── utils.ts             # cn() helper
│   └── sanity/                  # Sanity CMS code
│       ├── schemaTypes/         # Content schemas
│       │   ├── pages/
│       │   ├── posts/
│       │   └── index.ts
│       ├── lib/
│       │   ├── client.ts        # Sanity client
│       │   ├── queries.ts       # GROQ queries
│       │   └── image.ts         # Image URL builders
│       ���── env.ts               # Environment validation
│       └── structure.ts         # Studio structure
├── components.json              # shadcn/ui config
├── package.json
├── tsconfig.json
├── CLAUDE.md                    # AI assistant instructions
└── DESIGN_SYSTEM.md             # This file
```

### Feature Organization Pattern

**Page-Specific Components**: Organized by route

```
src/components/sections/
└── home/                        # Home page sections
    ├── hero-section.tsx
    ├── about-section.tsx
    └── stat-card.tsx
```

**Shared Components**: Top-level `src/components/`

- Layout: `header.tsx`, `footer.tsx`
- Navigation: `menuLink.tsx`
- Wrappers: `lenis.tsx`
- Custom UI: `text-gradient-scroll.tsx`

**UI Components**: `src/components/ui/`

- shadcn/ui components
- Custom reusable UI elements

### Path Aliases

**Primary Alias**: `@/*` → `src/*`

**Configured in**:

- [tsconfig.json](tsconfig.json): TypeScript resolution
- [components.json](components.json): shadcn/ui paths

**shadcn/ui Aliases**:

```json
{
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

**Usage Examples**:

```typescript
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Header from '@/components/header';
import { sanityFetch } from '@/sanity/lib/client';
import TextGradientScroll from '@/components/text-gradient-scroll';
```

### File Naming Conventions

**Components**: kebab-case

- `hero-section.tsx`, `stat-card.tsx`, `text-gradient-scroll.tsx`

**Utilities**: kebab-case

- `utils.ts`, `image.ts`, `client.ts`

**React Components**: PascalCase export names

- `export default HeroSection`

---

## 8. Figma-to-Code Integration Guidelines

### When Importing Figma Designs

#### 1. **Extract Design Tokens First**

**Colors**:

- Add to `:root` in [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)
- Use OKLCH format for semantic colors
- Use hex for brand colors
- Add to `@theme inline` for Tailwind access

**Typography**:

- Update responsive CSS variables if scales differ
- Use `--h1-font-size` pattern for consistency
- Maintain mobile-first responsive breakpoints

**Spacing**:

- Prefer Tailwind's default scale (0.25rem increments)
- Add custom variables only if truly unique

#### 2. **Component Creation Process**

**Step 1: Analyze Component Complexity**

- Simple UI element → `src/components/ui/`
- Page section → `src/components/sections/{page}/`
- Custom reusable UI → `src/components/`
- Layout element → `src/components/`

**Step 2: Create TypeScript Interface**

```tsx
interface ComponentNameProps {
  // Define all props with proper types
  heading: string;
  description?: string;
  items: Array<{ title: string; value: number }>;
}
```

**Step 3: Build Component with Utilities**

```tsx
import { cn } from '@/lib/utils';

const ComponentName = ({ className, ...props }: ComponentNameProps) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  );
};

export default ComponentName;
```

**Step 4: Use CVA for Variants (if needed)**

```tsx
import { cva } from 'class-variance-authority';

const componentVariants = cva('base-classes', {
  variants: {
    size: { sm: '...', lg: '...' },
    variant: { primary: '...', secondary: '...' },
  },
  defaultVariants: { size: 'sm', variant: 'primary' },
});
```

#### 3. **Styling Translation**

**Figma → Tailwind Mapping**:

| Figma Property | Tailwind Class                         | Notes                              |
| -------------- | -------------------------------------- | ---------------------------------- |
| Width          | `w-[value]`, `w-full`, `max-w-*`       | Use semantic classes when possible |
| Height         | `h-[value]`, `h-auto`                  | Prefer `h-auto` for responsive     |
| Padding        | `p-4`, `px-6`, `py-3`                  | Use scale: 4 = 1rem                |
| Margin         | `m-4`, `mt-3`, `mb-6`                  | Use scale: 4 = 1rem                |
| Gap            | `gap-2`, `gap-4`                       | For flex/grid                      |
| Font Size      | `text-sm`, `text-base`, `text-lg`      | Or use h1-h6 for headings          |
| Font Weight    | `font-medium`, `font-bold`             |                                    |
| Color          | `text-white`, `bg-black`, `bg-primary` | Use semantic names                 |
| Border Radius  | `rounded-md`, `rounded-[44px]`         | Or use --radius-\*                 |
| Opacity        | `opacity-50`, `bg-white/40`            | Prefer alpha notation              |

**Responsive Breakpoints**:

```
Mobile:  Base classes (no prefix)
Tablet:  md: (768px)
Desktop: lg: (1024px)
Large:   xl: (1280px)
XL:      2xl: (1536px)
```

#### 4. **Image Handling**

**Static Images**:

1. Export from Figma → Place in `/public/`
2. Reference: `<img src="/image-name.svg" alt="..." />`

**CMS Images**:

1. Upload to Sanity
2. Use `urlForUncropped()` or appropriate helper
3. Wrap in `next-sanity/image` component

```tsx
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';

<Image
  src={urlForUncropped(image).url()}
  alt={image.alt}
  width={1000}
  height={1000}
  className='w-full h-auto'
/>;
```

#### 5. **Grid Layout Translation**

Figma Auto Layout → Tailwind Grid/Flex

```tsx
// Figma: Horizontal Auto Layout
<div className="flex gap-4 items-center">

// Figma: Vertical Auto Layout
<div className="flex flex-col gap-2">

// Figma: Grid (8 columns on tablet, 12 on desktop)
<div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-4">
  <div className="md:col-span-4 lg:col-span-6">...</div>
</div>
```

#### 6. **Animation & Interaction**

**Hover States**:

```tsx
<button className="hover:bg-primary hover:text-black transition-all">
```

**Advanced Animations**:

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
```

**Scroll Effects**: Use `lenis` for smooth scrolling (already configured)

#### 7. **Code Quality Checklist**

Before committing:

- [ ] Verify TypeScript types (no `any`)
- [ ] Ensure responsive behavior on all breakpoints
- [ ] Test with actual CMS data (if applicable)
- [ ] Verify accessibility (alt text, ARIA labels)

---

## 9. MCP Figma Integration Workflow

### Recommended Process

1. **Get Figma Node**:

   ```
   Use mcp__figma-dev-mode-mcp-server__get_screenshot
   Parameters: { nodeId: "1:2", fileKey: "abc123" }
   ```

2. **Extract Metadata** (structure overview):

   ```
   Use mcp__figma-dev-mode-mcp-server__get_metadata
   Parameters: { nodeId: "1:2", fileKey: "abc123" }
   ```

3. **Generate Code**:

   ```
   Use mcp__figma-dev-mode-mcp-server__get_code
   Parameters: {
     nodeId: "1:2",
     fileKey: "abc123",
     clientFrameworks: "react",
     clientLanguages: "typescript"
   }
   ```

4. **Adapt Generated Code**:
   - Replace inline styles with Tailwind classes
   - Extract colors/fonts to design tokens (if new)
   - Convert to component pattern (interface + export)
   - Add `cn()` for class merging
   - Import required utilities/components
   - Add TypeScript types

5. **Place Component**:
   - Determine location based on type
   - Create file with kebab-case name
   - Export component with PascalCase name

6. **Integrate**:
   - Import in page/parent component
   - Connect to CMS data (if needed)
   - Test responsiveness

### Example: Converting Generated Code

**Generated (inline styles)**:

```tsx
<div style={{ display: 'flex', gap: '16px', backgroundColor: '#f09a60' }}>
  <h1 style={{ fontSize: '64px', fontWeight: 700 }}>Title</h1>
</div>
```

**Adapted (PMO Hive style)**:

```tsx
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  className?: string;
}

const Hero = ({ title, className }: HeroProps) => {
  return (
    <div className={cn('flex gap-4 bg-primary', className)}>
      <h1>{title}</h1>
    </div>
  );
};

export default Hero;
```

---

## 10. Quick Reference

### Essential Commands

```bash
# Development
pnpm dev                        # Start dev server
pnpm build                      # Production build

# shadcn/ui
pnpx shadcn@latest add button   # Add component
pnpx shadcn@latest add          # List available

# Sanity
pnpx sanity@latest schema extract  # Extract schema
pnpx sanity@latest typegen generate # Generate types
```

### Key Files

- [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>) - Design tokens & global styles
- [src/lib/utils.ts](src/lib/utils.ts) - `cn()` utility
- [components.json](components.json) - shadcn/ui config
- [CLAUDE.md](CLAUDE.md) - Project overview

### Import Patterns

```typescript
// Utilities
import { cn } from '@/lib/utils';

// UI Components
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Sanity
import { sanityFetch } from '@/sanity/lib/client';
import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';

// Icons
import { ArrowRight, Menu, X } from 'lucide-react';

// Animation
import { motion } from 'motion/react';

// Variants
import { cva, type VariantProps } from 'class-variance-authority';
```

### Common Tailwind Patterns

```tsx
// Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-4">

// Responsive Typography
<h1 className="text-2xl md:text-4xl lg:text-5xl">

// Responsive Spacing
<div className="px-4 md:px-6 lg:px-8 py-6 md:py-10">

// Button w/ Icon
<Button>
  Click me <ArrowRight />
</Button>

// Carousel
<Carousel opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem>Slide 1</CarouselItem>
    <CarouselItem>Slide 2</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

// Image w/ Sanity
<Image
  src={urlForUncropped(image).url()}
  alt={image.alt}
  width={1000}
  height={1000}
  className="w-full h-auto object-cover"
/>

// Conditional Classes
<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

---

## Support & Documentation

### Context7 MCP Integration

For up-to-date library documentation, use Context7 MCP tools:

```typescript
// Step 1: Resolve library ID
mcp__context7__resolve - library - id({ libraryName: 'shadcn/ui' });

// Step 2: Get documentation
mcp__context7__get -
  library -
  docs({
    context7CompatibleLibraryID: '/shadcn/ui',
    topic: 'button component',
    tokens: 5000,
  });
```

**Supported Libraries**:

- **shadcn/ui** - UI component documentation
- **tailwindcss** - Utility class reference
- **next.js** - Framework documentation
- **framer-motion** - Animation library
- **lucide-react** - Icon library

### Additional Resources

1. Review this document for design system patterns
2. Check [CLAUDE.md](CLAUDE.md) for project-specific instructions
3. Reference existing components in `src/components/`
4. Use Context7 MCP for library-specific questions

---

**Last Updated**: 2025-10-14
**Version**: 1.0.0
