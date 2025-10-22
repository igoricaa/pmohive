import { defineQuery } from 'next-sanity';
import { sanityFetch } from './client';
import {
  ABOUT_PAGE_QUERYResult,
  CAREERS_PAGE_QUERYResult,
  CONTACT_PAGE_QUERYResult,
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  LATEST_POSTS_QUERYResult,
  POST_QUERYResult,
  SERVICE_QUERYResult,
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

export const POST_QUERY = defineQuery(`{
  "currentPost": *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    subtitle {
      text,
      highlightedText
    },
    "slug": slug.current,
    date,
    content,
    excerpt,
    featuredMedia,
  },
  "relatedPosts": *[
    _type == "post" 
    && slug.current != $slug
  ] | order(date desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    featuredMedia
  }
}`);

export const getPostData = async (slug: string): Promise<POST_QUERYResult> => {
  return await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    tags: ['post', `post-${slug}`],
  });
};

export const POSTS_QUERY_WITH_SLUGS = defineQuery(`*[_type == "post"]{
  slug
}`);

export const SERVICES_QUERY_WITH_SLUGS = defineQuery(`*[_type == "service"]{
  slug
}`);

export async function getAllServicesWithSlugs() {
  return await sanityFetch({
    query: SERVICES_QUERY_WITH_SLUGS,
    tags: ['services'],
  });
}

export async function getAllPostsWithSlugs() {
  return await sanityFetch({
    query: POSTS_QUERY_WITH_SLUGS,
    tags: ['posts'],
  });
}

export const CONTACT_PAGE_QUERY = defineQuery(`{
  "contactPage": *[_type == "contactPage"][0]
}`);

export const getContactPageData =
  async (): Promise<CONTACT_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: CONTACT_PAGE_QUERY,
      tags: ['contactPage'],
    });
  };

export const ABOUT_PAGE_QUERY = defineQuery(`{
  "aboutPage": *[_type == "aboutPage"][0] {
    ...,
    team {
      ...,
      teamMembers[]->
    },
    approachSection {
      ...,
      approachItems[]->
    },
    visionSection {
      ...,
      visionItems[]->
    },
  }
}`);

export const getAboutPageData = async (): Promise<ABOUT_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: ABOUT_PAGE_QUERY,
    tags: ['aboutPage'],
  });
};

export const CAREERS_PAGE_QUERY = defineQuery(`{
  "careersPage": *[_type == "careersPage"][0] {
    ...,
    openPositions[]->
  }
}`);

export const getCareersPageData =
  async (): Promise<CAREERS_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: CAREERS_PAGE_QUERY,
      tags: ['careersPage'],
    });
  };

export const SERVICE_QUERY = defineQuery(`{
  "currentService": *[_type == "service" && slug.current == $slug][0]
}`);

export const getServiceData = async (
  slug: string
): Promise<SERVICE_QUERYResult> => {
  return await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    tags: ['service'],
  });
};
