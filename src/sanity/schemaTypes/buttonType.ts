import { defineField, defineType } from 'sanity';

export const buttonType = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (rule) => rule.required().error('Button text is required'),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description:
        'Optional highlighted portion of text (e.g., "/pmo" in "More about /pmo")',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
      validation: (rule) => rule.required().error('Button link is required'),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'Button style variant',
      options: {
        list: [
          { title: 'Default (Black)', value: 'default' },
          { title: 'Secondary (Yellow)', value: 'secondary' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required().error('Button variant is required'),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      description: 'Icon for the call-to-action button',
    }),
  ],
});
