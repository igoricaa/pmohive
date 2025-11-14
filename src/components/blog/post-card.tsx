import { Link } from '@/components/motion-link';
import { Post } from '../../../sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import { cn, formatDate } from '@/lib/utils';
import { PortableTextBlock } from 'next-sanity';
import PortableText from '../portable-text';
import { ArrowRight } from 'lucide-react';

const PostCard = ({ post, className }: { post: Post; className?: string }) => {
  return (
    <article
      className={cn(
        'relative h-full aspect-[285/372] overflow-hidden group',
        className
      )}
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Background Image */}
        <div className='absolute inset-0 -z-20'>
          <Image
            src={urlFor(post.featuredMedia).url()}
            alt={post.title}
            width={285}
            height={372}
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
            className='w-full h-auto object-cover'
          />
        </div>

        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-b from-transparent from-30% to-black/65 -z-10' />

        {/* Content */}
        <div className='px-4 pb-4 pt-5 z-0 h-full flex flex-col justify-between'>
          <p className='text-sm'>{formatDate(post.date)}</p>

          <div className='xl:translate-y-25 xl:group-hover:translate-y-0 transition-[translate] duration-200'>
            <h3 className='text-[22px] sm:text-[26px] xl:text-2xl leading-none'>
              {post.title}
            </h3>

            <div className='mt-2 sm:mt-3 xl:mt-5 z-0 max-w-md transition-opacity xl:opacity-0 xl:group-hover:opacity-100 delay-0 xl:group-hover:delay-200 duration-100 xl:group-hover:duration-200'>
              <div className='line-clamp-3 '>
                <PortableText value={post.excerpt as PortableTextBlock[]} />
              </div>
              <button className='font-bold text-lg font-sans mt-3 sm:max-lg:mt-4 flex gap-1 items-center'>
                <ArrowRight className='size-5!' /> Read More
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
