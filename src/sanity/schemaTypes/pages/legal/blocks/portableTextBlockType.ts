import { AlignLeft } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const portableTextBlockType = defineType({
  name: 'portableTextBlock',
  title: 'Text Content',
  type: 'object',
  icon: AlignLeft,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Content is required'),
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare() {
      return {
        title: 'Text Content',
        subtitle: 'Rich text content block',
      };
    },
  },
});
