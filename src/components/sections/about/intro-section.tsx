import Heading from '@/components/ui/heading';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';

interface IntroSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading: string;
  backgroundImage: SanityImageSource & { alt: string };
}

const IntroSection = ({
  subtitle,
  heading,
  backgroundImage,
}: IntroSectionProps) => {
  return (
    <section className='px-side relative sm:h-80 md:h-96 lg:h-120 xl:h-130 2xl:h-175 sm:flex sm:flex-col sm:justify-center'>
      <div className='sm:w-6/8 xl:w-9/12 h-64 w-full sm:h-full sm:aspect-[580/302] xl:aspect-[991/478] relative sm:absolute sm:right-[var(--padding-side)] sm:top-0 -z-1 '>
        <div className='absolute inset-0 bg-gradient-to-bl from-transparent from-30% to-black/60'></div>
        <Image
          src={urlForUncropped(backgroundImage).url()}
          alt={backgroundImage.alt}
          width={991}
          height={478}
          quality={100}
          priority
          className='object-cover w-full h-full'
        />
      </div>

      <Heading
        level='h1'
        subtitle={{
          text: subtitle.text,
          highlightedText: subtitle.highlightedText,
        }}
        className='sm:max-w-5/8 xl:max-w-5/12 -mt-8'
      >
        {heading}
      </Heading>
    </section>
  );
};

export default IntroSection;
