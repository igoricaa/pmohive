import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import {
  Button,
  LATEST_POSTS_QUERYResult,
  Post,
} from '../../../../sanity.types';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Heading from '@/components/ui/heading';
import PostCard from '@/components/blog/post-card';
import AnimatedButton from '@/components/animated-button';
import { AnimateInView } from '@/components/animate-in-view';

interface BlogSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
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
        <AnimateInView offset={40} direction='right' inViewMargin='-200px'>
          <div>
            <Heading
              level='h2'
              subtitle={{
                text: subtitle.text,
                highlightedText: subtitle.highlightedText || null,
              }}
            >
              {heading}
            </Heading>

            {/* Description */}
            <div className='mt-3 sm:mt-4'>
              <PortableText value={description} />
            </div>
          </div>
          {/* CTA Button */}
          <AnimatedButton
            text={ctaButton.text}
            href={ctaButton.link}
            variant={ctaButton.variant as 'default' | 'secondary'}
            icon={{ type: 'lucide', name: 'ArrowRight' }}
            iconClassName='size-4! sm:size-6!'
            className='hidden md:inline-flex w-fit xl:mt-6'
          />
        </AnimateInView>
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
                  'basis-[82%] sm:basis-[65%] xl:basis-1/3 pl-0 pr-4 sm:pl-0 sm:pr-side '
                )}
              >
                <AnimateInView
                  offset={80}
                  direction='left'
                  inViewMargin='-200px'
                  delay={index * 0.3}
                  disableOnMobile={true}
                >
                  <PostCard post={post as unknown as Post} />
                </AnimateInView>
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
