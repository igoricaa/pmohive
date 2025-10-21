import Heading from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';

interface ApproachSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading: string;
  items: {
    icon: SanityImageSource & { alt: string };
    title: string;
    description: string;
    _key: string;
  }[];
  className?: string;
}

export default function ApproachSection({
  subtitle,
  heading,
  items,
  className,
}: ApproachSectionProps) {
  return (
    <section className='px-side grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5 mt-9 sm:mt-13 xl:mt-18 2xl:mt-20 '>
      <Heading
        level='h2'
        subtitle={{
          text: subtitle.text,
          highlightedText: subtitle.highlightedText || null,
        }}
        spacing='mt-2'
        className='col-span-full 2xl:col-span-10 2xl:col-start-2'
      >
        {heading}
      </Heading>

      <div className='col-span-full 2xl:col-span-10 2xl:col-start-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-5 mt-8 xl:mt-15 '>
        {items.map((item, index) => (
          <article key={item._key} className={cn('max-w-64 sm:max-w-none', index % 2 !== 0 && 'ml-auto')}>
            <Image
              src={urlForUncropped(item.icon).url()}
              alt={item.icon.alt}
              width={156}
              height={156}
              unoptimized
              className='size-28 sm:size-39'
            />
            <p className='font-bold text-lg sm:text-[22px] xl:text-2xl mt-3 sm:mt-6'>
              {item.title}
            </p>
            <p className='font-mono mt-2 sm:mt-3 text-sm'>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
