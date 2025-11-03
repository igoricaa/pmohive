import { Suspense } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import {
  getInitialBlogPosts,
  getAllPostCategories,
} from '@/sanity/lib/queries';
import BlogContent from '@/components/blog/blog-content';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Blog',
    description:
      'Insights, best practices, and expert advice on project management, PMO optimization, and organizational success from the PMO Hive team.',
    path: '/blog',
  });
}

export default async function Blog() {
  const queryClient = new QueryClient();

  // Prefetch data using React Query's prefetchQuery
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['posts', '', '', 'desc'],
      queryFn: getInitialBlogPosts,
    }),
    queryClient.prefetchQuery({
      queryKey: ['post-categories'],
      queryFn: getAllPostCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogContent />
      </Suspense>
    </HydrationBoundary>
  );
}
