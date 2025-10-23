import ApproachSection from '@/components/sections/about/approach-section';
import IntroSection from '@/components/sections/about/intro-section';
import BreakSection from '@/components/sections/break-section';
import CareersSection from '@/components/sections/careers-section';
import BlogSection from '@/components/sections/home/blog-section';
import { TextGradientScroll } from '@/components/text-gradient-scroll';
import Subtitle from '@/components/ui/subtitle';
import { getAboutPageData, getLatestPosts } from '@/sanity/lib/queries';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from 'next-sanity';
import { notFound } from 'next/navigation';
import SplitSection from '@/components/sections/split-section';

export default async function AboutUsPage() {
  const [aboutPageResult, latestPostsResult] = await Promise.all([
    getAboutPageData(),
    getLatestPosts(12),
  ]);

  const { aboutPage: aboutPageData } = aboutPageResult;

  if (!aboutPageData) {
    return notFound();
  }

  return (
    <main className='pt-28 sm:pt-34 lg:pt-40 pb-15 sm:pb-17 xl:pb-19 2xl:pb-24'>
      <IntroSection
        subtitle={aboutPageData.introSection.subtitle}
        heading={aboutPageData.introSection.heading}
        backgroundImage={
          aboutPageData.introSection.backgroundImage as SanityImageSource & {
            alt: string;
          }
        }
      />

      <div className='px-side flex flex-col gap-2 xl:gap-4 py-20 sm:py-45 xl:pt-40 xl:pb-50 lg:grid lg:grid-cols-12 lg:gap-x-4'>
        <Subtitle
          highlightedText={aboutPageData.introSection.subtitle.highlightedText}
          className='lg:col-span-10 lg:col-start-2'
        >
          {aboutPageData.introSection.subtitle.text}
        </Subtitle>
        <TextGradientScroll
          text={aboutPageData.animatedTextPart1}
          highlightFirstWord={true}
          className='justify-start lg:col-span-10 lg:col-start-2 text-[28px] sm:text-4xl 2xl:text-[40px] leading-none'
          offset={['-1 0.6', '0.3 center']}
        />

        <TextGradientScroll
          text={aboutPageData.animatedTextPart2}
          className='justify-start lg:col-span-10 lg:col-start-2 text-[28px] sm:text-4xl 2xl:text-[40px] leading-none mt-3 sm:mt-5'
          offset={['-0.5 0.5', '0.7 center']}
        />
      </div>

      <BreakSection
        subtitle={aboutPageData.break.subtitle}
        heading={aboutPageData.break.heading}
        backgroundImage={
          aboutPageData.break.backgroundImage as SanityImageSource & {
            alt: string;
          }
        }
        buttons={aboutPageData.break.buttons}
        contentClassName='sm:max-w-7/8 xl:max-w-8/12'
      />

      <CareersSection
        subtitle={aboutPageData.team.subtitle}
        heading={aboutPageData.team.heading}
        description={aboutPageData.team.description as PortableTextBlock[]}
        ctaButton={aboutPageData.team.button}
        teamMembers={aboutPageData.team.teamMembers}
        className='mt-12 sm:mt-24 xl:mt-27'
      />

      <ApproachSection
        subtitle={aboutPageData.approachSection.subtitle}
        heading={aboutPageData.approachSection.heading}
        items={aboutPageData.approachSection.items}
      />

      <SplitSection
        subtitle={aboutPageData.visionSection.subtitle}
        description={
          aboutPageData.visionSection.description as PortableTextBlock[]
        }
        backgroundImage={
          aboutPageData.visionSection.backgroundImage as SanityImageSource & {
            alt: string;
          }
        }
        className='mt-11 sm:mt-16 xl:mt-26'
      />

      <BlogSection
        subtitle={aboutPageData.blog.subtitle}
        heading={aboutPageData.blog.heading}
        description={aboutPageData.blog.description as PortableTextBlock[]}
        ctaButton={aboutPageData.blog.button}
        posts={latestPostsResult}
      />
    </main>
  );
}
