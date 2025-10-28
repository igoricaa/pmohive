import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Heading from '@/components/ui/heading';
import AnimatedButton from '@/components/animated-button';
import { AnimateOnLoad } from '@/components/animate-on-load';
import { HeroImages } from './hero-images';

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
    <section className='px-side relative grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 items-center gap-2 md:gap-4 pt-25 sm:pt-30 lg:pt-34 xl:pt-36'>
      <HeroImages images={images} />
      <AnimateOnLoad className='md:col-span-4 lg:col-span-5 2xl:col-span-4 2xl:col-start-2 md:order-1 z-1 md:pt-17 lg:pt-0'>
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
            <AnimatedButton
              key={button.text}
              text={button.text}
              href={button.link}
              variant={button.variant as 'default' | 'secondary'}
              icon={
                index === 1 ? { type: 'lucide', name: 'ArrowRight' } : undefined
              }
              highlightedText={button.hightlightedText || undefined}
            />
          ))}
        </div>
      </AnimateOnLoad>
    </section>
  );
};

export default HeroSection;
