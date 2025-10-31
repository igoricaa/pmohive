# CLAUDE.md

AI Assistant Operating Manual for this Next.js 16 project.

---

## 1. Hard Rules (Never Break)

- **Package Manager**: ALWAYS `pnpm` / `pnpx` (NEVER `npm` / `npx`)
- **Sanity Data**: ALWAYS use `sanityFetch()` from [src/sanity/lib/client.ts](src/sanity/lib/client.ts) (NEVER raw client)
- **Class Merging**: ALWAYS use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for className props
- **Path Alias**: Use `@/*` for [src/](src/) imports
- **MCP Priority**: Query Next.js MCP runtime BEFORE reading files when investigating running app
- **Browser Verification**: Use browser automation (NOT curl) to verify pages - catches runtime/hydration errors

---

## 2. Gotchas (Time-Wasters)

**Zod v4 + React Hook Form**:

```typescript
// Required due to type incompatibility (GitHub issue #813)
const form = useForm({
  // @ts-expect-error - Known incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2
  resolver: zodResolver(schema),
});
```

- Zod v4 syntax: `z.enum([...], { error: "..." })` (NOT `required_error`)

**GROQ Query Params**:

- Pass `null` for empty params (NOT `undefined`) to satisfy GROQ

**Sanity Type Generation**:

- Run after ANY schema changes: `pnpx sanity@latest schema extract --enforce-required-fields` and `pnpx sanity@latest typegen generate`
- Types auto-generated in [sanity.types.ts](sanity.types.ts)

**nuqs Debouncing**:

- Use `debounce(500)` from nuqs for search inputs
- Example: [src/components/blog/search-input.tsx](src/components/blog/search-input.tsx)

**AnimatedButton Icons**:

- Lucide icons passed as **strings** (`'ArrowRight'`), not components
- Add new icons to ICON_MAP in [src/components/animated-button.tsx](src/components/animated-button.tsx)

**Google Maps Advanced Markers**:

- Advanced Markers REQUIRE a Map ID (Vector type)
- Component: [src/components/google-map.tsx](src/components/google-map.tsx)
- Create Map ID: [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/studio/maps)
  - Map type: JavaScript
  - Rendering: Vector (not Raster)
