# Sanity Webhook Configuration Guide

This guide walks you through setting up Sanity webhooks for automatic revalidation of your Next.js 16 site.

## Prerequisites

1. ✅ Webhook API route created at `src/app/api/revalidate/route.ts`
2. ✅ `next-sanity` package with webhook support (already installed)
3. ✅ Environment variable `SANITY_REVALIDATION_SECRET` configured

## Key Features

- **Next.js 16 Compatible**: Uses the new `revalidateTag(tag, { expire: 0 })` API
- **Immediate Expiration**: Webhooks trigger instant cache invalidation
- **Signature Verification**: Secure webhook authentication via `next-sanity/webhook`
- **Content Lake Consistency**: Automatically waits for Sanity's eventual consistency
- **Type-Safe**: Full TypeScript support throughout

---

## Step 1: Generate a Secure Webhook Secret

Run this command to generate a secure random string:

```bash
openssl rand -base64 32
```

Copy the output and update your `.env.local` file:

```env
SANITY_REVALIDATION_SECRET="paste_generated_secret_here"
```

**IMPORTANT:** Keep this secret secure. It's used to verify that webhook requests actually come from Sanity.

---

## Step 2: Deploy Your Next.js Application

Before configuring webhooks, deploy your application to production so Sanity can reach your webhook endpoint.

**Your webhook URL will be:**
```
https://yourdomain.com/api/revalidate
```

Make sure the `SANITY_REVALIDATION_SECRET` environment variable is also set in your production environment (Vercel, Netlify, etc.).

---

## Step 3: Configure Webhooks in Sanity

### Option A: Via Sanity Management Console (Recommended)

1. **Go to Sanity Manage:**
   - Visit: https://sanity.io/manage
   - Select your project: **b1y8fomg**
   - Navigate to: **API** → **Webhooks**

2. **Create Webhook #1: Blog Content**
   - Click **"Add Webhook"**
   - Fill in the details:

   ```
   Name: Blog Content Revalidation
   Description: Revalidates blog posts and categories
   URL: https://yourdomain.com/api/revalidate
   Dataset: dev (or production when ready)
   Trigger on: create, update, delete
   Filter: _type == "post" || _type == "postCategory"
   Projection: { _type, "slug": slug.current, _id }
   HTTP method: POST
   HTTP Headers: (leave empty)
   Secret: [paste your SANITY_REVALIDATION_SECRET here]
   ```

   - Click **"Save"**

3. **Create Webhook #2: All Other Content**
   - Click **"Add Webhook"** again
   - Fill in the details:

   ```
   Name: Site Content Revalidation
   Description: Revalidates pages, services, case studies, and other content
   URL: https://yourdomain.com/api/revalidate
   Dataset: dev (or production when ready)
   Trigger on: create, update, delete
   Filter: _type != "post" && _type != "postCategory"
   Projection: { _type, "slug": slug.current, _id }
   HTTP method: POST
   HTTP Headers: (leave empty)
   Secret: [paste your SANITY_REVALIDATION_SECRET here]
   ```

   - Click **"Save"**

---

## Step 4: Test Your Webhooks

### Test via Sanity Studio

1. **Edit a blog post** in Sanity Studio and publish it
2. **Check your Next.js logs** (locally or in production) for webhook activity:
   ```
   [Webhook] Received revalidation request for type: post, id: abc123
   [Webhook] Revalidating tags: ['post', 'posts', 'latestPosts', 'post-my-slug']
   [Webhook] ✓ Revalidated tag: post
   [Webhook] ✓ Revalidated tag: posts
   [Webhook] ✓ Revalidated tag: latestPosts
   [Webhook] ✓ Revalidated tag: post-my-slug
   ```
3. **Verify** the blog page updates with your changes

### Test via Webhook Attempts Log

Sanity provides a webhook attempts log:

1. Go to: https://sanity.io/manage
2. Navigate to: **API** → **Webhooks**
3. Click on your webhook
4. Click the **three-dot menu** → **Attempts log**
5. Check for successful deliveries (HTTP 200 responses)

### Manual Test with curl

```bash
# Test locally (make sure dev server is running)
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "sanity-webhook-signature: test" \
  -d '{
    "_type": "post",
    "slug": { "current": "test-slug" },
    "_id": "test-123"
  }'
```

**Note:** This test will fail signature verification unless you mock it in your code. For production testing, use actual Sanity webhooks.

---

## Step 5: Monitor Webhook Performance

### Check Sanity Dashboard

- **Attempts Log:** Shows delivery status, response codes, and retry attempts
- **Message Log:** Shows queued messages
  - API: `https://b1y8fomg.api.sanity.io/v2021-10-04/hooks/${webhookId}/messages`

### Check Your Application Logs

Look for these log patterns:

✅ **Success:**
```
[Webhook] Received revalidation request for type: post, id: abc123
[Webhook] Revalidating tags: ['post', 'posts']
[Webhook] ✓ Revalidated tag: post
```

❌ **Failures:**
```
[Webhook] Revalidation error: Invalid signature
[Webhook] Missing webhook signature
[Webhook] No revalidation mapping for type: unknownType
```

---

## Troubleshooting

### Issue: "Invalid signature" error

