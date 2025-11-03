import { GENERAL_INFO_QUERYResult } from '../../../sanity.types';
import { urlForUncropped } from '@/sanity/lib/image';

interface LocalBusinessSchemaProps {
  generalInfo: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>;
}

/**
 * Local Business Schema Component
 * Generates JSON-LD structured data for the LocalBusiness schema
 * Used for Google Maps, local search results, and Knowledge Panel
 *
 * @see https://schema.org/LocalBusiness
 * @see https://developers.google.com/search/docs/appearance/structured-data/local-business
 */
export default function LocalBusinessSchema({ generalInfo }: LocalBusinessSchemaProps) {
  const {
    companyName,
    description,
    email,
    phone,
    address,
    businessHours,
    googleMapCoordinates,
    officeImage,
    logoFull,
    priceRange,
    businessType,
  } = generalInfo;

  // Generate image URL if office image is provided
  const imageUrl = officeImage
    ? urlForUncropped(officeImage).width(1200).height(800).url()
    : logoFull
      ? urlForUncropped(logoFull).width(1200).height(800).url()
      : undefined;

  // Format opening hours specification
  const openingHoursSpecification =
    businessHours && businessHours.daysOfWeek && businessHours.daysOfWeek.length > 0
      ? [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: businessHours.daysOfWeek,
            opens: businessHours.openingTime,
            closes: businessHours.closingTime,
          },
        ]
      : undefined;

  // Build geo coordinates object
  const geo = googleMapCoordinates
    ? {
        '@type': 'GeoCoordinates',
        latitude: googleMapCoordinates.lat,
        longitude: googleMapCoordinates.lng,
      }
    : undefined;

  // Build postal address object
  const postalAddress = address
    ? {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      }
    : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': businessType || 'ProfessionalService',
    name: companyName,
    description: description,
    url: 'https://www.pmohive.com',
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(postalAddress ? { address: postalAddress } : {}),
    ...(geo ? { geo } : {}),
    ...(openingHoursSpecification ? { openingHoursSpecification } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(priceRange ? { priceRange } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
