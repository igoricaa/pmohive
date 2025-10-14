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
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (rule) =>
            rule
              .required()
              .error('Heading is required')
              .max(20)
              .warning('Keep heading under 20 characters'),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Heading highlighted text',
          validation: (rule) =>
            rule.required().error('Highlighted text is required'),
        }),
      ],
      description: 'Section heading text',
      validation: (rule) => rule.required().error('Heading is required'),
    }),

    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'string',
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
              type: 'string',
              description: 'Section stat value',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const statIcon = (context.parent as any)?.statIcon;
                  if (!value && !statIcon) {
                    return 'Either Stat Value or Stat Icon is required';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'statIcon',
              title: 'Stat Icon',
              type: 'image',
              description: 'Section stat icon',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const statValue = (context.parent as any)?.statValue;
                  if (!value && statValue == null) {
                    return 'Either Stat Value or Stat Icon is required';
                  }
                  return true;
                }),
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessibility.',
                }),
              ],
            }),
            defineField({
              name: 'statDescription',
              title: 'Stat Description',
              type: 'blockContent',
              description: 'Section stat description',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().error('Stats are required'),
    }),
    defineField({
      name: 'wrapUpText',
      title: 'Wrap Up Text',
      type: 'string',
      description: 'Section wrap up text',
      validation: (rule) => rule.required().error('Wrap up text is required'),
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
