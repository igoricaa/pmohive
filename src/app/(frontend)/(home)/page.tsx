import { getHomePageData, getLatestPosts } from '@/sanity/lib/queries';
import HeroSection from '@/components/sections/hero-section';
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';

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

      <div className='flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl mx-auto'>
        <p className='font-mono text-base xl:text-lg font-medium text-center'>
          {homePageData.about.heading.text}
          <span className='font-mono highlight xl:text-lg 2xl:text-xl font-medium ml-2.5'>
            {homePageData.about.heading.highlightedText}
          </span>
        </p>
        <TextGradientScroll
          text={homePageData.about.aboutText}
          className='text-2xl sm:text-3xl xl:text-4xl font-semibold xl:font-medium justify-center'
        />
      </div>
    </main>
  );
}
