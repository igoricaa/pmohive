import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const teamSectionType = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'subtitle',
      description: 'Section subtitle text',
      validation: (rule) => rule.required().error('Subtitle is required'),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading text',
      validation: (rule) => rule.required().error('Heading is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Section description content',
      validation: (rule) => rule.required().error('Description is required'),
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      description: 'Call-to-action button',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      description: 'Featured team members for this section',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
        },
      ],
      validation: (rule) =>
        rule.required().min(1).error('At least one team member is required'),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Team Section',
        subtitle: subtitle || 'No subtitle',
      };
    },
  },
});
