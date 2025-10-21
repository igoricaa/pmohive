import { StarIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const breakSectionType = defineType({
  name: 'breakSection',
  title: 'Break Section',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Section subtitle text',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the section',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Section description content',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the break section',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility',
          validation: (rule) =>
            rule.required().error('Alt text is required for accessibility'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Background image is required'),
    }),
    defineField({
      name: 'buttons',
      title: 'Call to Action Buttons',
      type: 'array',
      description: 'CTA buttons (maximum 2)',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              validation: (rule) =>
                rule.required().error('Button text is required'),
            }),
            defineField({
              name: 'highlightedText',
              title: 'Highlighted Text',
              type: 'string',
              description:
                'Optional highlighted portion of text (e.g., "/pmo" in "More about /pmo")',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'URL or path for the button',
              validation: (rule) => rule.required().error('Link is required'),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'link',
            },
          },
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(2)
          .error('At least 1 and maximum 2 buttons are required'),
    }),
  ],
  preview: {
    select: {
      title: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Break Section',
        subtitle: 'Break Section',
        media,
      };
    },
  },
});
