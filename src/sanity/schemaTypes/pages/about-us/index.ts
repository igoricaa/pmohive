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
    }),
    defineField({
      name: 'introSection',
      title: 'Intro Section',
      type: 'introSection',
      description: 'Main intro section at the top of the page',
      validation: (rule) => rule.required().error('Intro section is required'),
    }),

    defineField({
      name: 'animatedTextPart1',
      title: 'Animated Text Part 1',
      type: 'string',
      description: 'Section animated text part 1',
      validation: (rule) =>
        rule.required().error('Animated text part 1 is required'),
    }),

    defineField({
      name: 'animatedTextPart2',
      title: 'Animated Text Part 2',
      type: 'string',
      description: 'Section animated text part 2',
      validation: (rule) =>
        rule.required().error('Animated text part 2 is required'),
    }),
    defineField({
      name: 'break',
      title: 'Break Section',
      type: 'breakSection',
      description:
        'Break section with background image and call-to-action buttons',
      validation: (rule) => rule.required().error('Break section is required'),
    }),
    defineField({
      name: 'team',
      title: 'Team Section',
      type: 'teamSection',
      description: 'Team section with team members',
      validation: (rule) => rule.required().error('Team section is required'),
    }),
    defineField({
      name: 'approachSection',
      title: 'Approach Section',
      type: 'approachSection',
      description: 'Approach section with subtitle, heading and items',
      validation: (rule) =>
        rule.required().error('Approach section is required'),
    }),
    defineField({
      name: 'visionSection',
      title: 'Vision Section',
      type: 'visionSection',
      description:
        'Vision section with subtitle, description and background image',
      validation: (rule) => rule.required().error('Vision section is required'),
    }),
    defineField({
      name: 'blog',
      title: 'Blog Section',
      type: 'blogSection',
      description: 'Blog section with subtitle, heading and description',
      validation: (rule) => rule.required().error('Blog section is required'),
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
