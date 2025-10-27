'use client';

import { ViewTransition } from 'react';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { CaseStudy } from '../../../../../sanity.types';
import Heading from '@/components/ui/heading';
import HeadingBlock from '@/components/case-study/heading-block';
import HeadingTextBlock from '@/components/case-study/heading-text-block';
import TextareaBlock from '@/components/case-study/textarea-block';
import ImageBlock from '@/components/case-study/image-block';
import TextGridBlock from '@/components/case-study/text-grid-block';
import SpacerBlock from '@/components/case-study/spacer-block';
import DividerBlock from '@/components/case-study/divider-block';
import { AnimateInView } from '@/components/animate-in-view';
import { UseInViewOptions } from 'motion/react';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

type MarginType = UseInViewOptions['margin'];

export default function ProjectDetailClient({
  project,
}: {
  project: CaseStudy;
}) {
  const slug = project.slug.current;

  return (
    <ViewTransition>
      <div className='min-h-screen w-screen relative'>
        <div className='xl:grid xl:grid-cols-12 xl:gap-x-5 px-side'>
          <div className='xl:col-span-10 xl:col-start-2 space-y-12'>
            {/* Back Button */}
            <div className='mb-8'>
              <AnimateInView className='hidden xl:block fixed top-48 left-[var(--padding-side)]'>
                <Link
                  href='/projects'
                  className='bg-primary rounded-full size-10 flex items-center justify-center'
                >
                  <ArrowLeftIcon className='size-5' color='#000' />
                </Link>
              </AnimateInView>
            </div>

            {/* Featured Image with View Transition */}
            <ViewTransition name={`project-image-${slug}`}>
              <div className='aspect-[343/161] sm:aspect-[786/422] xl:aspect-[1375/700] relative'>
                <Image
                  src={urlFor(project.mainInfo.featuredImage).url()}
                  alt={project.mainInfo.featuredImage.alt}
                  width={1375}
                  height={700}
                  className='h-full w-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/65'></div>
              </div>
            </ViewTransition>

            {/* Title with View Transition */}
            <div className='relative -mt-8 sm:-mt-21 xl:-mt-24 2xl:-mt-28 z-2'>
              <ViewTransition name={`project-title-${slug}`}>
                <Heading
                  level='h1'
                  headingClassName='xl:text-[54px] 2xl:text-[64px]'
                >
                  {project.mainInfo.title}
                </Heading>
              </ViewTransition>
            </div>

            {/* Project Info */}
            <div className='border-b border-white/30 pb-6 xl:pb-8'>
              <p className='font-mono text-sm sm:text-base'>
                <span className='highlight font-bold'>Client:</span>{' '}
                {project.mainInfo.client}
              </p>
              <p className='font-mono text-sm sm:text-base mt-2'>
                <span className='highlight font-bold'>Project:</span>{' '}
                {project.mainInfo.projectDescription}
              </p>
            </div>

            {/* Content Blocks */}
            <div className='space-y-8 mt-10'>
              {project.content?.map((block, index) => {
                const animationProps = {
                  offset: 80,
                  direction: 'up' as const,
                  inViewMargin: '-100px' as MarginType,
                };

                switch (block._type) {
                  case 'headingBlock':
                    return (
                      <AnimateInView key={block._key} {...animationProps}>
                        <HeadingBlock heading={block.heading} />
                      </AnimateInView>
                    );

                  case 'headingTextBlock':
                    return (
                      <AnimateInView key={block._key} {...animationProps}>
                        <HeadingTextBlock
                          heading={block.heading}
                          content={block.content}
                        />
                      </AnimateInView>
                    );

                  case 'textareaBlock':
                    return (
                      <AnimateInView key={block._key} {...animationProps}>
                        <TextareaBlock content={block.content} />
                      </AnimateInView>
                    );

                  case 'imageBlock':
                    return (
                      <AnimateInView key={block._key} {...animationProps}>
                        <ImageBlock
                          _type={block._type}
                          image={block.image}
                          subtitle={block.subtitle}
                          aspectRatio={block.aspectRatio}
                        />
                      </AnimateInView>
                    );

                  case 'textGridBlock':
                    return (
                      <TextGridBlock
                        key={block._key}
                        heading={block.heading}
                        content={block.content}
                        items={block.items}
                        animationProps={animationProps}
                      />
                    );

                  case 'spacerBlock':
                    return (
                      <SpacerBlock key={block._key} height={block.height} />
                    );

                  case 'dividerBlock':
                    return (
                      <DividerBlock key={block._key} height={block.height} />
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
