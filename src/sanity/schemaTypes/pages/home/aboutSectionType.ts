import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading text',
      validation: (rule) =>
        rule
          .required()
          .error('Heading is required')
          .max(20)
          .warning('Keep heading under 20 characters'),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'blockContent',
      description: 'Section about text',
      validation: (rule) => rule.required().error('About text is required'),
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'Section stats',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'statTitle',
              title: 'Stat Title',
              type: 'string',
              description: 'Section stat title',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'statValue',
              title: 'Stat Value',
              type: 'number',
              description: 'Section stat value',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().error('Stats are required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'About Section',
      };
    },
  },
});
