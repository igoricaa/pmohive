import { Minus } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const dividerBlockType = defineType({
  name: 'dividerBlock',
  title: 'Divider',
  type: 'object',
  icon: Minus,
  fields: [
    defineField({
      name: 'height',
      title: 'Spacing (px)',
      type: 'number',
      description: 'Vertical spacing around the divider in pixels',
      initialValue: 40,
      validation: (rule) =>
        rule
          .required()
          .min(0)
          .max(200)
          .error('Spacing must be between 0 and 200 pixels'),
    }),
  ],
  preview: {
    select: {
      height: 'height',
    },
    prepare({ height }) {
      return {
        title: 'Divider',
        subtitle: `${height || 40}px spacing`,
      };
    },
  },
});
