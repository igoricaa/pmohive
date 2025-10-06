import { defineQuery } from 'next-sanity';
import { sanityFetch } from './client';
import { HOME_PAGE_QUERYResult } from '../../../sanity.types';

export const HOME_PAGE_QUERY = defineQuery(`{
    "homePage": *[_type == "homePage"][0],
  }`);

export const getHomePageData = async (): Promise<HOME_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: ['home-page-data'],
  });
};
