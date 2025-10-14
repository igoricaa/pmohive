import { getHomePageData, getLatestPosts } from '@/sanity/lib/queries';
import HeroSection from '@/components/sections/home/hero-section';
import AboutSection from '@/components/sections/home/about-section';
import { Stat } from '@/lib/types';

export default async function Home() {
  const [homePageResult, latestPostsResult] = await Promise.all([
    getHomePageData(),
    getLatestPosts(12),
  ]);

  const { homePage: homePageData } = homePageResult;

  if (!homePageData?.hero) {
    return <main>Loading...</main>;
  }

  return (
    <main className='px-side pt-2 md:pt-0'>
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
        stats={homePageData.about.stats as Stat[]}
        wrapUpText={homePageData.about.wrapUpText}
        weAreSection={homePageData.about.weAreSection}
      />
    </main>
  );
}
