import { Route } from '@/lib/types';
import { getAllServicesForNav } from '@/sanity/lib/queries';

export const staticRoutes: Route[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/about-us',
    label: 'About Us',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
  {
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/contact-us',
    label: 'Contact & Consultation',
  },
];

export async function getRoutes(): Promise<Route[]> {
  const services = await getAllServicesForNav();

  const serviceRoutes: Route[] = services.map(
    (service: { title: string; slug: string }) => ({
      path: `/industry-focus/${service.slug}`,
      label: service.title,
    })
  );

  const industryFocusRoute: Route = {
    path: '/industry-focus',
    label: 'Industry Focus',
    children: serviceRoutes,
  };

  return [
    staticRoutes[0], // Home
    staticRoutes[1], // About Us
    industryFocusRoute, // Industry Focus with services
    staticRoutes[2], // Projects
    staticRoutes[3], // Blog
    staticRoutes[4], // Contact & Consultation
  ];
}

// For backward compatibility in client components
export const routes: Route[] = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/about-us',
    label: 'About Us',
  },
  {
    path: '/industry-focus',
    label: 'Industry Focus',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
  {
    path: '/blog',
    label: 'Blog',
  },
  {
    path: '/contact-us',
    label: 'Contact & Consultation',
  },
];
