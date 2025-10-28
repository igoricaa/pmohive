import { TextGradientScroll } from '@/components/text-gradient-scroll';
import { Stat } from '@/lib/types';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';
import { HOME_PAGE_QUERYResult } from '../../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Subtitle from '@/components/ui/subtitle';
import ServicesSection from './services-section';
import { AnimateInView } from '@/components/animate-in-view';

type AboutSectionType = {
  heading: {
    text: string;
    highlightedText: string;
  };
  animatedText: string;
  serviceItems: {
    heading: string;
    subtitle: {
      text: string;
      highlightedText?: string | null;
    };
    excerpt: string;
    image: SanityImageSource & { alt: string };
  }[];
  stats: Stat[];
  wrapUpText: string;
  weAreSection: NonNullable<
    HOME_PAGE_QUERYResult['homePage']
  >['about']['weAreSection'];
  className?: string;
};

const AboutSection = ({
  heading,
  animatedText,
  serviceItems,
  stats,
  wrapUpText,
  weAreSection,
  className,
}: AboutSectionType) => {
  return (
    <section className={cn(className)}>
      <div className='px-side flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-22 sm:pt-20 sm:pb-25 xl:pt-10 xl:pb-50 2xl:pt-20 2xl:pb-70'>
        <Subtitle
          highlightedText={heading.highlightedText}
          className='text-center'
        >
          {heading.text}
        </Subtitle>
        <TextGradientScroll
          text={animatedText}
          highlightFirstWord={true}
          offset={['-0.9 center', '0.6 center']}
        />
      </div>

      <ServicesSection serviceItems={serviceItems} />

      <div className='px-side grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5 sm:gap-x-4 sm:gap-y-8 lg:gap-y-0 mt-12 sm:mt-17 xl:mt-27 2xl:mt-40 2xl:max-w-10/12 mx-auto'>
        {stats.map((stat, index) => (
          <AnimateInView
            key={stat.statTitle}
            className={cn((index === 1 || index === 3) && 'lg:mt-10')}
            offset={40}
            direction='up'
            delay={index * 0.2}
            inViewMargin='-100px'
          >
            <StatCard stat={stat} />
          </AnimateInView>
        ))}
      </div>

      <div className='px-side flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-24 sm:py-45 xl:pt-45 xl:pb-50 2xl:pt-60 2xl:pb-70'>
        <TextGradientScroll
          text={wrapUpText}
          offset={['-0.9 center', '0.6 0.6']}
        />
      </div>

      <div className='px-side grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 md:gap-4 items-center overflow-hidden'>
        <AnimateInView
          offset={80}
          direction='right'
          inViewMargin='-100px'
          className='col-span-1 xl:col-span-5 xl:col-start-2'
        >
          <Image
            src={urlForUncropped(weAreSection.image).url()}
            alt={weAreSection.image.alt}
            width={566}
            height={420}
            className='h-auto w-full object-cover'
          />
        </AnimateInView>
        <AnimateInView
          offset={80}
          direction='left'
          inViewMargin='-100px'
          className='col-span-1 xl:col-span-5'
        >
          <h2 className='mt-4 md:mt-0 mb-3 sm:mb-5 xl:mb-4'>
            {weAreSection.heading}{' '}
            <span className='font-mono highlight'>
              {weAreSection.highlightedText}
            </span>
          </h2>

          <PortableText
            value={weAreSection.description as PortableTextBlock[]}
          />
        </AnimateInView>
      </div>
    </section>
  );
};

export default AboutSection;
