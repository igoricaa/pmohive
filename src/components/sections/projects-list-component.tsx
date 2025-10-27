'use client';

import { ViewTransition } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { CASE_STUDIES_QUERYResult } from '../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { cn } from '@/lib/utils';

const ProjectsListComponent = ({
  projects,
  className,
}: {
  projects: CASE_STUDIES_QUERYResult;
  className?: string;
}) => {
  const [isHoveredIndex, setIsHoveredIndex] = useState(0);

  return (
    <ViewTransition>
      <div
        className={cn(
          'w-screen relative grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-x-4 xl:gap-x-5 gap-y-15 px-side',
          className
        )}
      >
        {/* Featured Image */}
        <ViewTransition name={`project-image-${projects[isHoveredIndex].slug}`}>
          <div className='aspect-[343/161] sm:aspect-[786/422] xl:aspect-[1375/700] col-span-full sm:col-span-4 xl:col-span-6 sm:col-start-5 xl:col-start-7'>
            <Image
              src={urlFor(
                projects[isHoveredIndex].mainInfo.featuredImage
              ).url()}
              alt={projects[isHoveredIndex].mainInfo.featuredImage.alt}
              width={678}
              height={463}
              className='h-full w-full object-cover'
            />
          </div>
        </ViewTransition>

        {/* Projects List */}
        <ul className='absolute bottom-12 left-[var(--padding-side)] flex flex-col gap-2 sm:w-[calc(50%-var(--padding-side))]'>
          <li className='flex w-full items-center gap-3 text-sm xl:text-base font-mono mb-2 xl:mb-3'>
            case studies
            <span className='bg-foreground h-px flex-1 opacity-50'></span>
          </li>

          {projects.map((project, index) => (
            <li
              key={project.mainInfo.title}
              style={{
                opacity: isHoveredIndex === index ? 1 : 0.5,
              }}
              className={cn(
                'font-sans relative flex w-fit cursor-pointer items-center text-xl sm:text-2xl xl:text-[32px] leading-none font-semibold text-white transition-opacity duration-300',
                'hover:text-primary',
                isHoveredIndex === index && 'text-primary'
              )}
              onMouseEnter={() => setIsHoveredIndex(index)}
            >
              <Link href={`/projects/${project.slug}`}>
                <ViewTransition name={`project-title-${project.slug}`}>
                  <span className='inline-block'>{project.mainInfo.title}</span>
                </ViewTransition>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ViewTransition>
  );
};

export { ProjectsListComponent };
