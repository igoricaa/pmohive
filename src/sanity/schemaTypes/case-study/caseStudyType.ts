import { Briefcase } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: Briefcase,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description:
        'SEO settings for this case study. Helps potential clients discover your work through search engines.',
      group: 'seo',
    }),
    defineField({
      name: 'mainInfo',
      title: 'Main Info',
      type: 'object',
      description: 'Core information about the case study',
      group: 'content',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required().error('Title is required'),
        }),
        defineField({
          name: 'client',
          title: 'Client',
          type: 'string',
        }),
        defineField({
          name: 'projectDescription',
          title: 'Project Description',
          type: 'string',
          validation: (rule) =>
            rule.required().error('Project description is required'),
        }),
        defineField({
          name: 'industry',
          title: 'Industry',
          type: 'string',
        }),
        defineField({
          name: 'location',
          title: 'Location',
          type: 'string',
        }),
        defineField({
          name: 'phase',
          title: 'Phase',
          type: 'string',
        }),
        defineField({
          name: 'value',
          title: 'Value',
          type: 'string',
        }),
        defineField({
          name: 'featuredImage',
          title: 'Featured Image',
          type: 'image',
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
          validation: (rule) =>
            rule.required().error('Featured image is required'),
        }),
      ],
      validation: (rule) => rule.required().error('Main info is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the case study',
      options: {
        source: 'mainInfo.title',
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      validation: (rule) => rule.required().error('Slug is required'),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Modular content blocks for the case study',
      group: 'content',
      of: [
        defineArrayMember({ type: 'headingBlock' }),
        defineArrayMember({ type: 'headingTextBlock' }),
        defineArrayMember({ type: 'textareaBlock' }),
        defineArrayMember({ type: 'imageBlock' }),
        defineArrayMember({ type: 'textGridBlock' }),
        defineArrayMember({ type: 'spacerBlock' }),
        defineArrayMember({ type: 'dividerBlock' }),
      ],
    }),
    defineField({
      name: 'blog',
      title: 'Blog Section',
      type: 'blogSection',
      description: 'Blog section with subtitle, heading and description',
      validation: (rule) => rule.required().error('Blog section is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'mainInfo.title',
      client: 'mainInfo.client',
      slug: 'slug.current',
    },
    prepare({ title, client, slug }) {
      return {
        title: title || 'Untitled Case Study',
        subtitle: client
          ? `Client: ${client} | ${slug || 'No slug'}`
          : slug || 'No slug',
      };
    },
  },
});
