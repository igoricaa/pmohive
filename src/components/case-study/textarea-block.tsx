import PortableText from '@/components/portable-text';
import type { TextareaBlock } from '../../../sanity.types';
import { PortableTextBlock } from 'next-sanity';

export default function TextareaBlock({
  content,
}: {
  content: TextareaBlock['content'];
}) {
  return (
    <div className='mb-6 sm:mb-8 xl:mb-12 2xl:mb-16'>
      <PortableText value={content as PortableTextBlock[]} />
    </div>
  );
}
