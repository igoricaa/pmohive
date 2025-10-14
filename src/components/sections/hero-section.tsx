import { cn } from '@/lib/utils';
import { urlFor, urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  subtitle: {
    text: string;
    highlightedText: string;
  };
  heading: string;
  description: string;
  buttons: {
    text: string;
    hightlightedText?: string;
    link: string;
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
    <section className='relative grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 items-center gap-2 md:gap-4'>
      <div className='md:col-span-4 md:order-2 z-0 lg:col-span-7 '>
        <div className='flex gap-2 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] ml-auto translate-x-0.5 md:translate-x-0'>
          <Image
            src={urlForUncropped(images.image1).url()}
            alt={images.image1.alt}
            width={1000}
            height={1000}
            className='w-full h-auto object-cover aspect-square hexagon-clip rotate-90'
          />
          <Image
            src={urlForUncropped(images.image2).url()}
            alt={images.image2.alt}
            width={1000}
            height={1000}
            className='w-full h-auto object-cover aspect-square hexagon-clip rotate-90'
          />
        </div>
        <div className='flex gap-2 mt-2 md:mt-4 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] md:ml-auto -translate-y-[calc(25%+2px)] md:-translate-y-[calc(25%+8px)] md:-translate-x-[calc(25%+2px)] xl:-translate-x-[calc(25%+2px)]'>
          <Image
            src={urlForUncropped(images.image3).url()}
            alt={images.image3.alt}
            width={1000}
            height={1000}
            className='w-full m h-auto object-cover aspect-square hexagon-clip rotate-90'
          />
          <Image
            src={urlForUncropped(images.image4).url()}
            alt={images.image4.alt}
            width={1000}
            height={1000}
            className='w-full h-auto object-cover aspect-square hexagon-clip rotate-90'
          />
        </div>
      </div>
      <div className='md:col-span-4 md:order-1 lg:col-span-5 z-1 md:pt-17 lg:pt-0'>
        <p className='font-medium md:text-lg'>
          {subtitle.text}{' '}
          <span className='highlight ml-2'>{subtitle.highlightedText}</span>
        </p>
        <h1 className='mt-2'>{heading}</h1>
        <p className='mt-3 xl:mt-4 text-sm max-w-xl'>{description}</p>
        <div className='flex gap-3 mt-4'>
          {buttons.map((button, index) => (
            <Link
              key={button.text}
              href={button.link}
              className={cn(
                buttonVariants({
                  variant: index === 0 ? 'default' : 'secondary',
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