- WHY: Advanced Markers API needs vector rendering for custom pins/HTML content
- Env vars: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`

**CRITICAL Styling Limitation**:

- When using a Map ID, the `styles` prop is **completely ignored**
- All map styling MUST be configured in Google Cloud Console
- Cloud-based styling takes precedence over programmatic styles
- No way to use both programmatic styles AND Advanced Markers
- Solution: Apply your custom JSON styling to the Map ID in Cloud Console

---

## 3. Architecture Decisions (The WHY)

**Hybrid Blog Caching**:

- Categories: Server-side only (sanityFetch), prefetched via React Query, NO client API calls
- Posts: Initial 12 server-prefetched, subsequent filtering via client API
- WHY: Categories rarely change, posts need dynamic filtering

**Self-Contained Components**:

- Blog components use `useQueryState()` for URL params (no props)
- WHY: Shareable URLs, browser history, no prop drilling
- See: [src/components/blog/](src/components/blog/)

**AnimatedButton Discriminated Union**:

- TypeScript enforces Link XOR Button (never both)
- WHY: Prevents invalid combinations at compile time
- See: [src/components/animated-button.tsx](src/components/animated-button.tsx)

**React Query Configuration**:

- `staleTime: Infinity` (data never stale by default)
- `gcTime: 10min`, `retry: 1`
- WHY: Reduces unnecessary refetches
- See: [src/providers/query-provider.tsx](src/providers/query-provider.tsx)

**Google Maps Sticky Layout (Contact Page)**:

- Map on right side: Sticky on XL+ screens with fixed viewport height
- Implementation: [src/app/(frontend)/contact-us/page.tsx](<src/app/(frontend)/contact-us/page.tsx>)
- Wrapper: `xl:sticky xl:top-[184px]`
- Map height: `xl:h-[calc(100vh-184px)]`
- WHY: Keeps map visible while user fills out long contact form
- Responsive: Only applies to XL screens (≥1280px), scrolls normally on smaller screens

---

## 4. Tool Routing (Which Tool for What)

### Next.js Questions → Next.js MCP

- Runtime diagnostics: `mcp__next-devtools__nextjs_runtime`
- Browser testing: `mcp__next-devtools__browser_eval`
- Next.js 16 docs: `mcp__next-devtools__nextjs_docs`
- **When**: Before implementing changes, diagnosing issues, verifying pages

### Library Documentation → Context7 MCP

- React Hook Form: `mcp__context7__resolve-library-id({ libraryName: 'react-hook-form' })`
- shadcn/ui: `mcp__context7__get-library-docs({ context7CompatibleLibraryID: '/shadcn/ui' })`
- Google Maps: `mcp__context7__resolve-library-id({ libraryName: '@vis.gl/react-google-maps' })`
- Tailwind CSS, Zod, TanStack Query, etc.
- **When**: Need API docs, usage examples, latest features

### Framer Motion Questions → Motion MCP

- Motion/Framer Motion docs: `mcp__motion__*`
- **When**: Animation questions, spring physics, motion patterns

### Figma Designs → Figma MCP

- Screenshot: `mcp__figma-dev-mode-mcp-server__get_screenshot`
- Code generation: `mcp__figma-dev-mode-mcp-server__get_code`
- **When**: Converting designs to code

### File Operations → Read/Edit/Glob/Grep

- **When**: Need to see actual code, not documentation

---

## 5. File Locations (Key Paths)

**Pages & Layouts**:

- Frontend routes: [src/app/(frontend)/](<src/app/(frontend)/>)
- API routes: [src/app/api/blog/](src/app/api/blog/)
- Sanity Studio: [src/app/studio/[[...tool]]/](src/app/studio/[[...tool]]/)

**Components**:

- UI library: [src/components/ui/](src/components/ui/)
- Blog: [src/components/blog/](src/components/blog/)
- Animations: [src/components/fancy/text/](src/components/fancy/text/)
- Advanced: [animated-button.tsx](src/components/animated-button.tsx), [motion-link.tsx](src/components/motion-link.tsx), [contact-form.tsx](src/components/contact-form.tsx), [google-map.tsx](src/components/google-map.tsx)
- Header: [src/components/header/sticky-header-wrapper.tsx](src/components/header/sticky-header-wrapper.tsx)

**Sanity CMS**:

- Schemas: [src/sanity/schemaTypes/](src/sanity/schemaTypes/) (pages/, posts/, case-study/)
- Client & queries: [src/sanity/lib/](src/sanity/lib/) (client.ts, queries.ts, image.ts)
- Config: [sanity.config.ts](sanity.config.ts)
- Case studies: [src/app/(frontend)/case-study/](<src/app/(frontend)/case-study/>), [src/components/case-study/](src/components/case-study/)

**State & Utils**:

- Providers: [src/providers/](src/providers/)
- Hooks: [src/hooks/](src/hooks/)
- Utils: [src/lib/utils.ts](src/lib/utils.ts)

**Styles**:

- Global CSS & tokens: [src/app/(frontend)/globals.css](<src/app/(frontend)/globals.css>)

---

## 6. Key Patterns (Non-Obvious)

**Server-Side React Query Prefetch**:

```typescript
// In page.tsx
const queryClient = new QueryClient();
await queryClient.prefetchQuery({ queryKey: [...], queryFn: ... });
return <HydrationBoundary state={dehydrate(queryClient)}><Client /></HydrationBoundary>;
```

See: [src/app/(frontend)/blog/page.tsx](<src/app/(frontend)/blog/page.tsx>)

**URL State with nuqs**:

```typescript
const [search, setSearch] = useQueryState(
  'search',
  parseAsString.withDefault('')
);
```

Setup: [src/app/(frontend)/layout.tsx](<src/app/(frontend)/layout.tsx>) wraps with `<NuqsAdapter>`

**Page Transitions**:

- Link: Use `Link` from [src/components/motion-link.tsx](src/components/motion-link.tsx) (NOT `next/link`)
- Programmatic: `useMotionRouter()` from [src/hooks/use-motion-router.tsx](src/hooks/use-motion-router.tsx)
- Falls back gracefully for unsupported browsers

**Sanity Image Optimization**:

```typescript
import { urlForUncropped } from '@/sanity/lib/image';
<Image src={urlForUncropped(image).url()} ... />
```

**Progress Bar with Synchronized Completion**:

```typescript
// Random chunk loading with guaranteed 3s completion
const progress = useSpring(0, { stiffness: 80, damping: 25 });

