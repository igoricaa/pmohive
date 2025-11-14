import PortableText from '@/components/portable-text';
import { PortableTextBlock } from 'next-sanity';

interface PortableTextBlockProps {
  content: PortableTextBlock[];
}

export default function PortableTextBlockComponent({
  content,
}: PortableTextBlockProps) {
  return (
    <div className='mb-6 sm:mb-8'>
      <PortableText value={content} />
    </div>
  );
}
