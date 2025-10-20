import { useQuery } from '@tanstack/react-query';

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: any;
  featuredMedia: any;
  date: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
};

export function useBlogPosts(
  search?: string,
  categoryId?: string,
  sortOrder?: string
) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog-posts', search, categoryId, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (categoryId) params.set('category', categoryId);
      if (sortOrder) params.set('sort', sortOrder);

      const response = await fetch(`/api/blog/posts?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }
      return response.json();
    },
  });
}
