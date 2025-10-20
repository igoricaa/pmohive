import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import {
  BLOG_POSTS_QUERY,
  BLOG_POSTS_QUERY_ASC,
} from '@/sanity/lib/queries';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || null;
    const category = searchParams.get('category') || null;
    const sort = searchParams.get('sort') || 'desc';

    // Select query based on sort order
    const query = sort === 'asc' ? BLOG_POSTS_QUERY_ASC : BLOG_POSTS_QUERY;

    const posts = await client.fetch(query, {
      search,
      category,
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
