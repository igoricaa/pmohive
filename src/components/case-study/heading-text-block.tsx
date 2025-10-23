import Heading from '@/components/ui/heading';
import PortableText from '@/components/portable-text';
import { cn } from '@/lib/utils';
import type { HeadingTextBlock } from '../../../sanity.types';
import { PortableTextBlock } from 'next-sanity';

export default function HeadingTextBlock({
  heading,
  content,
}: {
  heading: HeadingTextBlock['heading'];
  content: HeadingTextBlock['content'];
}) {
  const alignmentClass = {
    start: 'text-left',
    center: 'text-center',
    end: 'text-right',
  }[heading.alignment || 'start'];

  const level = (heading.level || 'h2') as
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';

  return (
    <div className='mb-6 sm:mb-8 xl:mb-12 2xl:mb-16'>
      <Heading
        level={level}
        subtitle={heading.subtitle}
        className={cn(
          alignmentClass,
          heading.alignment === 'center' && 'mx-auto max-w-5xl',
          level === 'h2' && 'mb-7.5'
        )}
      >
        {heading.highlightedText && (
          <span className='highlight'>{heading.highlightedText} </span>
        )}
        {heading.text}
      </Heading>

      <div className='mt-5 sm:mt-6'>
        <PortableText value={content as PortableTextBlock[]} />
      </div>
    </div>
  );
}
