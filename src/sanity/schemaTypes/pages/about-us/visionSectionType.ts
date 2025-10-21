import { EyeIcon, LightbulbIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const visionSectionType = defineType({
  name: 'visionSection',
  title: 'Vision Section',
  type: 'object',
  icon: EyeIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Description is required'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the vision section',
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
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Vision Section',
      };
    },
  },
});
