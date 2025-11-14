'use client';

import { motion } from 'motion/react';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useAppContext } from '@/components/providers/app-ready-provider';

type HeroImagesProps = {
  images: {
    image1: SanityImageSource & { alt: string };
    image2: SanityImageSource & { alt: string };
    image3: SanityImageSource & { alt: string };
    image4: SanityImageSource & { alt: string };
  };
};

type AnimatedImageProps = {
  image: SanityImageSource & { alt: string };
  index: number;
  isAppReady: boolean;
};

const TRANSITION = {
  duration: 0.5,
  ease: 'easeOut' as const,
};

const IMAGE_DIMENSIONS = { width: 473, height: 546 };

const GRID_CLASSES = {
  base: 'grid grid-cols-2 gap-2 max-w-[calc(80%)] md:max-w-full xl:max-w-[calc(82%)]',
  top: 'ml-auto translate-x-0.5 md:translate-x-0',
  bottom:
    'mt-2 md:mt-4 md:ml-auto -translate-y-[calc(25%+2px)] md:-translate-y-[calc(25%+8px)] md:-translate-x-[calc(25%+2px)] xl:-translate-x-[calc(25%+2px)]',
};

function AnimatedImage({ image, index, isAppReady }: AnimatedImageProps) {
  const xOffset = index % 2 === 0 ? -100 : 100;
  const yOffset = index < 2 ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset, y: yOffset, scale: 4 }}
      animate={isAppReady ? { opacity: 1, x: 0, y: 0, scale: 1 } : undefined}
      transition={{ ...TRANSITION, delay: index * 0.1 }}
      style={{ willChange: isAppReady ? 'transform, opacity' : 'auto' }}
    >
      <Image
        src={urlFor(image).url()}
        alt={image.alt}
        {...IMAGE_DIMENSIONS}
        loading='eager'
        fetchPriority='high'
        className='w-full h-auto object-cover'
      />
    </motion.div>
  );
}

export function HeroImages({ images }: HeroImagesProps) {
  const { isAppReady } = useAppContext();
  const imageArray = [
    images.image1,
    images.image2,
    images.image3,
    images.image4,
  ];

  return (
    <div className='md:col-span-4 md:order-2 z-0 lg:col-span-7 2xl:col-span-6'>
      <div className={`${GRID_CLASSES.base} ${GRID_CLASSES.top}`}>
        {imageArray.slice(0, 2).map((image, idx) => (
          <AnimatedImage
            key={idx}
            image={image}
            index={idx}
            isAppReady={isAppReady}
          />
        ))}
      </div>
      <div className={`${GRID_CLASSES.base} ${GRID_CLASSES.bottom}`}>
        {imageArray.slice(2, 4).map((image, idx) => (
          <AnimatedImage
            key={idx}
            image={image}
            index={idx + 2}
            isAppReady={isAppReady}
          />
        ))}
      </div>
    </div>
  );
}
