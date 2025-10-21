import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const introSectionType = defineType({
  name: 'introSection',
  title: 'Intro Section',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Subtitle text that will be displayed in intro section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading (H1)',
      type: 'string',
      description: 'Main intro heading',
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
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Icon for the call-to-action button',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the intro section',
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
        rule.required().error('Background image is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Intro Section',
        media,
      };
    },
  },
});
