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
      of: [{ type: 'button' }],
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
