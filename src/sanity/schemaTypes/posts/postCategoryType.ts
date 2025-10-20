import { defineField, defineType } from 'sanity';

export const postCategoryType = defineType({
  name: 'postCategory',
  title: 'Post Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare({ title }) {
      return {
        title,
      };
    },
  },
});
