import { ProjectsListComponent } from '@/components/sections/projects-list-component';
import { getAllCaseStudies } from '@/sanity/lib/queries';

export default async function ProjectsPage() {
  const projects = await getAllCaseStudies();

  return (
    <main className='pt-28 sm:pt-34 lg:pt-40'>
      <ProjectsListComponent
        projects={projects}
        className='min-h-[calc(100vh-100px)] sm:min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-144px)]'
      />
    </main>
  );
}
