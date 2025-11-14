import { FileTextIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const termsOfUseType = defineType({
  name: 'termsOfUse',
  title: 'Terms of Use',
  type: 'document',
  icon: FileTextIcon,
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description:
        'SEO settings for the Terms of Use page. Tip: Enable "Hide from Search Engines" to prevent indexing.',
      group: 'seo',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required'),
      group: 'content',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (rule) =>
        rule.required().error('Last updated date is required'),
      group: 'content',
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'E.g., "1.0", "2.1"',
      validation: (rule) => rule.required().error('Version is required'),
      group: 'content',
    }),
    defineField({
      name: 'termlyEmbedUrl',
      title: 'Termly Embed URL',
      type: 'url',
      description:
        'Optional: Embed URL from Termly if using their hosted policy',
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      description: 'Composable content blocks for the policy',
      of: [
        defineArrayMember({ type: 'portableTextBlock' }),
        defineArrayMember({ type: 'tableBlock' }),
      ],
      validation: (rule) => rule.required().error('Content is required'),
      group: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      version: 'version',
      lastUpdated: 'lastUpdated',
    },
    prepare({ title, version, lastUpdated }) {
      return {
        title: title || 'Terms of Use',
        subtitle: `v${version} - Last updated: ${new Date(lastUpdated).toLocaleDateString('en-GB')}`,
      };
    },
  },
});
