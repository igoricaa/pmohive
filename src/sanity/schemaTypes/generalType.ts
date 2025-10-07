import { SettingsIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const generalType = defineType({
  name: 'general',
  title: 'General Settings',
  type: 'document',
  icon: SettingsIcon,
  groups: [
    {
      name: 'logo',
      title: 'Logo',
      icon: SettingsIcon,
    },
    {
      name: 'contact',
      title: 'Contact',
      icon: SettingsIcon,
    },
    {
      name: 'social',
      title: 'Social Media',
      icon: SettingsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'logoFull',
      title: 'Full Logo',
      type: 'image',
      description: 'Full company logo',
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
      validation: (rule) => rule.required().error('Full logo is required'),
      group: 'logo',
    }),
    defineField({
      name: 'logoMark',
      title: 'Logo Mark',
      type: 'image',
      description: 'Logo mark or icon (smaller version)',
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
      validation: (rule) => rule.required().error('Logo mark is required'),
      group: 'logo',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address',
      validation: (rule) =>
        rule
          .required()
          .email()
          .error('A valid email address is required'),
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Contact phone number',
      validation: (rule) => rule.required().error('Phone number is required'),
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      description: 'Social media links',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Social media platform name',
              validation: (rule) =>
                rule.required().error('Title is required'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Social media profile URL',
              validation: (rule) =>
                rule.required().error('URL is required'),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Social media icon',
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
              validation: (rule) => rule.required().error('Icon is required'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
              media: 'icon',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Social Media',
                subtitle: subtitle || 'No URL',
                media,
              };
            },
          },
        },
      ],
      group: 'social',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      phone: 'phone',
    },
    prepare({ email, phone }) {
      return {
        title: 'General Settings',
        subtitle: email || phone || 'No contact info',
      };
    },
  },
});
