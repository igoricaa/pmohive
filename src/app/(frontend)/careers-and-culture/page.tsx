import IntroSection from '@/components/sections/about/intro-section';
import OpenPositionsSection from '@/components/sections/careers/open-positions-section';
import { getCareersPageData } from '@/sanity/lib/queries';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { notFound } from 'next/navigation';

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
