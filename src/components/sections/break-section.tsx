import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/portable-text';
import Heading from '@/components/ui/heading';
import AnimatedButton from '../animated-button';
import { AnimateInView } from '../animate-in-view';

interface BreakSectionSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading: string;
  description?: PortableTextBlock[];
  backgroundImage: SanityImageSource & { alt: string };
  buttons: {
    text: string;
    highlightedText?: string | null;
    link: string;
    variant?: string;
  }[];
  className?: string;
  contentClassName?: string;
}

const BreakSection = ({
  subtitle,
  heading,
  description,
  backgroundImage,
  buttons,
  className,
  contentClassName,
}: BreakSectionSectionProps) => {
  return (
    <section className={cn('px-side', className)}>
      <div className='relative overflow-hidden sm:h-100 xl:h-auto xl:aspect-[1375/521] sm:pb-6 xl:pb-12 sm:px-4 xl:px-10 2xl:px-0 grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5 items-end'>
        <div className='relative w-full h-53 sm:h-full sm:absolute sm:inset-0 z-0'>
          <Image
            src={urlFor(backgroundImage).url()}
            alt={backgroundImage.alt}
            fill
            sizes='100vw'
            className='w-full h-full object-cover object-[50%_15%]'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black'></div>
        </div>

        <div className='relative z-10 col-span-full 2xl:col-span-10 2xl:col-start-2'>
          <div className={cn('sm:max-w-xl xl:max-w-3xl', contentClassName)}>
            <AnimateInView
              offset={40}
              direction='up'
              inViewMargin='-250px'
              disableOnMobile={true}
            >
              <Heading
                level='h4'
                subtitle={{
                  text: subtitle.text,
                  highlightedText: subtitle.highlightedText || null,
                }}
              >
                {heading}
              </Heading>
            </AnimateInView>

            {description && (
              <AnimateInView
                offset={40}
                direction='up'
                inViewMargin='-250px'
                className='mt-4 sm:mt-3 xl:mt-2'
                disableOnMobile={true}
              >
                <PortableText value={description} />
              </AnimateInView>
            )}

            <div className='flex gap-2 sm:gap-4 mt-4 xl:mt-7.5'>
              {buttons.map((button, index) => (
                <AnimateInView
                  key={`${button.text}-${index}`}
                  offset={40}
                  direction='up'
                  inViewMargin='-150px'
                  delay={index * 0.2}
                  disableOnMobile={true}
                >
                  <AnimatedButton
                    key={button.text}
                    text={button.text}
                    href={button.link}
                    variant={button.variant as 'default' | 'secondary'}
                    icon={
                      index === 1
                        ? { type: 'lucide', name: 'ArrowRight' }
                        : undefined
                    }
                    highlightedText={button.highlightedText || undefined}
                    iconClassName='size-4! sm:size-6!'
                    className='flex-1 sm:flex-initial sm:w-auto'
                  />
                </AnimateInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakSection;
