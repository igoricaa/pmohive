import { defineQuery } from 'next-sanity';
import { sanityFetch } from './client';
import {
  HOME_PAGE_QUERYResult,
  LATEST_POSTS_QUERYResult,
} from '../../../sanity.types';

export const HOME_PAGE_QUERY = defineQuery(`{
    "homePage": *[_type == "homePage"][0],
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
  featuredMedia {
    asset->
  }
}`);

export const getLatestPosts = async (
  limit = 3
): Promise<LATEST_POSTS_QUERYResult> => {
  return await sanityFetch({
    query: LATEST_POSTS_QUERY,
    params: { limit: limit - 1 },
    tags: ['post', 'latestPosts'],
  });
};
