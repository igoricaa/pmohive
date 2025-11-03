import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description:
        'SEO settings for this blog post. Optimized metadata improves search visibility and social sharing.',
    }),
    defineField({
      name: 'subtitle',
      type: 'subtitle',
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
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
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'postCategory' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredMedia',
      title: 'Featured Image',
      type: 'image',
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredMedia',
      category: 'category.name',
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category,
        media,
      };
    },
  },
});
