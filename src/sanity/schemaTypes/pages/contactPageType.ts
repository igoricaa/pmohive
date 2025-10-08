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
      type: 'string',
      description: 'Subtitle text for the contact page',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the contact page',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Description text for the contact page',
      validation: (rule) => rule.required().error('Description is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Page',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
});
