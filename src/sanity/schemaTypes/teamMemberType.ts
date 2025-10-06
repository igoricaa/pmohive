import { UsersIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Team member full name',
      validation: (rule) => rule.required().error('Name is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Team member profile image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility',
          validation: (rule) =>
            rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (rule) => rule.required().error('Image is required'),
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      description: 'Areas of expertise or specializations',
      of: [{ type: 'string' }],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .error('At least one specialization is required'),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      description: 'Team member biography',
      validation: (rule) => rule.required().error('Bio is required'),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      specializations: 'specializations',
      media: 'image',
    },
    prepare({ title, specializations, media }) {
      return {
        title: title || 'Team Member',
        subtitle:
          specializations && specializations.length > 0
            ? specializations.join(', ')
            : 'No specializations',
        media,
      };
    },
  },
});
