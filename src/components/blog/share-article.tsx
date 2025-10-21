import { cn } from '@/lib/utils';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

interface ShareArticleProps {
  title: string;
  slug: string;
  className?: string;
}

export default function ShareArticle({
  title,
  slug,
  className,
}: ShareArticleProps) {
  const url = `https://pmohive.com/blog/${slug}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  };

  return (
    <div
      className={cn(
        'flex items-center gap-4 sm:gap-8 mt-8 sm:mt-6 xl:mt-10 justify-between sm:justify-start',
        className
      )}
    >
      <p className='text-sm sm:text-lg font-bold'>Share this article</p>
      <div className='flex items-center gap-2'>
        <a
          href={shareLinks.facebook}
          target='_blank'
          rel='noopener noreferrer'
          className='size-9 sm:size-12.5 bg-black-custom hover:bg-primary transition-colors duration-200 rounded-full flex items-center justify-center border border-white/35'
          aria-label='Share on Facebook'
        >
          <Facebook size={24} strokeWidth={2} />
        </a>
        <a
          href={shareLinks.linkedin}
          target='_blank'
          rel='noopener noreferrer'
          className='size-9 sm:size-12.5 bg-black-custom hover:bg-primary transition-colors duration-200 rounded-full flex items-center justify-center border border-white/35'
          aria-label='Share on LinkedIn'
        >
          <Linkedin size={24} strokeWidth={2} />
        </a>
        <a
          href={shareLinks.twitter}
          target='_blank'
          rel='noopener noreferrer'
          className='size-9 sm:size-12.5 bg-black-custom hover:bg-primary transition-colors duration-200 rounded-full flex items-center justify-center border border-white/35'
          aria-label='Share on Twitter'
        >
          <Twitter size={24} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}
