import { defineField } from 'sanity';

export const headingField = defineField({
  name: 'heading',
  title: 'Heading',
  type: 'object',
  validation: (rule) => rule.required().error('Heading is required'),
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Subtitle with optional highlighted text',
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required().error('Text is required'),
    }),
    defineField({
      name: 'level',
      title: 'Heading Level',
      type: 'string',
      description: 'Choose the HTML heading level (h1-h6)',
      options: {
        list: [
          { title: 'H1', value: 'h1' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
          { title: 'H4', value: 'h4' },
          { title: 'H5', value: 'h5' },
          { title: 'H6', value: 'h6' },
        ],
      },
      initialValue: 'h2',
      validation: (rule) => rule.required().error('Heading level is required'),
    }),
    defineField({
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Start', value: 'start' },
          { title: 'Center', value: 'center' },
          { title: 'End', value: 'end' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'start',
      validation: (rule) => rule.required(),
    }),
  ],
});
