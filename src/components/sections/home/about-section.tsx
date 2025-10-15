import { TextGradientScroll } from '@/components/text-gradient-scroll';
import { Stat } from '@/lib/types';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';
import { HOME_PAGE_QUERYResult } from '../../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';

type AboutSectionType = {
  heading: {
    text: string;
    highlightedText: string;
  };
  animatedText: string;
  stats: Stat[];
  wrapUpText: string;
  weAreSection: NonNullable<
    HOME_PAGE_QUERYResult['homePage']
  >['about']['weAreSection'];
};

const AboutSection = ({
  heading,
  animatedText,
  stats,
  wrapUpText,
  weAreSection,
}: AboutSectionType) => {
  return (
    <section>
      <div className='flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl mx-auto'>
        <p className='font-mono text-base xl:text-lg font-medium text-center'>
          {heading.text}
          <span className='font-mono highlight xl:text-lg 2xl:text-xl font-medium ml-2.5'>
            {heading.highlightedText}
          </span>
        </p>
        <TextGradientScroll
          text={animatedText}
          className='text-2xl sm:text-3xl xl:text-4xl font-semibold xl:font-medium justify-center'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5 sm:gap-x-4 sm:gap-y-8 lg:gap-y-0 py-12 sm:pt-17 sm:pb-16 xl:py-27'>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.statTitle}
            stat={stat}
            className={cn((index === 1 || index === 3) && 'lg:mt-10')}
          />
        ))}
      </div>

      <p className='font-bold sm:max-xl:font-semibold leading-none text-[28px] sm:text-4xl xl:text-[42px] text-center max-w-75 sm:max-w-2xl xl:max-w-300 mx-auto'>
        {wrapUpText}
      </p>

      <div className='py-27 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-2 md:gap-4 items-center'>
        <Image
          src={urlForUncropped(weAreSection.image).url()}
          alt={weAreSection.image.alt}
          width={566}
          height={420}
          className='h-auto w-full object-cover col-span-1 xl:col-span-5 xl:col-start-2'
        />
        <div className='col-span-1 xl:col-span-5'>
          <h2 className='text-4xl sm:text-[44px] xl:text-[56px] mt-4 sm:mt-0 font-bold mb-3 sm:mb-5 xl:mb-4'>
            {weAreSection.heading}{' '}
            <span className='font-mono highlight ml-2 text-4xl sm:text-[44px] xl:text-[56px] mt-4 sm:mt-0 font-bold'>
              {weAreSection.highlightedText}
            </span>
          </h2>

          <PortableText
            value={weAreSection.description as PortableTextBlock[]}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
