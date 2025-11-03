import { defineField, defineType } from 'sanity';
import { SearchIcon } from 'lucide-react';

export const seoType = defineType({
  name: 'seo',
  title: 'SEO & Meta Tags',
  type: 'object',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description:
        'SEO title for search engines (50-60 characters recommended). Leave empty to use page title.',
      validation: (rule) =>
        rule.max(60).warning('Meta title should be 60 characters or less'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Brief description for search results (150-160 characters recommended). Include primary keywords and a call-to-action.',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Meta description should be 160 characters or less'),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Social Share Title (Open Graph)',
      type: 'string',
      description:
        'Title for social media sharing (Facebook, LinkedIn). Leave empty to use Meta Title.',
      validation: (rule) =>
        rule.max(60).warning('OG title should be 60 characters or less'),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Social Share Description',
      type: 'text',
      rows: 3,
      description:
        'Description for social media sharing. Leave empty to use Meta Description.',
      validation: (rule) =>
        rule.max(160).warning('OG description should be 160 characters or less'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description:
        'Custom image for social media (recommended: 1200x630px). Leave empty to use featured image.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Alternative text for accessibility',
        },
      ],
    }),
    defineField({
      name: 'keywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Target keywords for this page (3-5 recommended). Used for internal SEO tracking.',
      options: {
        layout: 'tags',
      },
      validation: (rule) =>
        rule.max(10).warning('Consider using 3-5 primary keywords'),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (Advanced)',
      type: 'url',
      description:
        'Override the default canonical URL. Only use if this page is duplicate content from another source.',
      validation: (rule) =>
        rule.uri({
          scheme: ['https', 'http'],
        }),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description:
        'Prevent search engines from indexing this page. Use for draft, duplicate, or internal pages.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'metaTitle',
      description: 'metaDescription',
      noIndex: 'noIndex',
    },
    prepare({ title, description, noIndex }) {
      return {
        title: title || 'No meta title set',
        subtitle: noIndex
          ? '🚫 Hidden from search engines'
          : description
            ? description.substring(0, 80) + '...'
            : 'No meta description set',
      };
    },
  },
});
