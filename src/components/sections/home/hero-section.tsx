import { cn } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/ui/heading';

interface HeroSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading: string;
  description: string;
  buttons: {
    text: string;
    hightlightedText?: string | null;
    link: string;
    variant?: string;
  }[];
  images: {
    image1: SanityImageSource & { alt: string };
    image2: SanityImageSource & { alt: string };
    image3: SanityImageSource & { alt: string };
    image4: SanityImageSource & { alt: string };
  };
}

const HeroSection = ({
  subtitle,
  heading,
  description,
  buttons,
  images,
}: HeroSectionProps) => {
  return (
    <section className='px-side relative grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 items-center gap-2 md:gap-4'>
      <div className='md:col-span-4 md:order-2 z-0 lg:col-span-7 2xl:col-span-6'>
        <div className='flex gap-2 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] ml-auto translate-x-0.5 md:translate-x-0'>
          <Image
            src={urlForUncropped(images.image1).url()}
            alt={images.image1.alt}
            width={473}
            height={546}
            className='w-full h-auto object-cover'
          />
          <Image
            src={urlForUncropped(images.image2).url()}
            alt={images.image2.alt}
            width={473}
            height={546}
            className='w-full h-auto object-cover'
          />
        </div>
        <div className='flex gap-2 mt-2 md:mt-4 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] md:ml-auto -translate-y-[calc(25%+2px)] md:-translate-y-[calc(25%+8px)] md:-translate-x-[calc(25%+2px)] xl:-translate-x-[calc(25%+2px)]'>
          <Image
            src={urlForUncropped(images.image3).url()}
            alt={images.image3.alt}
            width={473}
            height={546}
            className='w-full m h-auto object-cover'
          />
          <Image
            src={urlForUncropped(images.image4).url()}
            alt={images.image4.alt}
            width={473}
            height={546}
            className='w-full h-auto object-cover'
          />
        </div>
      </div>
      <div className='md:col-span-4 lg:col-span-5 2xl:col-span-4 2xl:col-start-2 md:order-1 z-1 md:pt-17 lg:pt-0'>
        <Heading
          level='h1'
          subtitle={{
            text: subtitle.text,
            highlightedText: subtitle.highlightedText,
          }}
        >
          {heading}
        </Heading>

        <p className='mt-3 xl:mt-4 text-sm max-w-xl'>{description}</p>
        <div className='flex gap-3 mt-4'>
          {buttons.map((button, index) => (
            <Link
              key={button.text}
              href={button.link}
              className={cn(
                buttonVariants({
                  variant: (button.variant as 'default' | 'secondary') || 'default',
                })
              )}
            >
              {button.text}{' '}
              {button.hightlightedText && (
                <span className='highlight'>{button.hightlightedText}</span>
              )}
              {index === 1 && <ArrowRight />}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