// Adaptive random jumps ensure completion
const baseJump = remaining / intervalsLeft;
const jump = baseJump * (0.6 + Math.random() * 0.8); // ±40% variance

// Listen for completion
progress.on('change', (latest) => {
  if (latest >= 0.99) {
    setTimeout(() => setShowLoader(false), 300);
  }
});
```

See: [src/components/progress-bar.tsx](src/components/progress-bar.tsx)

---

## 7. MCP Workflow

**Before ANY changes to app**:

1. `mcp__next-devtools__nextjs_runtime(action: 'discover_servers')`
2. `mcp__next-devtools__nextjs_runtime(action: 'list_tools', port: 3000)`
3. `mcp__next-devtools__nextjs_runtime(action: 'call_tool', toolName: 'get-errors')`

**For diagnostic questions** ("What's wrong?"):

- Check Next.js runtime first (get-errors, get-routes)
- Use browser automation for page verification

**For library questions**:

- Use Context7 MCP, NOT web search
- Example: `mcp__context7__resolve-library-id({ libraryName: 'react-hook-form' })`

---

## 8. GDPR & Analytics

**GTM + GA4 with Consent Mode v2**:

- Consent init: [gtm-consent-init.tsx](src/components/gtm-consent-init.tsx) - Sets default to 'denied' BEFORE GTM loads
- GTM integration: [layout.tsx](<src/app/(frontend)/layout.tsx:48>) via `@next/third-parties`
- Termly CMP: [termly-cmp.tsx](src/components/sections/termly-cmp.tsx) - Auto-blocks cookies, reinitializes on route changes, updates consent via dataLayer
- **Critical order**: GTMConsentInit → GoogleTagManager → TermlyCMP

**Environment Variables**:

- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` (Google Tag Manager)
- `NEXT_PUBLIC_TERMLY_UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (Termly website UUID)

**Legal Pages** (Sanity CMS-driven):

- Privacy Policy: [/privacy-policy/page.tsx](<src/app/(frontend)/privacy-policy/page.tsx>)
- Cookie Policy: [/cookie-policy/page.tsx](<src/app/(frontend)/cookie-policy/page.tsx>)
- Terms of Use: [/terms-of-use/page.tsx](<src/app/(frontend)/terms-of-use/page.tsx>)
- Schemas: [src/sanity/schemaTypes/pages/](src/sanity/schemaTypes/pages/) (privacyPolicyType, cookiePolicyType, termsOfUseType)
- Queries: [queries.ts:293](src/sanity/lib/queries.ts:293) (getPrivacyPolicyData, getCookiePolicyData, getTermsOfUseData)

**Contact Form GDPR**:

- Two consent checkboxes: [contact-form.tsx](src/components/contact-form.tsx)
  - Processing consent (required, unchecked default)
  - Marketing consent (optional, unchecked default)
- reCAPTCHA v3: [recaptcha.ts](src/lib/recaptcha.ts) - Score-based spam protection (threshold 0.5)
- Email consent logging: [contact-email.tsx](src/components/emails/contact-email.tsx) - Includes timestamp, IP, user agent

**Footer Integration**:

- Cookie Settings button: [cookie-settings-button.tsx](src/components/cookie-settings-button.tsx)
- Calls `window.displayPreferenceModal()` to reopen Termly banner
- CMP loads via [termly-cmp.tsx](src/components/sections/termly-cmp.tsx) with `autoBlock={true}` (blocks cookies before consent)

---

## Commands

```bash
pnpm dev                                     # Dev server (Turbopack)
pnpm build                                   # Production build
pnpx shadcn@latest add [component]           # Add UI component
pnpx sanity@latest schema extract            # Extract Sanity schema
pnpx sanity@latest typegen generate          # Generate types
```

---

**Tech Stack**: Next.js 16.0.0, React 19.2.0, Sanity CMS, Tailwind v4, shadcn/ui, TypeScript, pnpm
