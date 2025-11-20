import { urlFor } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';
import type { ImageBlock as ImageBlockType } from '../../../sanity.types';

type ImageBlockProps = Omit<ImageBlockType, 'image' | '_type'> & {
  image: ImageBlockType['image'] & {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
};

export default function ImageBlock({ image, subtitle }: ImageBlockProps) {
  const dimensions = image.dimensions;
  const width = dimensions?.width || 1600;
  const height = dimensions?.height || 900;
  const aspectRatio = dimensions?.aspectRatio || 16 / 9;

  return (
    <figure className='my-12 sm:my-16 xl:my-24'>
      <Image
        src={urlFor(image).url()}
        alt={image.alt}
        width={width}
        height={height}
        sizes='(max-width: 1280px) 100vw, 85vw'
        className='w-full h-auto object-contain'
        style={{ aspectRatio }}
      />
      {subtitle && (
        <figcaption className='text-xs mt-3 font-mono text-end'>
          {subtitle}
        </figcaption>
      )}
    </figure>
  );
}
