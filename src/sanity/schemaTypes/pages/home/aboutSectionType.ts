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
      name: 'animatedText',
      title: 'Animated Text',
      type: 'string',
      description: 'Section animated text',
      validation: (rule) => rule.required().error('Animated text is required'),
    }),
    defineField({
      name: 'understandingPMO',
      title: 'Understanding PMO',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'subtitle',
              validation: (rule) =>
                rule.required().error('Subtitle is required'),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) =>
                rule.required().error('Heading is required'),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
              validation: (rule) =>
                rule.required().error('Description is required'),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (rule) => rule.required().error('Image is required'),
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (rule) =>
                    rule.required().error('Alt text is required'),
                  description: 'Alternative text for accessibility',
                }),
              ],
            }),
          ],
          validation: (rule) => rule.required().error('Item is required'),
        }),
      ],
      validation: (rule) =>
        rule.required().min(3).max(3).error('Exactly 3 items are required'),
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

    defineField({
      name: 'weAreSection',
      title: 'We Are Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          description: 'Section heading text',
          validation: (rule) => rule.required().error('Heading is required'),
        }),
        defineField({
          name: 'highlightedText',
          title: 'Highlighted Text',
          type: 'string',
          description: 'Section highlighted text',
          validation: (rule) =>
            rule.required().error('Highlighted text is required'),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'blockContent',
          description: 'Section description content',
          validation: (rule) =>
            rule.required().error('Description is required'),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          description: 'Section image',
          validation: (rule) => rule.required().error('Image is required'),
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
                rule.required().error('Alt text is required for accessibility'),
            },
          ],
        }),
      ],
      description: 'Section we are section',
      validation: (rule) => rule.required().error('We are section is required'),
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
