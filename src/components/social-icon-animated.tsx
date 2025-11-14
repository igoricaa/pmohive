import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import Link from 'next/link';

const SocialIconAnimated = ({
  icon,
  title,
  url,
}: {
  icon: SanityImageSource;
  title: string;
  url: string;
}) => {
  return (
    <Link
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='bg-black-custom border border-white/40 px-[11px] h-9 flex items-center rounded-full overflow-hidden group/icon'
    >
      <p
        className={cn(
          'text-sm font-medium whitespace-nowrap overflow-hidden inline-block transition-[max-width,opacity,margin-right] duration-300 max-w-0 opacity-0 mr-0 delay-[0s,0s,0.15s] group-hover/icon:max-w-[300px] group-hover/icon:opacity-100 group-hover/icon:mr-2 group-hover/icon:delay-[0s,0.3s,0s]'
        )}
      >
        {title}
      </p>
      <Image
        src={urlFor(icon).url()}
        alt={title}
        width={20}
        height={20}
        unoptimized
        className='w-5 h-5 max-w-5 max-h-5 object-contain flex-shrink-0'
      />
    </Link>
  );
};

export default SocialIconAnimated;
