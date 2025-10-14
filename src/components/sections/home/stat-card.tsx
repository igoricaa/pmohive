import PortableText from '@/components/portable-text';
import { Stat } from '@/lib/types';
import { urlForUncropped } from '@/sanity/lib/image';
import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';

const StatCard = ({ stat, className }: { stat: Stat, className?: string }) => {
  return (
    <article className={className}>
      {stat.statValue && !stat.statIcon && (
        <p className='font-bold text-[4rem] xl:text-[5.5rem] leading-none'>
          {stat.statValue}+
        </p>
      )}
      {stat.statIcon && (
        <Image
          src={urlForUncropped(stat.statIcon).url()}
          alt={stat.statIcon.alt}
          width={100}
          height={100}
          unoptimized
          className='h-auto object-cover w-17 sm:w-22'
        />
      )}
      <p className='mt-3.5 sm:mt-2 font-bold text-lg sm:text-[22px] xl:text-2xl'>
        {stat.statTitle}
      </p>
      <PortableText
        value={stat.statDescription as PortableTextBlock[]}
        paragraphClassName='mt-3! xl:mt-3.5! text-sm! font-mono'
      />
    </article>
  );
};

export default StatCard;
