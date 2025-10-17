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
import { cn } from '@/lib/utils';
import { urlForUncropped } from '@/sanity/lib/image';
import { TeamMember } from '../../../../sanity.types';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';

interface CareersSectionProps {
  subtitle: {
    text: string;
    highlightedText: string;
  };
  heading: string;
  description: PortableTextBlock[];
  ctaButton: {
    text: string;
    link: string;
  };
  teamMembers: TeamMember[];
  className?: string;
}

const CareersSection = ({
  subtitle,
  heading,
  description,
  ctaButton,
  teamMembers,
  className,
}: CareersSectionProps) => {
  return (
    <section
      className={cn(
        'grid grid-cols-1 md:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5',
        className
      )}
    >
      {/* Content Area */}
      <div className='md:col-span-4 2xl:col-span-3 2xl:col-start-2 px-side md:pr-0 flex flex-col md:max-xl:justify-between'>
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
      {/* xl:pr-[calc(var(--padding-side)-16px)] */}
      {/* xl:pr-side */}
      <div className='md:col-span-4 xl:col-span-8'>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full order-1 flex flex-col md:flex-col-reverse gap-3 md:gap-2.5 xl:gap-3'
        >
          {/* Carousel Content */}
          <CarouselContent className='pl-side md:pl-0'>
            {teamMembers.map((member, index) => (
              <CarouselItem
                key={`${member.name}-${index}`}
                className={cn(
                  'basis-[82%] sm:basis-[70%] xl:basis-1/2 pl-0 pr-4 sm:pl-0 sm:pr-side'
                )}
              >
                <div className='relative h-full aspect-[285/372] overflow-hidden group'>
                  {/* Background Image */}
                  <div className='absolute inset-0 -z-20'>
                    <Image
                      src={urlForUncropped(member.image).url()}
                      alt={member.image.alt}
                      width={285}
                      height={372}
                      className='w-full h-full object-cover'
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/45 -z-10' />

                  {/* Content */}
                  <div className='pl-4 pr-5 xl:pl-8 xl:pr-11 pb-4 xl:pb-7 z-0 h-full flex flex-col justify-end'>
                    <h3 className='text-lg sm:text-3xl xl:text-2xl'>
                      {member.name}
                    </h3>

                    <div className='mt-2 sm:mt-3 xl:mt-5 z-0 max-w-md'>
                      <PortableText value={member.bio as PortableTextBlock[]} />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem
              className={cn(
                'basis-[82%] sm:basis-[70%] xl:basis-1/2 pl-0 pr-side'
              )}
            >
              <div className='pt-16 2xl:pt-24 pb-4 xl:pb-7 px-4 flex flex-col h-full rounded-[8px] border-1 border-primary'>
                <h3 className='text-lg xl:text-3xl 2xl:text-4xl text-center'>
                  Looking for the next step in your career?
                </h3>
                <p className='text-center text-sm 2xl:text-base mt-3 2xl:mt-4'>
                  Keep na eye on our carrer page for future openings
                </p>
                <Link
                  href='/careers-and-culture'
                  className={cn(
                    buttonVariants({ variant: 'secondary', size: 'default' }),
                    'w-full mt-auto'
                  )}
                >
                  Careers & Culture
                  <ArrowRight className='size-4! sm:size-6!' />
                </Link>
              </div>
            </CarouselItem>
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

export default CareersSection;
