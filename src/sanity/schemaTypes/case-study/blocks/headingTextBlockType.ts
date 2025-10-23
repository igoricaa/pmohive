import { Type } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { headingField } from '../fields/headingField';

export const headingTextBlockType = defineType({
  name: 'headingTextBlock',
  title: 'Heading + Text',
  type: 'object',
  icon: Type,
  fields: [
    headingField,
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Content is required'),
    }),
  ],
  preview: {
    select: {
      highlightedText: 'heading.highlightedText',
      text: 'heading.text',
      level: 'heading.level',
    },
    prepare({ highlightedText, text, level }) {
      const title = highlightedText ? `${highlightedText} ${text}` : text;
      return {
        title: title || 'Heading + Text',
        subtitle: `${(level || 'h2').toUpperCase()} with text content`,
      };
    },
  },
});
