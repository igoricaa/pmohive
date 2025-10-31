import PortableText from '@/components/portable-text';
import Subtitle from '@/components/ui/subtitle';
import { cn } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import Heading from '../ui/heading';
import { AnimateInView } from '../animate-in-view';

interface SplitSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading?: string | null;
  description: PortableTextBlock[];
  backgroundImage: SanityImageSource & { alt: string };
  className?: string;
  descriptionClassName?: string;
}

const SplitSection = ({
  subtitle,
  heading,
  description,
  backgroundImage,
  className,
  descriptionClassName,
}: SplitSectionProps) => {
  return (
    <section
      className={cn(
        'px-side md:grid md:grid-cols-2 xl:grid-cols-12 gap-4 xl:gap-5',
        className
      )}
    >
      <div className='col-span-1 xl:col-span-5 xl:col-start-2 2xl:col-span-4 2xl:col-start-3 w-full h-55 md:h-full xl:aspect-[580/681] overflow-hidden'>
        <AnimateInView
          offset={80}
          direction='right'
          inViewMargin='-100px'
          className='h-full'
        >
          <Image
            src={urlForUncropped(backgroundImage).url()}
            alt={backgroundImage.alt}
            width={560}
            height={681}
            quality={85}
            className='w-full h-full object-cover'
          />
        </AnimateInView>
      </div>
      <div className='col-span-1 xl:col-span-5 2xl:col-span-4 mt-3 sm:mt-0 justify-center flex flex-col overflow-hidden'>
        <AnimateInView offset={80} direction='left' inViewMargin='-100px'>
          {heading ? (
            <Heading level='h5' subtitle={subtitle}>
              {heading}
            </Heading>
          ) : (
            <Subtitle highlightedText={subtitle.highlightedText}>
              {subtitle.text}
            </Subtitle>
          )}
          <div className='mt-3 xl:mt-8'>
            <PortableText
              value={description}
              paragraphClassName={cn(
                'text-2xl sm:text-[26px] 2xl:text-[32px] font-semibold leading-none',
                descriptionClassName
              )}
            />
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default SplitSection;
