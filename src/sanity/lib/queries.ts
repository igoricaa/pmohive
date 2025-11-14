import { defineQuery } from 'next-sanity';
import { sanityFetch } from './client';
import {
  ABOUT_PAGE_QUERYResult,
  CAREERS_PAGE_QUERYResult,
  CASE_STUDIES_QUERY_WITH_SLUGSResult,
  CASE_STUDIES_QUERYResult,
  CASE_STUDY_QUERYResult,
  CONTACT_PAGE_QUERYResult,
  COOKIE_POLICY_QUERYResult,
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  LATEST_POSTS_QUERYResult,
  POST_QUERYResult,
  PRIVACY_POLICY_QUERYResult,
  SERVICE_QUERYResult,
  SERVICES_QUERY_FOR_NAVResult,
  SERVICES_QUERY_WITH_SLUGSResult,
  SERVICES_QUERYResult,
  TERMS_OF_USE_QUERYResult,
} from '../../../sanity.types';

export const HOME_PAGE_QUERY = defineQuery(`{
    "homePage": *[_type == "homePage"][0] {
      ...,
      seo {
        metaTitle,
        metaDescription,
        ogTitle,
        ogDescription,
        ogImage {
          ...,
          alt
        },
        keywords,
        canonicalUrl,
        noIndex
      },
      team {
        ...,
        teamMembers[]->
      },
      about {
        heading,
        animatedText,
        stats,
        wrapUpText,
        weAreSection
      }
    }
  }`);

export const getHomePageData = async (): Promise<HOME_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: ['home-page-data'],
  });
};

export const HOME_SERVICES_QUERY = defineQuery(`
  *[_type == "homePage"][0].about.services[]-> {
    header {
      subtitle {
        text,
        highlightedText
      },
      heading,
      featuredImage {
        ...,
        alt
      }
    },
    "slug": slug.current,
    excerpt,
  }
`);

export async function getHomeServices() {
  return await sanityFetch({
    query: HOME_SERVICES_QUERY,
    tags: ['services'],
  });
}

export const LATEST_POSTS_QUERY =
  defineQuery(`*[_type == "post"] | order(_createdAt desc) [0...$limit] {
  title,
  "slug": slug.current,
  excerpt,
  featuredMedia,
  date,
}`);

export const GENERAL_INFO_QUERY = defineQuery(`{
  "generalInfo": *[_type == "generalInfo"][0] {
    logoFull {
      ...,
      alt
    },
    logoMark {
      ...,
      alt
    },
    email,
    phone,
    googleMapCoordinates,
    socials[] {
      _key,
      title,
      url,
      icon {
        ...,
        alt
      }
    },
    companyName,
    description,
    address {
      streetAddress,
      addressLocality,
      addressRegion,
      postalCode,
      addressCountry
    },
    businessHours {
      openingTime,
      closingTime,
      daysOfWeek
    },
    priceRange,
    businessType,
    officeImage {
      ...,
      alt
    }
  }
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
    _updatedAt,
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
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    }
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
  slug,
  _updatedAt,
  date
}`);

export const SERVICES_QUERY = defineQuery(`*[_type == "service"]`);

export async function getAllServices(): Promise<SERVICES_QUERYResult> {
  return await sanityFetch({
    query: SERVICES_QUERY,
    tags: ['services'],
  });
}

export const SERVICES_QUERY_WITH_SLUGS = defineQuery(`*[_type == "service"]{
  slug,
  _updatedAt
}`);

export async function getAllServicesWithSlugs(): Promise<SERVICES_QUERY_WITH_SLUGSResult> {
  return await sanityFetch({
    query: SERVICES_QUERY_WITH_SLUGS,
    tags: ['services'],
  });
}

export const SERVICES_QUERY_FOR_NAV =
  defineQuery(`*[_type == "service"] | order(title asc) {
  title,
  "slug": slug.current
}`);

