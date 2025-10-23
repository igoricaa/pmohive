import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';
import type { ImageBlock } from '../../../sanity.types';

export default function ImageBlock({
  image,
  subtitle,
  aspectRatio,
}: ImageBlock) {
  return (
    <figure className='my-12 sm:my-16 xl:my-24'>
      <Image
        src={urlForUncropped(image).url()}
        alt={image.alt}
        width={aspectRatio?.width || 1600}
        height={aspectRatio?.height || 900}
        className='w-full h-auto object-contain'
        style={{
          aspectRatio:
            aspectRatio?.width && aspectRatio?.height
              ? aspectRatio.width / aspectRatio.height
              : 16 / 9,
        }}
      />
      {subtitle && (
        <figcaption className='text-xs mt-3 font-mono text-end'>
          {subtitle}
        </figcaption>
      )}
    </figure>
  );
}
