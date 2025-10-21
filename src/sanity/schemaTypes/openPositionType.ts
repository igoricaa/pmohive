import { BriefcaseIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const openPositionType = defineType({
  name: 'openPosition',
  title: 'Open Position',
  type: 'document',
  icon: BriefcaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required().error('Location is required'),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (rule) => rule.required().error('Type is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Description is required'),
    }),
  ],
});
