import { ArrowRight } from 'lucide-react';
import { Image } from 'next-sanity/image';
import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn, formatDate } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { Button, LATEST_POSTS_QUERYResult } from '../../../../sanity.types';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';

interface BlogSectionProps {
  subtitle: {
    text: string;
    highlightedText: string;
  };
  heading: string;
  description: PortableTextBlock[];
  ctaButton: Button;
  posts: LATEST_POSTS_QUERYResult;
  className?: string;
}

const BlogSection = ({
  subtitle,
  heading,
  description,
  ctaButton,
  posts,
  className,
}: BlogSectionProps) => {
  return (
    <section
      className={cn(
        'py-12 sm:pb-15 sm:mt-8 xl:pb-19 xl:pt-8.5 grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5',
        className
      )}
    >
      {/* Content Area */}
      <div className='md:col-span-3 2xl:col-start-2 px-side md:pr-0 flex flex-col md:max-xl:justify-between'>
        <div>
          {/* Subtitle */}
          <p className='font-medium xl:text-lg'>
            {subtitle.text}
            <span className='highlight ml-2'>{subtitle.highlightedText}</span>
          </p>

          {/* Heading */}
          <h2 className='text-[34px] sm:text-[44px] xl:text-[56px] mt-2 xl:mt-4.5'>
            {heading}
          </h2>

          {/* Description */}
          <div className='mt-3 sm:mt-4'>
            <PortableText value={description} />
          </div>
        </div>
        {/* CTA Button */}
        <Link
          key={ctaButton.text}
          href={ctaButton.link}
          className={cn(
            buttonVariants({ variant: 'default', size: 'default' }),
            'hidden md:inline-flex w-fit xl:mt-6'
          )}
        >
          {ctaButton.text}
          <ArrowRight className='size-4! sm:size-6!' />
        </Link>
      </div>

      {/* Carousel Area */}
      <div className='md:col-span-5 xl:col-span-9 2xl:col-span-8'>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full order-1 flex flex-col md:flex-col-reverse gap-3 md:gap-2.5 xl:gap-3'
        >
          {/* Carousel Content */}
          <CarouselContent className='pl-side md:pl-0'>
            {posts.map((post, index) => (
              <CarouselItem
                key={`${post.title}-${index}`}
                className={cn(
                  'basis-[82%] sm:basis-[65%] xl:basis-1/3 pl-0 pr-4 sm:pl-0 sm:pr-side group'
                )}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className='relative h-full aspect-[285/372] overflow-hidden group'>
                    {/* Background Image */}
                    <div className='absolute inset-0 -z-20'>
                      <Image
                        src={urlForUncropped(post.featuredMedia).url()}
                        alt={post.title}
                        width={285}
                        height={372}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/45 -z-10' />

                    {/* Content */}
                    <div className='px-4 pb-4 pt-5 z-0 h-full flex flex-col justify-between'>
                      <p className='text-sm'>{formatDate(post.date)}</p>

                      <div className='xl:translate-y-25 xl:group-hover:translate-y-0 transition-[translate] duration-200'>
                        <h3 className='text-lg sm:text-3xl xl:text-2xl'>
                          {post.title}
                        </h3>

                        <div className='mt-2 sm:mt-3 xl:mt-5 z-0 max-w-md transition-opacity xl:opacity-0 xl:group-hover:opacity-100 delay-0 xl:group-hover:delay-200 duration-100 xl:group-hover:duration-200'>
                          <div className='line-clamp-3 '>
                            <PortableText
                              value={post.excerpt as PortableTextBlock[]}
                            />
                          </div>
                          <button className='font-bold text-lg font-sans mt-3 sm:max-lg:mt-4 flex gap-1 items-center'>
                            <ArrowRight className='size-5!' /> Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
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
      </div>
    </section>
  );
};

export default BlogSection;
