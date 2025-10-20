'use client';

import { useQueryState, parseAsString } from 'nuqs';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import PostCard from './post-card';
import { Post } from '../../../sanity.types';

export default function PostsGrid() {
  const [search] = useQueryState('search', parseAsString.withDefault(''));
  const [category] = useQueryState(
    'category',
    parseAsString.withDefault('all')
  );
  const [sort] = useQueryState('sort', parseAsString.withDefault('desc'));

  const categoryId = category === 'all' ? '' : category;
  const { data: posts, isLoading, error } = useBlogPosts(
    search,
    categoryId,
    sort
  );

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-4 xl:gap-5'>
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className='col-span-full sm:col-span-4 xl:col-span-3 aspect-[285/372] animate-pulse bg-muted overflow-hidden'
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-12'>
        <p className='text-destructive'>
          Error loading posts. Please try again.
        </p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-foreground'>No posts found.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-12 gap-4 xl:gap-5'>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post as unknown as Post}
          className='col-span-full sm:col-span-4 xl:col-span-3'
        />
      ))}
    </div>
  );
}
