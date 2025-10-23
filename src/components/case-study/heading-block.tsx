import Heading from '@/components/ui/heading';
import { cn } from '@/lib/utils';
import type { HeadingBlock } from '../../../sanity.types';

export default function HeadingBlock({
  heading,
}: {
  heading: HeadingBlock['heading'];
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
    <div
      className={cn(
        'mb-6 sm:mb-8 xl:mb-12 2xl:mb-16',
        alignmentClass,
        alignmentClass === 'center' && 'mx-auto max-w-2xl'
      )}
    >
      <Heading level={level} spacing='mt-0' subtitle={heading.subtitle}>
        {heading.highlightedText && (
          <span className='highlight'>{heading.highlightedText} </span>
        )}
        {heading.text}
      </Heading>
    </div>
  );
}
