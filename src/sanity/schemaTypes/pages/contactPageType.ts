import { MailIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: MailIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Subtitle with optional highlighted text',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the contact page',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Rich text description for the contact page',
      validation: (rule) => rule.required().error('Description is required'),
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
