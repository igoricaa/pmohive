import { BriefcaseIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Service title',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the service',
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for the service',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility',
          validation: (rule) =>
            rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (rule) => rule.required().error('Featured image is required'),
    }),
    defineField({
      name: 'descriptionPartOne',
      title: 'Description Part One',
      type: 'blockContent',
      description: 'First part of the service description',
      validation: (rule) => rule.required().error('Description Part One is required'),
    }),
    defineField({
      name: 'descriptionPartTwo',
      title: 'Description Part Two',
      type: 'blockContent',
      description: 'Second part of the service description',
    }),
    defineField({
      name: 'relevantProjects',
      title: 'Relevant Projects',
      type: 'array',
      description: 'Projects related to this service',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'featuredImage',
    },
    prepare({ title, slug, media }) {
      return {
        title: title || 'Service',
        subtitle: slug || 'No slug',
        media,
      };
    },
  },
});
