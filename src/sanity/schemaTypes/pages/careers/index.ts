import { InfoIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const careersPageType = defineType({
  name: 'careersPage',
  title: 'Careers Page',
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
        'Internal title for the careers page (not displayed on frontend)',
      initialValue: 'Careers Page',
      validation: (rule) => rule.required().error('Page title is required'),
    }),
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'introSection',
      description: 'Main intro section at the top of the page',
      validation: (rule) => rule.required().error('Intro section is required'),
    }),
    defineField({
      name: 'openPositions',
      title: 'Open Positions',
      type: 'array',
      description: 'List of open positions',
      of: [{ type: 'reference', to: [{ type: 'openPosition' }] }],
      validation: (rule) => rule.required().error('Open positions is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      introHeading: 'intro.heading',
    },
    prepare({ title, introHeading }) {
      return {
        title: title || 'About Page',
        subtitle: introHeading ? `Intro: ${introHeading}` : 'No intro content',
      };
    },
  },
});
