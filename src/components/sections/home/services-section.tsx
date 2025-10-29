import { Link } from '@/components/motion-link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Heading from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import ImageNext from 'next/image';

const ServicesSection = ({
  serviceItems,
}: {
  serviceItems: {
    heading: string;
    subtitle: {
      text: string;
      highlightedText?: string | null;
    };
    slug: string;
    image: SanityImageSource & { alt: string };
    excerpt: string;
  }[];
}) => {
  return (
    <>
      <div className='px-side grid sm:max-lg:hidden grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4 sm:gap-3 xl:gap-6'>
        {serviceItems.map((item, index) => (
          <article
            key={`${item.heading}-${index}`}
            className='col-span-1 sm:col-span-4 xl:col-span-6 3xl:col-span-3 relative px-3 pb-3 xl:px-4 xl:pb-7 flex flex-col justify-end gap-2 aspect-[447/344] group hover:-translate-y-5 transition-[translate] ease-out duration-300 overflow-hidden hover:will-change-transform'
          >
            <Link href={`/industry-focus/${item.slug}`}>
              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/65 -z-5' />
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
                unoptimized
                className='-z-5 object-cover absolute top-2 lg:top-6 right-2 lg:right-6 size-16 lg:size-22 2xl:size-28 lg:opacity-0 lg:invisible group-hover:visible group-hover:opacity-100 transition-[opacity,visibility,translate] duration-300 ease-out lg:-translate-x-5 lg:translate-y-5 group-hover:translate-0'
              />

              <div className='transition-[max-height] duration-300 xl:max-h-25 xl:group-hover:max-h-60'>
                <Heading
                  level='p'
                  className='text-lg sm:text-[22px] xl:text-[32px] 2xl:text-[40px] leading-none font-bold h-fit'
                  subtitleClassName='text-sm xl:text-lg'
                  subtitle={{
                    text: item.subtitle.text,
                    highlightedText: item.subtitle.highlightedText,
                  }}
                >
                  {item.subtitle.text} Centres
                </Heading>

                <div className='transition-[opacity,max-height] xl:opacity-0 xl:group-hover:opacity-100 duration-300 xl:group-hover:duration-300 ease-out xl:max-h-0 xl:group-hover:max-h-50 overflow-hidden'>
                  <p className='pt-2 font-mono text-sm 2xl:text-base'>
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <Carousel
        opts={{
          align: 'start',
        }}
        className='hidden sm:max-lg:flex w-full order-1 flex-col md:flex-col-reverse gap-3 md:gap-2.5 xl:gap-3'
      >
        {/* Carousel Content */}
        <CarouselContent className='pl-side md:pl-0'>
          {serviceItems.map((item, index) => (
            <CarouselItem
              key={`${item.heading}-${index}`}
              className={cn(
                'basis-[82%] sm:basis-[65%] pl-0 pr-4 sm:pl-0 sm:pr-side '
              )}
            >
              <article className='col-span-1 sm:col-span-2 xl:col-span-4 relative px-3 pb-3 xl:px-4 xl:pb-7 flex flex-col justify-end gap-2 aspect-[447/344] group hover:-translate-y-5 transition-[translate] ease-out duration-300 overflow-hidden hover:will-change-transform'>
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/65 -z-5' />
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
                  unoptimized
                  className='-z-5 object-cover absolute top-6 right-6 w-22 h-22'
                />

                <div className='transition-[max-height] duration-300 xl:max-h-25 xl:group-hover:max-h-60'>
                  <Heading
                    level='p'
                    className='text-lg sm:text-[22px] xl:text-[32px] leading-none font-bold h-fit'
                    subtitleClassName='text-sm xl:text-lg'
                    subtitle={{
                      text: item.subtitle.text,
                      highlightedText: item.subtitle.highlightedText,
                    }}
                  >
                    {item.heading}
                  </Heading>

                  <div className='transition-[opacity,max-height] xl:opacity-0 xl:group-hover:opacity-100 duration-300 xl:group-hover:duration-300 ease-out xl:max-h-0 xl:group-hover:max-h-25 overflow-hidden'>
                    <p className='pt-2 font-mono text-sm 2xl:text-base'>
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom positioned navigation - below carousel on mobile, above on tablet */}
        <div className='flex justify-end items-center gap-3 md:z-10 pr-side'>
          <CarouselPrevious
            variant='navigation'
            size='navigation'
            className='static translate-y-0 rotate-180'
          />
          <CarouselNext
            variant='navigation'
            size='navigation'
            className='static translate-y-0 bg-primary'
          />
        </div>
      </Carousel>
    </>
  );
};

export default ServicesSection;
