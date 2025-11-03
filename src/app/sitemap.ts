import { MetadataRoute } from 'next';
import {
  getAllPostsWithSlugs,
  getAllCaseStudiesWithSlugs,
  getAllServicesWithSlugs,
} from '@/sanity/lib/queries';

const SITE_URL = 'https://www.pmohive.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic routes from Sanity
  const [posts, caseStudies, services] = await Promise.all([
    getAllPostsWithSlugs(),
    getAllCaseStudiesWithSlugs(),
    getAllServicesWithSlugs(),
  ]);

  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/careers-and-culture`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-use`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic blog post URLs
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug.current}`,
    lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic case study URLs
  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE_URL}/projects/${study.slug.current}`,
    lastModified: study._updatedAt ? new Date(study._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic service URLs
  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/industry-focus/${service.slug.current}`,
    lastModified: service._updatedAt ? new Date(service._updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogUrls, ...caseStudyUrls, ...serviceUrls];
}
