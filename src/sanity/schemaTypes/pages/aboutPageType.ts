import { InfoIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: InfoIcon,
  groups: [
    {
      name: 'hero',
      title: 'Hero',
      icon: InfoIcon,
    },
    {
      name: 'content',
      title: 'Content Sections',
      icon: InfoIcon,
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description:
        'Internal title for the about page (not displayed on frontend)',
      initialValue: 'About Page',
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
      name: 'contact',
      title: 'Contact Section',
      type: 'contactSection',
      description: 'Contact section with call-to-action buttons',
      validation: (rule) => rule.required().error('Contact section is required'),
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
        title: title || 'About Page',
        subtitle: heroHeading ? `Hero: ${heroHeading}` : 'No hero content',
      };
    },
  },
});
