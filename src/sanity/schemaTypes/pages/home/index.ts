import { defineField, defineType } from 'sanity';
import { HomeIcon } from 'lucide-react';
import { heroSectionType } from './heroSectionType';
import { aboutSectionType } from './aboutSectionType';
import { teamSectionType } from './teamSectionType';
import { blogSectionType } from './blogSectionType';

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {
      name: 'seo',
      title: 'SEO & Meta',
      icon: HomeIcon,
    },
    {
      name: 'hero',
      title: 'Hero',
      icon: HomeIcon,
    },
    {
      name: 'content',
      title: 'Content Sections',
      icon: HomeIcon,
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description:
        'SEO settings for search engines and social media sharing. Fill these out to optimize homepage visibility.',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the home page (not displayed on frontend)',
      initialValue: 'Home Page',
      validation: (rule) => rule.required().error('Page title is required'),
      group: 'hero',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'heroSection',
      description: 'Main hero section at the top of the page',
      validation: (rule) => rule.required().error('Hero section is required'),
      group: 'hero',
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'aboutSection',
      description: 'About section with animated text and CTA',
      validation: (rule) => rule.required().error('About section is required'),
      group: 'content',
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'teamSection',
      description: 'Team section with team members',
      validation: (rule) => rule.required().error('Team section is required'),
      group: 'content',
    }),
    defineField({
      name: 'blog',
      title: 'Blog Section',
      type: 'blogSection',
      description: 'Blog section with subtitle, heading and description',
      validation: (rule) => rule.required().error('Blog section is required'),
      group: 'content',
    }),
    defineField({
      name: 'pmoPromo',
      title: 'PMO Promo Section',
      type: 'breakSection',
      description:
        'PMO promo section with background image and call-to-action buttons',
      validation: (rule) => rule.required().error('PMO promo section is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heroHeading: 'hero.heading',
    },
    prepare({ title, heroHeading }) {
      return {
        title: title || 'Home Page',
        subtitle: heroHeading ? `Hero: ${heroHeading}` : 'No hero content',
      };
    },
  },
});

// Export all section types for registration
export { heroSectionType };
export { aboutSectionType };
export { teamSectionType };
export { blogSectionType };
