import { Space } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const spacerBlockType = defineType({
  name: 'spacerBlock',
  title: 'Spacer',
  type: 'object',
  icon: Space,
  fields: [
    defineField({
      name: 'height',
      title: 'Height (px)',
      type: 'number',
      description: 'Height of the spacing in pixels',
      initialValue: 40,
      validation: (rule) =>
        rule
          .required()
          .min(0)
          .max(400)
          .error('Height must be between 0 and 400 pixels'),
    }),
  ],
  preview: {
    select: {
      height: 'height',
    },
    prepare({ height }) {
      return {
        title: 'Spacer',
        subtitle: `${height || 40}px height`,
      };
    },
  },
});
