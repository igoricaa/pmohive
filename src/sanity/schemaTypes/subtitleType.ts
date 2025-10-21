import { defineField, defineType } from 'sanity';

export const subtitleType = defineType({
  name: 'subtitle',
  title: 'Subtitle',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required().error('Text is required'),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    }),
  ],
});
