import {
  getAllCaseStudiesWithSlugs,
  getCaseStudyData,
  getLatestPosts,
} from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Slug } from 'sanity';
import { default as PageClient } from './page-client';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { CaseStudy } from '../../../../../sanity.types';

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudiesWithSlugs();

  return caseStudies.map((caseStudy: { slug: Slug }) => ({
    slug: caseStudy.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { caseStudy } = await getCaseStudyData(slug);

  if (!caseStudy) {
    return {};
  }

  return generatePageMetadata({
    title:
      caseStudy.seo?.metaTitle || caseStudy.mainInfo?.title || 'Case Study',
    description:
      (caseStudy.seo?.metaDescription as string) ||
      caseStudy.mainInfo?.projectDescription,
    image: caseStudy.seo?.ogImage as SanityImageSource,
    seo: caseStudy.seo,
    type: 'article',
    modifiedTime: caseStudy._updatedAt,
    author: 'PMO Hive',
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [{ caseStudy }, latestPostsResult] = await Promise.all([
    getCaseStudyData(slug),
    getLatestPosts(12),
  ]);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className='pb-10 sm:pb-16 xl:pb-35 pt-28 sm:pt-34 lg:pt-40'>
      <PageClient
        project={caseStudy as CaseStudy}
        latestPosts={latestPostsResult}
      />
    </main>
  );
}