**Cause:** Secret mismatch between Sanity and your environment variable.

**Fix:**
1. Verify `SANITY_REVALIDATION_SECRET` in `.env.local` matches Sanity webhook secret
2. Redeploy your application with correct environment variable
3. Update Sanity webhook configuration with correct secret

### Issue: Webhook not triggering

**Cause:** Filter might not match your document types.

**Fix:**
1. Check webhook filter in Sanity matches document `_type`
2. Test with a broader filter first: `true` (matches all documents)
3. Narrow down once confirmed working

### Issue: "No revalidation mapping for type: X"

**Cause:** Document type not included in `REVALIDATION_MAP`.

**Fix:**
Add the type to `src/app/api/revalidate/route.ts`:

```typescript
const REVALIDATION_MAP: Record<string, (payload: WebhookPayload) => string[]> = {
  // ... existing mappings
  myNewType: () => ['myNewTag'],
};
```

### Issue: Changes not appearing on site

**Cause:** Cached response or revalidation not working.

**Debug:**
1. Check webhook attempts log in Sanity
2. Check your application logs for revalidation activity
3. Try hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
4. Verify tags used in queries match tags being revalidated

### Issue: TypeScript error with `revalidateTag`

**Cause:** Next.js 16 requires a second parameter for `revalidateTag`.

**Fix:**
The code already uses `revalidateTag(tag, { expire: 0 })` for immediate expiration. If you see this error elsewhere:

```typescript
// ❌ Old (Next.js 15)
revalidateTag('my-tag');

// ✅ New (Next.js 16)
revalidateTag('my-tag', { expire: 0 }); // Immediate expiration (webhooks)
// OR
revalidateTag('my-tag', 'max'); // Stale-while-revalidate (Server Actions)
```

See: [Next.js 16 revalidateTag docs](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

---

## What Gets Revalidated?

| Content Type | Revalidated Tags | Affected Pages |
|-------------|------------------|----------------|
| Blog Post | `post`, `posts`, `latestPosts`, `post-{slug}` | /blog, /blog/[slug], homepage blog section |
| Blog Category | `postCategory` | /blog (categories filter) |
| Service | `services`, `service`, `service-{slug}` | /industry-focus/[slug] |
| Case Study | `caseStudies`, `caseStudy`, `caseStudy-{slug}` | /projects, /projects/[slug] |
| Home Page | `home-page-data` | / |
| About Page | `aboutPage` | /about-us |
| Contact Page | `contactPage` | /contact-us |
| Careers Page | `careersPage` | /careers-and-culture |
| Privacy/Cookie/Terms | `privacyPolicy`, `cookiePolicy`, `termsOfUse` | Legal pages |
| General Info | `generalInfo` | Header, footer (company info) |
| Team Member | `home-page-data`, `aboutPage` | /, /about-us |
| Open Position | `careersPage` | /careers-and-culture |

---

## Advanced: Webhook Limits

### Free Plan (2 webhooks)
✅ **You're using 2/2 webhooks:**
1. Blog Content (high-velocity)
2. All Other Content (low-velocity)

This is optimal for your use case.

### Paid Plan (4+ webhooks)
If you upgrade, consider splitting further:
1. Blog Posts only
2. Blog Categories only
3. Pages & Static Content
4. Projects & Services

---

## Important Next.js 16 Changes

### `revalidateTag` API Update

Next.js 16 introduced a **breaking change** to `revalidateTag`:

```typescript
// ❌ Next.js 15 (deprecated)
revalidateTag('my-tag');

// ✅ Next.js 16 (required)
revalidateTag('my-tag', { expire: 0 });  // For webhooks
revalidateTag('my-tag', 'max');           // For Server Actions
```

**Why `{ expire: 0 }` for webhooks?**
- Webhooks require **immediate expiration** of cached data
- External systems (like Sanity) call your Route Handlers and expect data to expire instantly
- The `{ expire: 0 }` profile ensures the cache is invalidated right away

**Alternative: `updateTag()` for Server Actions**
If you're using Server Actions (not webhooks), use `updateTag()` instead:
```typescript
import { updateTag } from 'next/cache';
updateTag('my-tag'); // Immediate update for Server Actions
```

Read more: [Next.js 16 revalidateTag docs](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

---

## Questions?

- **Sanity Webhooks Docs:** https://www.sanity.io/docs/webhooks
- **Next.js 16 revalidateTag:** https://nextjs.org/docs/app/api-reference/functions/revalidateTag
- **Next.js Revalidation Guide:** https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- **Check webhook attempts:** https://sanity.io/manage → API → Webhooks → [Your Webhook] → Attempts

---

## Summary Checklist

- [x] Generate webhook secret with `openssl rand -base64 32`
- [x] Add `SANITY_REVALIDATION_SECRET` to `.env.local`
- [x] Deploy application with environment variable set
- [ ] Create Webhook #1 in Sanity (Blog Content)
- [ ] Create Webhook #2 in Sanity (Site Content)
- [ ] Test by editing content in Sanity Studio
- [ ] Verify revalidation in application logs
- [ ] Check webhook attempts log in Sanity dashboard
- [ ] Confirm changes appear on live site

**You're ready to go!** 🚀
