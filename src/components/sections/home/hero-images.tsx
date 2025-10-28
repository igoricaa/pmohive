'use client';

import { motion } from 'motion/react';
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useAppContext } from '@/components/providers/app-ready-provider';

interface HeroImagesProps {
  images: {
    image1: SanityImageSource & { alt: string };
    image2: SanityImageSource & { alt: string };
    image3: SanityImageSource & { alt: string };
    image4: SanityImageSource & { alt: string };
  };
}

export function HeroImages({ images }: HeroImagesProps) {
  const { isAppReady } = useAppContext();

  const imageAnimations = [
    { initial: { opacity: 0, x: -100, y: -100, scale: 4 }, delay: 0 },
    { initial: { opacity: 0, x: 100, y: -100, scale: 4 }, delay: 0.1 },
    { initial: { opacity: 0, x: -100, y: 100, scale: 4 }, delay: 0.2 },
    { initial: { opacity: 0, x: 100, y: 100, scale: 4 }, delay: 0.3 },
  ];

  return (
    <div className='md:col-span-4 md:order-2 z-0 lg:col-span-7 2xl:col-span-6'>
      <div className='grid grid-cols-2 gap-2 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] ml-auto translate-x-0.5 md:translate-x-0'>
        <motion.div
          initial={imageAnimations[0].initial}
          animate={
            isAppReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined
          }
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: imageAnimations[0].delay,
          }}
        >
          <Image
            src={urlForUncropped(images.image1).url()}
            alt={images.image1.alt}
            width={473}
            height={546}
            loading='eager'
            fetchPriority='high'
            className='w-full h-auto object-cover'
          />
        </motion.div>
        <motion.div
          initial={imageAnimations[1].initial}
          animate={
            isAppReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined
          }
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: imageAnimations[1].delay,
          }}
        >
          <Image
            src={urlForUncropped(images.image2).url()}
            alt={images.image2.alt}
            width={473}
            height={546}
            loading='eager'
            fetchPriority='high'
            className='w-full h-auto object-cover'
          />
        </motion.div>
      </div>
      <div className='grid grid-cols-2 gap-2 mt-2 md:mt-4 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)] md:ml-auto -translate-y-[calc(25%+2px)] md:-translate-y-[calc(25%+8px)] md:-translate-x-[calc(25%+2px)] xl:-translate-x-[calc(25%+2px)]'>
        <motion.div
          initial={imageAnimations[2].initial}
          animate={
            isAppReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined
          }
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: imageAnimations[2].delay,
          }}
        >
          <Image
            src={urlForUncropped(images.image3).url()}
            alt={images.image3.alt}
            width={473}
            height={546}
            loading='eager'
            fetchPriority='high'
            className='w-full m h-auto object-cover'
          />
        </motion.div>
        <motion.div
          initial={imageAnimations[3].initial}
          animate={
            isAppReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined
          }
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: imageAnimations[3].delay,
          }}
        >
          <Image
            src={urlForUncropped(images.image4).url()}
            alt={images.image4.alt}
            width={473}
            height={546}
            loading='eager'
            fetchPriority='high'
            className='w-full h-auto object-cover'
          />
        </motion.div>
      </div>
    </div>
  );
}
