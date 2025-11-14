import { Image } from 'next-sanity/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { TeamMember } from '../../../sanity.types';
import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Heading from '@/components/ui/heading';
import AnimatedButton from '../animated-button';
import { AnimateInView } from '../animate-in-view';
import SocialIconAnimated from '../social-icon-animated';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface CareersSectionProps {
  subtitle: {
    text: string;
    highlightedText?: string | null;
  };
  heading: string;
  description: PortableTextBlock[];
  ctaButton?: {
    text: string;
    link: string;
    variant?: string;
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

      <div className='md:col-span-4 2xl:col-span-3 2xl:col-start-2 px-side md:pr-0 flex flex-col md:max-xl:justify-between overflow-hidden'>
        <AnimateInView
          offset={80}
          direction='right'
          inViewMargin='-100px'
          className='md:col-span-4 2xl:col-span-3 2xl:col-start-2'
        >
          <div>
            <Heading
              level='h2'
              subtitle={{
                text: subtitle.text,
                highlightedText: subtitle.highlightedText || null,
              }}
              spacing='mt-4'
            >
              {heading}
            </Heading>

            {/* Description */}
            <div className='mt-3 sm:mt-4'>
              <PortableText value={description} />
            </div>
          </div>
          {/* CTA Button */}
          {ctaButton && (
            <AnimatedButton
              text={ctaButton.text}
              href={ctaButton.link}
              variant={ctaButton.variant as 'default' | 'secondary'}
              className='hidden md:inline-flex w-fit xl:mt-6'
              icon={{ type: 'lucide', name: 'ArrowRight' }}
              iconClassName='size-4! sm:size-6!'
            />
          )}
        </AnimateInView>
      </div>

      {/* Carousel Area */}
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
                <AnimateInView
                  offset={80}
                  direction='left'
                  inViewMargin='-100px'
                  delay={index * 0.3}
                  disableOnMobile={true}
                >
                  <div className='relative h-full aspect-[285/372] overflow-hidden group'>
                    {/* Background Image */}
                    <div className='absolute inset-0 -z-20'>
                      <Image
                        src={urlFor(member.image).url()}
                        alt={member.image.alt}
                        width={1140}
                        height={1488}
                        sizes='(max-width: 768px) 82vw, (max-width: 1280px) 35vw, 33vw'
                        className='w-full h-full object-cover'
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent from-50% to-black/45 -z-10' />

                    {/* Content */}
                    <div className='pl-4 pr-5 xl:pl-8 xl:pr-11 pb-4 xl:pb-7 pt-3 z-0 h-full flex flex-col justify-between'>
                      {member.socials && member.socials.length > 0 && (
                        <div className='flex items-center gap-2'>
                          {member.socials.map((social) => (
                            <SocialIconAnimated
                              key={social.title}
                              icon={social.icon as SanityImageSource}
                              title={social.title}
                              url={social.url}
                            />
                          ))}
                        </div>
                      )}

                      <div>
                        <h3 className='text-lg sm:text-3xl xl:text-2xl'>
                          {member.name}
                        </h3>

                        <div className='mt-2 sm:mt-3 xl:mt-5 z-0 max-w-md'>
                          <PortableText
                            value={member.bio as PortableTextBlock[]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateInView>
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
                <AnimatedButton
                  text='Careers & Culture'
                  href='/careers-and-culture'
                  variant='secondary'
                  icon={{ type: 'lucide', name: 'ArrowRight' }}
                  iconClassName='size-4! sm:size-6!'
                  className='w-full mt-auto'
                />
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
