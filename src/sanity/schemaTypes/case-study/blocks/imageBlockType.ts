import { ImageIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const imageBlockType = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
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
      validation: (rule) => rule.required().error('Image is required'),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional caption for the image',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      alt: 'image.alt',
      subtitle: 'subtitle',
    },
    prepare({ media, alt, subtitle }) {
      return {
        title: alt || 'Image',
        subtitle: subtitle || 'No caption',
        media,
      };
    },
  },
});
