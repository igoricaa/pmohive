import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { BlockContent } from '../../../sanity.types';
import { extractPlainText } from '@/lib/text-utils';

interface ArticleSchemaProps {
  title: string;
  description?: string | BlockContent | null;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: SanityImageSource;
  slug: string;
}

/**
 * Article Schema Component
 * Generates JSON-LD structured data for the Article schema
 * Used for blog posts, news articles, and editorial content
 *
 * @see https://schema.org/Article
 * @see https://developers.google.com/search/docs/appearance/structured-data/article
 */
export default function ArticleSchema({
  title,
  description,
  publishedTime,
  modifiedTime,
  author = 'PMO Hive',
  image,
  slug,
}: ArticleSchemaProps) {
  // Generate image URL
  const imageUrl = image
    ? urlForUncropped(image).width(1200).height(630).url()
    : 'https://www.pmohive.com/opengraph-image.png';

  // Extract plain text from description if it's BlockContent
  const plainDescription =
    typeof description === 'string'
      ? description
      : extractPlainText(description);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: plainDescription,
    image: imageUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://www.pmohive.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PMO Hive',
      url: 'https://www.pmohive.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pmohive.com/opengraph-image.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.pmohive.com/blog/${slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
