import { MailIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: MailIcon,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description: 'SEO settings for the Contact page.',
      group: 'seo',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Subtitle with optional highlighted text',
      validation: (rule) => rule.required().error('Subtitle is required'),
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the contact page',
      validation: (rule) => rule.required().error('Heading is required'),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Rich text description for the contact page',
      validation: (rule) => rule.required().error('Description is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      subtitleText: 'subtitle.text',
    },
    prepare({ heading, subtitleText }) {
      return {
        title: heading || 'Contact Page',
        subtitle: subtitleText || 'No subtitle',
      };
    },
  },
});
