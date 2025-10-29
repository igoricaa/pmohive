import { getHomePageData, getLatestPosts } from '@/sanity/lib/queries';
import HeroSection from '@/components/sections/home/hero-section';
import AboutSection from '@/components/sections/home/about-section';
import { Stat } from '@/lib/types';
import { PortableTextBlock } from 'next-sanity';
import CareersSection from '@/components/sections/careers-section';
import BlogSection from '@/components/sections/home/blog-section';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import BreakSection from '@/components/sections/break-section';
import { notFound } from 'next/navigation';

export default async function Home() {
  const [homePageResult, latestPostsResult] = await Promise.all([
    getHomePageData(),
    getLatestPosts(12),
  ]);

  const { homePage: homePageData } = homePageResult;

  if (!homePageData) {
    notFound();
  }

  if (!homePageData?.hero) {
    return <main>Loading...</main>;
  }

  return (
    <main className='pt-2 md:pt-0'>
      <HeroSection
        subtitle={homePageData.hero.subtitle}
        heading={homePageData.hero.heading}
        description={homePageData.hero.description}
        buttons={homePageData.hero.buttons}
        images={homePageData.hero.images}
      />
      <AboutSection
        heading={homePageData.about.heading}
        animatedText={homePageData.about.animatedText}
        serviceItems={homePageData.about.services.map((item) => ({
          subtitle: {
            text: item.header.subtitle.text,
            highlightedText: item.header.subtitle.highlightedText || null,
          },
          heading: item.header.heading,
          slug: item.slug,
          excerpt: item.excerpt,
          image: item.header.featuredImage as SanityImageSource & {
            alt: string;
          },
        }))}
        stats={homePageData.about.stats as Stat[]}
        wrapUpText={homePageData.about.wrapUpText}
        weAreSection={homePageData.about.weAreSection}
      />
      <CareersSection
        subtitle={homePageData.team.subtitle}
        heading={homePageData.team.heading}
        description={homePageData.team.description as PortableTextBlock[]}
        ctaButton={homePageData.team.button}
        teamMembers={homePageData.team.teamMembers}
        className='mt-12 sm:mt-24 xl:mt-27 2xl:mt-45'
      />
      <BreakSection
        subtitle={homePageData.pmoPromo.subtitle}
        heading={homePageData.pmoPromo.heading}
        description={homePageData.pmoPromo.description as PortableTextBlock[]}
        backgroundImage={homePageData.pmoPromo.backgroundImage}
        buttons={homePageData.pmoPromo.buttons}
        className='mt-12 sm:mt-16 xl:mt-8.5 2xl:mt-24'
      />
      <BlogSection
        subtitle={homePageData.blog.subtitle}
        heading={homePageData.blog.heading}
        description={homePageData.blog.description as PortableTextBlock[]}
        ctaButton={homePageData.blog.button}
        posts={latestPostsResult}
      />
    </main>
  );
}
