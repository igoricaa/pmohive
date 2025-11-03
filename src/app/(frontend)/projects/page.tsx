import { ProjectsListComponent } from '@/components/sections/projects-list-component';
import { getAllCaseStudies } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Our Projects - PMO Hive',
    description:
      'Explore PMO Hive case studies showcasing successful project management implementations, organizational transformations, and strategic PMO solutions across various industries.',
    path: '/projects',
  });
}

export default async function ProjectsPage() {
  const projects = await getAllCaseStudies();

  return (
    <main className='pt-28 sm:pt-34 lg:pt-40'>
      <ProjectsListComponent
        projects={projects}
        className='min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-136px)] xl:min-h-[calc(100vh-144px)]'
      />
    </main>
  );
}
