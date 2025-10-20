import { TextGradientScroll } from '@/components/text-gradient-scroll';
import { Stat } from '@/lib/types';
import StatCard from './stat-card';
import { cn } from '@/lib/utils';
import { HOME_PAGE_QUERYResult } from '../../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor, urlForUncropped } from '@/sanity/lib/image';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import ImageNext from 'next/image';

type AboutSectionType = {
  heading: {
    text: string;
    highlightedText: string;
  };
  animatedText: string;
  understandingPMOItems: {
    heading: string;
    subtitle: {
      text: string;
      highlightedText?: string | null;
    };
    description: PortableTextBlock[];
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
  understandingPMOItems,
  stats,
  wrapUpText,
  weAreSection,
  className,
}: AboutSectionType) => {
  return (
    <section className={cn('px-side', className)}>
      <div className='flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto pt-28 pb-16 xl:pt-32 xl:pb-40'>
        <p className='font-mono text-base xl:text-lg font-medium text-center'>
          {heading.text}
          <span className='font-mono highlight xl:text-lg 2xl:text-xl font-medium ml-2.5'>
            {heading.highlightedText}
          </span>
        </p>
        <TextGradientScroll
          text={animatedText}
          className='font-semibold justify-center font-sans text-2xl sm:text-3xl xl:text-5xl 2xl:text-6xl'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-6 xl:grid-cols-12 gap-4 sm:gap-3 xl:gap-6'>
        {understandingPMOItems.map((item) => (
          <article
            key={item.heading}
            className='col-span-1 sm:col-span-2 xl:col-span-4 relative px-3 pb-3 xl:px-4 xl:pb-7 flex flex-col justify-end gap-2 aspect-[447/344] group hover:-translate-y-5 transition-[translate] ease-out duration-300 overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-b from-transparent  to-black/40 -z-5' />
            <Image
              src={urlFor(item.image).url()}
              alt={item.image.alt}
              width={447}
              height={344}
              className='h-full w-full object-cover absolute inset-0 -z-10'
            />

            <ImageNext
              src='/arrow-top-right.svg'
              alt='Arrow top right'
              width={88}
              height={88}
              className='-z-5 object-cover absolute top-6 right-6 w-22 h-22 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-[opacity,visibility,translate] duration-200 ease-out -translate-x-5 translate-y-5 group-hover:translate-0'
            />

            <div className='transition-[max-height] duration-300 xl:max-h-17 xl:group-hover:max-h-50 overflow-hidden'>
              <p className='text-sm xl:text-lg'>
                {item.subtitle.text}
                <span className='font-mono highlight ml-2'>
                  {item.subtitle.highlightedText}
                </span>
              </p>
              <h3 className='text-2xl sm:text-3xl xl:text-4xl font-bold'>
                {item.heading}
              </h3>
              <div className='transition-[opacity,max-height] xl:opacity-0 xl:group-hover:opacity-100 delay-0 xl:group-hover:delay-250 duration-200 xl:group-hover:duration-200 ease-out xl:max-h-0 xl:group-hover:max-h-full overflow-hidden'>
                <PortableText value={item.description as PortableTextBlock[]} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5 sm:gap-x-4 sm:gap-y-8 lg:gap-y-0 mt-12 sm:mt-17 xl:mt-27 2xl:max-w-10/12 mx-auto'>
        {stats.map((stat, index) => (
          <StatCard
            key={stat.statTitle}
            stat={stat}
            className={cn((index === 1 || index === 3) && 'lg:mt-10')}
          />
        ))}
      </div>

      <div className='flex flex-col items-center justify-center gap-2 xl:gap-4 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto pt-28 pb-16 xl:pt-32 xl:pb-40'>
        <TextGradientScroll
          text={wrapUpText}
          className='font-semibold justify-center font-sans text-2xl sm:text-3xl xl:text-5xl 2xl:text-6xl'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 md:gap-4 items-center mt-16 xl:mt-40'>
        <Image
          src={urlForUncropped(weAreSection.image).url()}
          alt={weAreSection.image.alt}
          width={566}
          height={420}
          className='h-auto w-full object-cover col-span-1 xl:col-span-5 xl:col-start-2'
        />
        <div className='col-span-1 xl:col-span-5'>
          <h2 className='text-4xl sm:text-[44px] xl:text-[56px] mt-4 md:mt-0 font-bold mb-3 sm:mb-5 xl:mb-4'>
            {weAreSection.heading}{' '}
            <span className='font-mono highlight ml-2 text-4xl sm:text-[44px] xl:text-[56px] font-bold'>
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
