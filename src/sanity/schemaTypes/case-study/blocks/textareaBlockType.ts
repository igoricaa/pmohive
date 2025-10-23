import { AlignLeft } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const textareaBlockType = defineType({
  name: 'textareaBlock',
  title: 'Text Area',
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
        title: 'Text Area',
        subtitle: 'Rich text content',
      };
    },
  },
});
