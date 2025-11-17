'use client';

import { ViewTransition } from 'react';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';
import { CASE_STUDIES_QUERYResult } from '../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import { ArrowRightIcon } from 'lucide-react';
import { buttonVariants } from '../ui/button';

const ProjectsListComponent = ({
  projects,
  className,
}: {
  projects: CASE_STUDIES_QUERYResult;
  className?: string;
}) => {
  const [isHoveredIndex, setIsHoveredIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Sync carousel index to state when swiping
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', () => {
      setIsHoveredIndex(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  // Handle list item click on mobile/tablet
  const handleProjectClick = useCallback(
    (index: number) => {
      if (isDesktop) return; // Desktop uses hover, not click

      setIsHoveredIndex(index);
      carouselApi?.scrollTo(index);
    },
    [isDesktop, carouselApi]
  );

  return (
    <ViewTransition>
      <div
        className={cn(
          'relative grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-x-4 xl:gap-x-5 gap-y-15 px-side',
          className
        )}
      >
        {/* Featured Image - Desktop: Static, Mobile/Tablet: Carousel */}
        {isDesktop ? (
          <ViewTransition
            name={`project-image-${projects[isHoveredIndex].slug}`}
          >
            <div className='hidden lg:block aspect-[343/161] sm:aspect-[786/422] xl:aspect-[1375/700] col-span-full sm:col-span-4 xl:col-span-6 sm:col-start-5 xl:col-start-7'>
              <Image
                src={urlFor(
                  projects[isHoveredIndex].mainInfo.featuredImage
                ).url()}
                alt={projects[isHoveredIndex].mainInfo.featuredImage.alt}
                width={678}
                height={463}
                sizes='(max-width: 768px) 100vw, 50vw'
                className='h-full w-full object-cover'
              />
            </div>
          </ViewTransition>
        ) : (
          <div className='lg:hidden col-span-full sm:col-span-4 xl:col-span-6 sm:col-start-5 xl:col-start-7'>
            <Carousel
              setApi={setCarouselApi}
              opts={{
                loop: true,
                align: 'start',
              }}
              className='w-full'
            >
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.slug}>
                    <ViewTransition name={`project-image-${project.slug}`}>
                      <div className='aspect-[343/161] sm:aspect-[786/422]'>
                        <Image
                          src={urlFor(project.mainInfo.featuredImage).url()}
                          alt={project.mainInfo.featuredImage.alt}
                          width={678}
                          height={463}
                          sizes='(max-width: 768px) 100vw, 50vw'
                          className='h-full w-full object-cover'
                        />
                      </div>
                    </ViewTransition>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className='flex justify-between items-center mt-4'>
                <Link
                  href={`/projects/${projects[isHoveredIndex].slug}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'flex items-center gap-2.5'
                  )}
                >
                  View Case
                  <ArrowRightIcon color='#fff' size={16} />
                </Link>
                <div className='flex items-center gap-1.5'>
                  <CarouselPrevious className='relative translate-none left-auto rotate-180' />
                  <CarouselNext className='relative translate-none right-auto' />
                </div>
              </div>
            </Carousel>
          </div>
        )}

        {/* Projects List */}

        <div className='absolute bottom-12 left-0 col-span-full sm:w-[calc(50%-var(--padding-side))]'>
          <p className='flex w-full items-center gap-3 text-sm xl:text-base font-mono mb-2 xl:mb-3'>
            case studies
          </p>
          <ul className='flex flex-col gap-5 '>
            {projects.map((project, index) => (
              <li
                key={project.mainInfo.title}
                style={{
                  opacity: isHoveredIndex === index ? 1 : 0.5,
                }}
                className={cn(
                  'font-sans relative flex w-fit cursor-pointer items-center text-xl sm:text-2xl xl:text-2xl 2xl:text-4xl leading-none font-semibold text-white transition-opacity duration-300',
                  'hover:text-primary',
                  isHoveredIndex === index && 'text-primary'
                )}
                onMouseEnter={
                  isDesktop ? () => setIsHoveredIndex(index) : undefined
                }
                onClick={
                  !isDesktop ? () => handleProjectClick(index) : undefined
                }
              >
                {isDesktop ? (
                  <Link href={`/projects/${project.slug}`}>
                    <ViewTransition name={`project-title-${project.slug}`}>
                      <span className='inline-block'>
                        {project.mainInfo.title}
                      </span>
                    </ViewTransition>
                  </Link>
                ) : (
                  <ViewTransition name={`project-title-${project.slug}`}>
                    <span className='inline-block'>
                      {project.mainInfo.title}
                    </span>
                  </ViewTransition>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ViewTransition>
  );
};

export { ProjectsListComponent };
