import { Type } from 'lucide-react';
import { defineType } from 'sanity';
import { headingField } from '../fields/headingField';

export const headingBlockType = defineType({
  name: 'headingBlock',
  title: 'Heading',
  type: 'object',
  icon: Type,
  fields: [headingField],
  preview: {
    select: {
      highlightedText: 'heading.highlightedText',
      text: 'heading.text',
      level: 'heading.level',
      alignment: 'heading.alignment',
    },
    prepare({ highlightedText, text, level, alignment }) {
      const title = highlightedText ? `${highlightedText} ${text}` : text;
      return {
        title: title || 'Heading',
        subtitle: `${(level || 'h2').toUpperCase()} | Alignment: ${alignment || 'start'}`,
      };
    },
  },
});
