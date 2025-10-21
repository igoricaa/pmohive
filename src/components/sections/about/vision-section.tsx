import PortableText from '@/components/portable-text';
import Subtitle from '@/components/ui/subtitle';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';

interface VisionSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  description: PortableTextBlock[];
  backgroundImage: SanityImageSource & { alt: string };
}

const VisionSection = ({
  subtitle,
  description,
  backgroundImage,
}: VisionSectionProps) => {
  return (
    <section className='px-side md:grid md:grid-cols-2 xl:grid-cols-12 gap-4 xl:gap-5 mt-11 sm:mt-16 xl:mt-26'>
      <div className='col-span-1 xl:col-span-5 xl:col-start-2 2xl:col-span-4 2xl:col-start-3 w-full h-55 md:h-full xl:aspect-[580/681]'>
        <Image
          src={urlForUncropped(backgroundImage).url()}
          alt={backgroundImage.alt}
          width={560}
          height={681}
          quality={100}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='col-span-1 xl:col-span-5 2xl:col-span-4 mt-3 sm:mt-0  justify-center flex flex-col'>
        <Subtitle highlightedText={subtitle.highlightedText}>
          {subtitle.text}
        </Subtitle>
        <div className='mt-2'>
          <PortableText
            value={description}
            className='[&>p:nth-of-type(2)]:mt-6'
            paragraphClassName='text-2xl sm:text-[26px] 2xl:text-[32px] font-semibold leading-none '
          />
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
