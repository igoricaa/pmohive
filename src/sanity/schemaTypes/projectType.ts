import { FolderKanbanIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderKanbanIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Project title',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the project',
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
      description: 'Main image for the project',
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Project content and description',
      validation: (rule) => rule.required().error('Content is required'),
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
        title: title || 'Project',
        subtitle: slug || 'No slug',
        media,
      };
    },
  },
});
