import Heading from '@/components/ui/heading';
import PortableText from '@/components/portable-text';
import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';
import { cn } from '@/lib/utils';
import type { TextGridBlock as TextGridBlockType } from '../../../sanity.types';
import { PortableTextBlock } from 'next-sanity';

export default function TextGridBlock({
  heading,
  content,
  items,
}: {
  heading?: TextGridBlockType['heading'];
  content?: TextGridBlockType['content'];
  items: TextGridBlockType['items'];
}) {
  const alignmentClass = heading
    ? {
        start: 'text-left',
        center: 'text-center',
        end: 'text-right',
      }[heading.alignment || 'start']
    : 'text-left';

  const level = (heading?.level || 'h2') as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  return (
    <div className='mb-6 sm:mb-8 xl:mb-12 2xl:mb-16'>
      {/* Grid-level Heading */}
      {heading && heading.text && (
        <Heading
          level={level}
          spacing='mt-0'
          className={cn(alignmentClass)}
          subtitle={heading.subtitle}
        >
          {heading.highlightedText && (
            <span className='highlight'>{heading.highlightedText} </span>
          )}
          {heading.text}
        </Heading>
      )}

      {/* Grid-level Content */}
      {content && (
        <div className='mt-5 sm:mt-6'>
          <PortableText value={content as PortableTextBlock[]} />
        </div>
      )}

      {/* Grid Items */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 xl:gap-x-6 mt-6 sm:mt-8'>
        {items?.map((item, index) => {
          const itemAlignmentClass = {
            start: 'text-left',
            center: 'text-center',
            end: 'text-right',
          }[item.heading?.alignment || 'start'];

          const itemLevel = (item.heading?.level || 'h3') as
            | 'h1'
            | 'h2'
            | 'h3'
            | 'h4'
            | 'h5'
            | 'h6';

          return (
            <div key={index} className='flex flex-col'>
              {/* Indicator (Number or Icon) */}
              {item.indicatorType === 'number' && item.number && (
                <p className='text-[42px] font-bold highlight'>{item.number}</p>
              )}
              {item.indicatorType === 'icon' && item.icon && (
                <Image
                  src={urlForUncropped(item.icon).url()}
                  alt={item.icon.alt || ''}
                  width={80}
                  height={80}
                  className='w-16 h-16 xl:w-20 xl:h-20 object-contain'
                />
              )}

              {/* Heading */}
              {item.heading && item.heading.text && (
                <Heading
                  level={itemLevel}
                  spacing='mt-0'
                  className={cn(itemAlignmentClass, 'mt-2')}
                  subtitle={item.heading.subtitle}
                >
                  {item.heading.highlightedText && (
                    <span className='highlight'>
                      {item.heading.highlightedText}{' '}
                    </span>
                  )}
                  {item.heading.text}
                </Heading>
              )}

              {/* Description */}
              {item.description && (
                <div className='mt-3'>
                  <PortableText
                    value={item.description as PortableTextBlock[]}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
