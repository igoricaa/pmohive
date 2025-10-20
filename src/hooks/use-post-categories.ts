import { useQuery } from '@tanstack/react-query';

type PostCategory = {
  _id: string;
  name: string;
  slug: string;
};

export function usePostCategories() {
  return useQuery<PostCategory[]>({
    queryKey: ['post-categories'],
    queryFn: () => {
      // This should never execute since categories are always prefetched server-side
      // If this runs, it means hydration failed - return empty array as fallback
      console.error(
        'Categories should be prefetched server-side. Hydration may have failed.'
      );
      return Promise.resolve([]);
    },
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
