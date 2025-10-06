import { MailIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const contactSectionType = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: MailIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Section subtitle text',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Section description content',
      validation: (rule) => rule.required().error('Description is required'),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the contact section',
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
      validation: (rule) => rule.required().error('Background image is required'),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      description: 'Call-to-action buttons',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: 'Text displayed on the button',
              validation: (rule) =>
                rule.required().error('Button text is required'),
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              description: 'URL or path for the button',
              validation: (rule) =>
                rule.required().error('Button link is required'),
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'link',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Button',
                subtitle: subtitle || 'No link',
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('At least one button is required'),
    }),
  ],
  preview: {
    select: {
      title: 'subtitle',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Contact Section',
        media,
      };
    },
  },
});
