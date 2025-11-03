import IntroSection from '@/components/sections/about/intro-section';
import OpenPositionsSection from '@/components/sections/careers/open-positions-section';
import { getCareersPageData } from '@/sanity/lib/queries';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const { careersPage } = await getCareersPageData();

  if (!careersPage) {
    return {};
  }

  return generatePageMetadata({
    title: careersPage.seo?.metaTitle || 'Careers & Culture',
    description:
      careersPage.seo?.metaDescription ||
      `Join the PMO Hive team. Explore open positions: ${careersPage.openPositions?.map((p) => p.title).join(', ') || 'Check back for opportunities'}.`,
    image: careersPage.seo?.ogImage as SanityImageSource,
    seo: careersPage.seo,
    path: '/careers-and-culture',
  });
}

export default async function CareersAndCulturePage() {
  const [careersPageResult] = await Promise.all([getCareersPageData()]);

  const { careersPage: careersPageData } = careersPageResult;

  if (!careersPageData) {
    notFound();
  }
  return (
    <main className='pt-6 sm:pt-8 xl:pt-19 pb-15 sm:pb-17 xl:pb-19 2xl:pb-24'>
      <IntroSection
        subtitle={careersPageData.introSection.subtitle}
        heading={careersPageData.introSection.heading}
        backgroundImage={
          careersPageData.introSection.backgroundImage as SanityImageSource & {
            alt: string;
          }
        }
      />
      <OpenPositionsSection positions={careersPageData.openPositions} />
    </main>
  );
}
