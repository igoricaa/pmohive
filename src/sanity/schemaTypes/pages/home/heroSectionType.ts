import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      description: 'Subtitle text that will be displayed in hero section',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main hero heading',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description text that will be displayed in hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      description: 'Buttons for the hero section',
      of: [
        {
          name: 'button',
          title: 'Button',
          type: 'object',
          description: 'Button for the hero section',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
              description: 'Text displayed on the call-to-action button',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'hightlightedText',
              title: 'HightlightedText',
              type: 'string',
              description:
                'Hightlighted text displayed on the call-to-action button',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              description: 'Link used for the call-to-action button',
              validation: (rule) => rule.required(),
            }),
          ],
          validation: (rule) => rule.required().error('Button is required'),
        },
      ],
      validation: (rule) =>
        rule.required().min(1).error('At least one button is required'),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'object',
      description: 'Images for the hero section',
      fields: [
        defineField({
          name: 'image1',
          title: 'Image 1',
          type: 'image',
          description: 'Image 1 for the hero section',
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
          validation: (rule) => rule.required().error('Image 1 is required'),
        }),
        defineField({
          name: 'image2',
          title: 'Image 2',
          type: 'image',
          description: 'Image 2 for the hero section',
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
          validation: (rule) => rule.required().error('Image 2 is required'),
        }),
        defineField({
          name: 'image3',
          title: 'Image 3',
          type: 'image',
          description: 'Image 3 for the hero section',
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
          validation: (rule) => rule.required().error('Image 3 is required'),
        }),
        defineField({
          name: 'image4',
          title: 'Image 4',
          type: 'image',
          description: 'Image 4 for the hero section',
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
          validation: (rule) => rule.required().error('Image 4 is required'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Background images are required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'images.image1',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Section',
        media,
      };
    },
  },
});
