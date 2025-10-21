import { LightbulbIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const approachSectionType = defineType({
  name: 'approachSection',
  title: 'Approach Section',
  type: 'object',
  icon: LightbulbIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'items',
      title: 'Approach Items',
      type: 'array',
      description: 'Exactly 4 items describing the approach',
      of: [
        {
          name: 'approachItem',
          title: 'Approach Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Icon for this approach item',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                  description: 'Alternative text for accessibility',
                  validation: (rule) =>
                    rule
                      .required()
                      .error('Alt text is required for accessibility'),
                },
              ],
              validation: (rule) => rule.required().error('Icon is required'),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required().error('Title is required'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: (rule) =>
                rule.required().error('Description is required'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
            prepare({ title, media }) {
              return {
                title: title || 'Approach Item',
                media,
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(4)
          .max(4)
          .error('Exactly 4 approach items are required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Approach Section',
      };
    },
  },
});
