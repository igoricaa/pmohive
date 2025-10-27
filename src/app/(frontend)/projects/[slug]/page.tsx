import {
  getAllCaseStudiesWithSlugs,
  getCaseStudyData,
} from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import { Slug } from 'sanity';
import { default as PageClient } from './page-client';

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudiesWithSlugs();

  return caseStudies.map((caseStudy: { slug: Slug }) => ({
    slug: caseStudy.slug.current,
  }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { caseStudy } = await getCaseStudyData(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <main className='pb-10 sm:pb-16 xl:pb-35 pt-28 sm:pt-34 lg:pt-40'>
      <PageClient project={caseStudy} />
    </main>
  );
}