export async function getAllServicesForNav(): Promise<SERVICES_QUERY_FOR_NAVResult> {
  return await sanityFetch({
    query: SERVICES_QUERY_FOR_NAV,
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
  "contactPage": *[_type == "contactPage"][0] {
    ...,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    }
  }
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
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    },
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
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    },
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
  "currentService": *[_type == "service" && slug.current == $slug][0] {
    ...,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    },
    _updatedAt
  }
}`);

export const getServiceData = async (
  slug: string
): Promise<SERVICE_QUERYResult> => {
  return await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
    tags: ['service', `service-${slug}`],
  });
};

export const CASE_STUDY_QUERY = defineQuery(`{
  "caseStudy": *[_type == "caseStudy" && slug.current == $slug][0] {
    ...,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    },
    _updatedAt
  }
}`);

export const getCaseStudyData = async (
  slug: string
): Promise<CASE_STUDY_QUERYResult> => {
  return await sanityFetch({
    query: CASE_STUDY_QUERY,
    params: { slug },
    tags: ['caseStudy', `caseStudy-${slug}`],
  });
};

export const CASE_STUDIES_QUERY_WITH_SLUGS =
  defineQuery(`*[_type == "caseStudy"]{
  slug,
  _updatedAt
}`);

export const getAllCaseStudiesWithSlugs =
  async (): Promise<CASE_STUDIES_QUERY_WITH_SLUGSResult> => {
    return await sanityFetch({
      query: CASE_STUDIES_QUERY_WITH_SLUGS,
      tags: ['caseStudies'],
    });
  };

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy"] {
  mainInfo {
    title,
    featuredImage {
    ...,
    alt
    },
  },
  "slug": slug.current,
}`);

export async function getAllCaseStudies(): Promise<CASE_STUDIES_QUERYResult> {
  return await sanityFetch({
    query: CASE_STUDIES_QUERY,
    tags: ['caseStudies'],
  });
}

export const PRIVACY_POLICY_QUERY = defineQuery(`{
  "privacyPolicy": *[_type == "privacyPolicy"][0] {
    title,
    "slug": slug.current,
    lastUpdated,
    version,
    termlyEmbedUrl,
    content[] {
      _key,
      _type,
      _type == "portableTextBlock" => {
        content
      },
      _type == "tableBlock" => {
        table,
        caption
      }
    },
    introContent,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    }
  }
}`);

export const getPrivacyPolicyData =
  async (): Promise<PRIVACY_POLICY_QUERYResult> => {
    return await sanityFetch({
      query: PRIVACY_POLICY_QUERY,
      tags: ['privacyPolicy'],
    });
  };

export const COOKIE_POLICY_QUERY = defineQuery(`{
  "cookiePolicy": *[_type == "cookiePolicy"][0] {
    title,
    "slug": slug.current,
    lastUpdated,
    version,
    termlyEmbedUrl,
    content[] {
      _key,
      _type,
      _type == "portableTextBlock" => {
        content
      },
      _type == "tableBlock" => {
        table,
        caption
      }
    },
    introContent,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    }
  }
}`);

export const getCookiePolicyData =
  async (): Promise<COOKIE_POLICY_QUERYResult> => {
    return await sanityFetch({
      query: COOKIE_POLICY_QUERY,
      tags: ['cookiePolicy'],
    });
  };

export const TERMS_OF_USE_QUERY = defineQuery(`{
  "termsOfUse": *[_type == "termsOfUse"][0] {
    title,
    "slug": slug.current,
    lastUpdated,
    version,
    termlyEmbedUrl,
    content[] {
      _key,
      _type,
      _type == "portableTextBlock" => {
        content
      },
      _type == "tableBlock" => {
        table,
        caption
      }
    },
    introContent,
    seo {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogImage {
        ...,
        alt
      },
      keywords,
      canonicalUrl,
      noIndex
    }
  }
}`);

export const getTermsOfUseData =
  async (): Promise<TERMS_OF_USE_QUERYResult> => {
    return await sanityFetch({
      query: TERMS_OF_USE_QUERY,
      tags: ['termsOfUse'],
    });
  };
