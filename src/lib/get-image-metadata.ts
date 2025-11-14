import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface ImageMetadata {
  url: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Extract metadata from Sanity image for Open Graph and Twitter cards
 * Generates optimized image URLs with proper dimensions
 */
export function getImageMetadata(
  image: SanityImageSource & { alt?: string },
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): ImageMetadata {
  const width = options?.width || 1200;
  const height = options?.height || 630;
  const quality = options?.quality || 85;

  const url = urlFor(image).width(width).height(height).quality(quality).url();

  // Extract alt text from image object
  const alt =
    (image as { alt?: string }).alt ||
    'PMO Hive - Professional Project Management Services';

  return {
    url,
    alt,
    width,
    height,
  };
}

/**
 * Generate Open Graph image object from Sanity image
 */
export function getOgImage(image: SanityImageSource & { alt?: string }): {
  url: string;
  width: number;
  height: number;
  alt: string;
} {
  return getImageMetadata(image, { width: 1200, height: 630 });
}

/**
 * Generate Twitter card image URL from Sanity image
 */
export function getTwitterImage(
  image: SanityImageSource & { alt?: string }
): string {
  return getImageMetadata(image, { width: 1200, height: 630 }).url;
}
