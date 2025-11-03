import { GENERAL_INFO_QUERYResult } from '../../../sanity.types';
import { urlForUncropped } from '@/sanity/lib/image';

interface OrganizationSchemaProps {
  generalInfo: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>;
}

/**
 * Organization Schema Component
 * Generates JSON-LD structured data for the Organization schema
 * Used for Google Knowledge Panel and rich snippets
 *
 * @see https://schema.org/Organization
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export default function OrganizationSchema({ generalInfo }: OrganizationSchemaProps) {
  const { companyName, description, email, phone, logoFull, socials } = generalInfo;

  // Extract ALL social media URLs for sameAs property
  const sameAsUrls = socials
    ?.map((social) => social.url)
    .filter((url): url is string => Boolean(url));

  // Generate logo URL
  const logoUrl = logoFull
    ? urlForUncropped(logoFull).width(600).height(60).url()
    : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyName,
    description: description,
    url: 'https://www.pmohive.com',
    ...(logoUrl ? { logo: logoUrl } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(sameAsUrls && sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
