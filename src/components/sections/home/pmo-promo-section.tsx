import { cn } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PortableTextBlock } from 'next-sanity';
import PortableText from '@/components/portable-text';

interface PmoPromoSectionProps {
  subtitle: {
    text: string;
    highlightedText: string;
  };
  heading: string;
  description: PortableTextBlock[];
  backgroundImage: SanityImageSource & { alt: string };
  buttons: {
    text: string;
    highlightedText?: string;
    link: string;
  }[];
  className?: string;
}

const PmoPromoSection = ({
  subtitle,
  heading,
  description,
  backgroundImage,
  buttons,
  className,
}: PmoPromoSectionProps) => {
  return (
    <section className={cn('px-side', className)}>
      <div className='relative overflow-hidden sm:h-100 xl:h-130 sm:pb-6 xl:pb-12 sm:px-4 xl:px-10 2xl:px-0 grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5 items-end'>
        <div className='relative w-full h-53 sm:h-full sm:absolute sm:inset-0 z-0'>
          <Image
            src={urlForUncropped(backgroundImage).url()}
            alt={backgroundImage.alt}
            fill
            className='w-full h-full object-cover'
          />
        </div>

        <div className='relative z-10 col-span-full 2xl:col-span-10 2xl:col-start-2'>
          <div className='sm:max-w-xl xl:max-w-3xl'>
            <p className='xl:text-lg font-medium pt-3 sm:pt-0'>
              <span className='highlight mr-2'>{subtitle.highlightedText}</span>
              {subtitle.text}
            </p>

            <h2 className='mt-2 sm:mt-1 xl:mt-2 text-2xl sm:text-3xl xl:text-4xl'>
              {heading}
            </h2>

            <div className='mt-4 sm:mt-3 xl:mt-2'>
              <PortableText value={description} />
            </div>

            {/* Buttons */}
            <div className='flex gap-2 sm:gap-4 mt-4 xl:mt-7.5'>
              {buttons.map((button, index) => (
                <Link
                  key={button.text}
                  href={button.link}
                  className={cn(
                    buttonVariants({
                      variant: index === 0 ? 'default' : 'secondary',
                      size: 'default',
                    }),
                    'flex-1 sm:flex-initial sm:w-auto'
                  )}
                >
                  {button.text}{' '}
                  {button.highlightedText && (
                    <span className='highlight'>{button.highlightedText}</span>
                  )}
                  {index === 1 && <ArrowRight className='size-4! sm:size-6!' />}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PmoPromoSection;
