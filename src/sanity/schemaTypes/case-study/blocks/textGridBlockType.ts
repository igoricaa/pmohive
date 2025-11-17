import { LayoutGrid } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { headingField } from '../fields/headingField';

export const textGridBlockType = defineType({
  name: 'textGridBlock',
  title: 'Text Grid',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    {
      ...headingField,
      validation: undefined, // Remove required validation from headingField
    },
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Optional text content before the grid items',
    }),
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [defineArrayMember({ type: 'textGridItem' })],
    }),
  ],
  preview: {
    select: {
      highlightedText: 'heading.highlightedText',
      text: 'heading.text',
      items: 'items',
    },
    prepare({ highlightedText, text, items }) {
      const count = items?.length || 0;
      const title =
        highlightedText || text
          ? `${highlightedText ? highlightedText + ' ' : ''}${text || ''}`
          : 'Text Grid';
      return {
        title,
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      };
    },
  },
});
