import { BriefcaseIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BriefcaseIcon,
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
        'SEO settings for this service page. Optimize to attract clients searching for this service.',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Service title',
      validation: (rule) => rule.required().error('Title is required'),
      group: 'content',
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
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      description: 'Short excerpt for the service (used in homepage cards)',
      validation: (rule) =>
        rule
          .required()
          .error('Excerpt is required')
          .max(190)
          .warning('Keep excerpt under 190 characters'),
      group: 'content',
    }),
    defineField({
      name: 'header',
      title: 'Header Section',
      type: 'object',
      description: 'Header section for the service',
      validation: (rule) => rule.required().error('Header section is required'),
      group: 'content',
      fields: [
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
          validation: (rule) =>
            rule.required().error('Featured image is required'),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the service',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the service',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
          description: 'Description for the service',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
      ],
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the challenge',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the challenge',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
          description: 'Description for the challenge',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image for the challenge',
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
          validation: (rule) => rule.required().error('Image is required'),
        }),
      ],
      description: 'Challenge for the service',
      validation: (rule) => rule.required().error('Challenge is required'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the role',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          description: 'Description for the role',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
      ],
      description: 'Role for the service',
      validation: (rule) => rule.required().error('Role is required'),
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the approach',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the approach',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'step',
                  title: 'Step',
                  type: 'string',
                  description: 'Step description',
                  validation: (rule) =>
                    rule.required().error('Step description is required'),
                }),
              ],
            },
          ],
          description: 'Steps of the approach',
          validation: (rule) => rule.required().error('Steps are required'),
        }),
      ],
      description: 'Approach for the service',
      validation: (rule) => rule.required().error('Approach is required'),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description: 'Highlighted text for the service',
      validation: (rule) =>
        rule.required().error('Highlighted text is required'),
      group: 'content',
    }),
    defineField({
      name: 'infoSection',
      title: 'Info Section',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the info section',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Heading for the info section',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
          description: 'Description for the info section',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Image for the info section',
          options: { hotspot: true },
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
          validation: (rule) => rule.required().error('Image is required'),
        }),
      ],
      description: 'Info section for the service',
      validation: (rule) => rule.required().error('Info section is required'),
    }),
    defineField({
      name: 'proofPoint',
      title: 'Proof Points',
      type: 'object',
      group: 'content',
      fields: [
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'subtitle',
          description: 'Subtitle for the proof points',
          validation: (rule) => rule.required().error('Subtitle is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                  description: 'Description for the proof point',
                  validation: (rule) =>
                    rule.required().error('Description is required'),
                }),
              ],
            },
          ],
          description: 'Description for the proof points',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
      ],
      description: 'Proof points for the service',
      validation: (rule) => rule.required().error('Proof points is required'),
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'breakSection',
      description: 'CTA section for the service',
      validation: (rule) => rule.required().error('CTA section is required'),
      group: 'content',
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
