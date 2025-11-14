import { Table } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const tableBlockType = defineType({
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  icon: Table,
  fields: [
    defineField({
      name: 'table',
      title: 'Table',
      type: 'table',
      validation: (rule) => rule.required().error('Table is required'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption for the table',
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
    },
    prepare({ caption }) {
      return {
        title: 'Table',
        subtitle: caption || 'Data table',
      };
    },
  },
});
