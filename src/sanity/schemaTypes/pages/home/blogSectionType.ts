import { BookOpenIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const blogSectionType = defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'object',
  icon: BookOpenIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Section subtitle text',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the blog section',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Section description content',
      validation: (rule) => rule.required().error('Description is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Blog Section',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
});
