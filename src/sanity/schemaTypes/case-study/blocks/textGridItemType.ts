import { defineField, defineType } from 'sanity';
import { headingField } from '../fields/headingField';

export const textGridItemType = defineType({
  name: 'textGridItem',
  title: 'Text Grid Item',
  type: 'object',
  fields: [
    {
      ...headingField,
      validation: undefined, // Remove required validation
    },
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'indicatorType',
      title: 'Indicator Type',
      type: 'string',
      options: {
        list: [
          { title: 'Number', value: 'number' },
          { title: 'Icon', value: 'icon' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Displayed when indicator type is "Number"',
      hidden: ({ parent }) => parent?.indicatorType !== 'number',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { indicatorType?: string };
          if (parent?.indicatorType === 'number' && !value) {
            return 'Number is required when indicator type is "Number"';
          }
          return true;
        }),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
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
          validation: (rule) => rule.required().error('Alt text is required'),
        },
      ],
      description: 'Displayed when indicator type is "Icon"',
      hidden: ({ parent }) => parent?.indicatorType !== 'icon',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { indicatorType?: string };
          if (parent?.indicatorType === 'icon' && !value) {
            return 'Icon is required when indicator type is "Icon"';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      highlightedText: 'heading.highlightedText',
      text: 'heading.text',
      indicatorType: 'indicatorType',
      number: 'number',
      iconMedia: 'icon',
    },
    prepare({ highlightedText, text, indicatorType, number, iconMedia }) {
      const title = highlightedText ? `${highlightedText} ${text}` : text;
      const indicator =
        indicatorType === 'number' ? `Number: ${number || 'N/A'}` : 'Icon';
      return {
        title: title || 'Grid Item',
        subtitle: indicator,
        media: indicatorType === 'icon' ? iconMedia : undefined,
      };
    },
  },
});
