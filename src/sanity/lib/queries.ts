import { defineQuery } from 'next-sanity';
import { sanityFetch } from './client';
import {
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  LATEST_POSTS_QUERYResult,
} from '../../../sanity.types';

export const HOME_PAGE_QUERY = defineQuery(`{
    "homePage": *[_type == "homePage"][0] {
      ...,
      team {
        ...,
        teamMembers[]->
      },
      about {
        ...,
        understandingPMO[] {
          subtitle {
            text,
            highlightedText
          },
          heading,
          description[],
          image {
            ...,
            alt
          }
        }
      }
    }
  }`);

export const getHomePageData = async (): Promise<HOME_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: ['home-page-data'],
  });
};

export const LATEST_POSTS_QUERY =
  defineQuery(`*[_type == "post"] | order(_createdAt desc) [0...$limit] {
  title,
  "slug": slug.current,
  excerpt,
  featuredMedia,
  date,
}`);

export const GENERAL_INFO_QUERY = defineQuery(`{
  "generalInfo": *[_type == "generalInfo"][0],
}`);

export const getGeneralInfoData =
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['generalInfo'],
    });
  };

export const getLatestPosts = async (
  limit = 3
): Promise<LATEST_POSTS_QUERYResult> => {
  return await sanityFetch({
    query: LATEST_POSTS_QUERY,
    params: { limit: limit - 1 },
    tags: ['post', 'latestPosts'],
  });
};

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post"
    && (!defined($search) || title match $search + "*")
    && (!defined($category) || category._ref == $category)
  ] | order(date desc) [0...11] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredMedia,
    date,
    category->{
      _id,
      name,
      "slug": slug.current
    }
  }
`);

export const BLOG_POSTS_QUERY_ASC = defineQuery(`
  *[_type == "post"
    && (!defined($search) || title match $search + "*")
    && (!defined($category) || category._ref == $category)
  ] | order(date asc) [0...11] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    featuredMedia,
    date,
    category->{
      _id,
      name,
      "slug": slug.current
    }
  }
`);

export const POST_CATEGORIES_QUERY = defineQuery(`
  *[_type == "postCategory"] | order(name asc) {
    _id,
    name,
    "slug": slug.current
  }
`);

export async function getInitialBlogPosts() {
  return await sanityFetch({
    query: BLOG_POSTS_QUERY,
    params: { search: null, category: null },
    tags: ['post'],
  });
}

export async function getAllPostCategories() {
  return await sanityFetch({
    query: POST_CATEGORIES_QUERY,
    tags: ['postCategory'],
  });
}
