import { UserIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Section subtitle text',
      validation: (rule) =>
        rule
          .required()
          .error('Subtitle is required')
          .max(10)
          .warning('Keep subtitle under 10 characters'),
    }),
    defineField({
      name: 'animatedText',
      title: 'Animated Text',
      type: 'string',
      description: 'Text that will be animated on the frontend',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'subtitle',
    },
    prepare({ title }) {
      return {
        title: title || 'About Section',
      };
    },
  },
});
