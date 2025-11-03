import { ShieldCheckIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const privacyPolicyType = defineType({
  name: 'privacyPolicy',
  title: 'Privacy Policy',
  type: 'document',
  icon: ShieldCheckIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO & Meta Tags',
      type: 'seo',
      description:
        'SEO settings for the Privacy Policy page. Tip: Enable "Hide from Search Engines" to prevent indexing.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
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
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      validation: (rule) => rule.required().error('Last updated date is required'),
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      description: 'E.g., "1.0", "2.1"',
      validation: (rule) => rule.required().error('Version is required'),
    }),
    defineField({
      name: 'termlyEmbedUrl',
      title: 'Termly Embed URL',
      type: 'url',
      description: 'Optional: Embed URL from Termly if using their hosted policy',
    }),
    defineField({
      name: 'introContent',
      title: 'Introduction',
      type: 'blockContent',
      description: 'Optional brief introduction before the main policy content',
    }),
    defineField({
      name: 'content',
      title: 'Policy Content',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Policy content is required'),
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
        title: title || 'Privacy Policy',
        subtitle: `v${version} - Last updated: ${new Date(lastUpdated).toLocaleDateString('en-GB')}`,
      };
    },
  },
});
