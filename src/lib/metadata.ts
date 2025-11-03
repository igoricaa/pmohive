import { Metadata } from 'next';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { BlockContent } from '../../sanity.types';
import { extractPlainText } from './text-utils';

const SITE_URL = 'https://www.pmohive.com';
const SITE_NAME = 'PMO Hive';
const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image.png`;
const DEFAULT_DESCRIPTION =
  'PMO Hive delivers expert project management office services, helping organizations optimize project delivery and achieve strategic goals.';

interface SEOData {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: SanityImageSource | null;
  keywords?: string[] | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
}

interface GenerateMetadataParams {
  title?: string;
  description?: string | BlockContent;
  image?: SanityImageSource;
  seo?: SEOData | null;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  path?: string;
}

/**
 * Generate comprehensive metadata for a page using Sanity CMS data
 * Prioritizes SEO fields, falls back to content fields
 */
export function generatePageMetadata({
  title,
  description,
  image,
  seo,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  path,
}: GenerateMetadataParams): Metadata {
  // Title logic: SEO meta title > SEO OG title > content title
  const metaTitle = seo?.metaTitle || title || SITE_NAME;
  const ogTitle = seo?.ogTitle || seo?.metaTitle || title || SITE_NAME;

  // Description logic: SEO meta description > content description
  // Handle both string and BlockContent descriptions
  const plainDescription =
    typeof description === 'string'
      ? description
      : extractPlainText(description);

  const metaDescription =
    seo?.metaDescription || plainDescription || DEFAULT_DESCRIPTION;
  const ogDescription =
    seo?.ogDescription ||
    seo?.metaDescription ||
    plainDescription ||
    DEFAULT_DESCRIPTION;

  // Image logic: SEO OG image > content image > default
  let ogImageUrl = DEFAULT_OG_IMAGE;
  if (seo?.ogImage) {
    ogImageUrl = urlForUncropped(seo.ogImage).width(1200).height(630).url();
  } else if (image) {
    ogImageUrl = urlForUncropped(image).width(1200).height(630).url();
  }

  // Canonical URL logic
  const canonical =
    seo?.canonicalUrl || (path ? `${SITE_URL}${path}` : SITE_URL);

  // Robots directive
  const robots = seo?.noIndex
    ? {
        index: false,
        follow: false,
      }
    : {
        index: true,
        follow: true,
      };

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.keywords || undefined,
    robots,
    alternates: {
      canonical,
      languages: {
        'x-default': canonical,
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImageUrl],
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
    };
  }

  return metadata;
}

/**
 * Get full URL for a given path
 */
export function getFullUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * Format text for meta description (strip markdown, limit length)
 */
export function formatMetaDescription(text: string, maxLength = 160): string {
  // Strip markdown syntax
  const stripped = text
    .replace(/#+\s/g, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (stripped.length <= maxLength) {
    return stripped;
  }

  // Truncate at word boundary
  const truncated = stripped.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}
