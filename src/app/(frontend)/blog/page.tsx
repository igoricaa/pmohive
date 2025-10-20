import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import {
  getInitialBlogPosts,
  getAllPostCategories,
} from '@/sanity/lib/queries';
import Heading from '@/components/ui/heading';
import SearchInput from '@/components/blog/search-input';
import CategoryFilter from '@/components/blog/category-filter';
import SortSelect from '@/components/blog/sort-select';
import PostsGrid from '@/components/blog/posts-grid';

export default async function Blog() {
  const queryClient = new QueryClient();

  // Prefetch data using React Query's prefetchQuery
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['blog-posts', '', '', 'desc'],
      queryFn: getInitialBlogPosts,
    }),
    queryClient.prefetchQuery({
      queryKey: ['post-categories'],
      queryFn: getAllPostCategories,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='px-side pt-6 pb-35 sm:pt-16 sm:pb-42 xl:pt-19 xl:pb-57'>
        <div className='grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-5'>
          <Heading
            level='h1'
            subtitle={{ text: 'news', highlightedText: '/pmo' }}
            className='col-span-full xl:col-start-2'
          >
            Stay in the loop
          </Heading>

          <div className='col-span-full xl:col-span-10 xl:col-start-2 grid grid-cols-1 sm:grid-cols-8 xl:grid-cols-10 gap-6 xl:gap-5 mt-8 sm:mt-12 xl:mt-10.5'>
            <SearchInput className='col-span-full sm:col-span-4' />

            <div className='col-span-full sm:col-span-4 xl:col-span-5 2xl:col-start-8 grid grid-cols-2 gap-4 xl:gap-5'>
              <div className='relative col-span-1'>
                <p className='font-mono text-xxs absolute -top-4.5 left-0 font-medium'>
                  Sort
                </p>
                <SortSelect />
              </div>
              <div className='relative col-span-1'>
                <p className='font-mono text-xxs absolute -top-4.5 left-0 font-medium'>
                  Category
                </p>
                <CategoryFilter />
              </div>
            </div>
          </div>

          <div className='col-span-full xl:col-span-12 mt-8 sm:mt-16 xl:mt-18'>
            <PostsGrid />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
