import { SettingsIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const generalInfoType = defineType({
  name: 'generalInfo',
  title: 'General Info',
  type: 'document',
  icon: SettingsIcon,
  groups: [
    {
      name: 'logo',
      title: 'Logo',
      icon: SettingsIcon,
    },
    {
      name: 'contact',
      title: 'Contact',
      icon: SettingsIcon,
    },
    {
      name: 'social',
      title: 'Social Media',
      icon: SettingsIcon,
    },
    {
      name: 'business',
      title: 'Business Info',
      icon: SettingsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'logoFull',
      title: 'Full Logo',
      type: 'image',
      description: 'Full company logo',
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
      validation: (rule) => rule.required().error('Full logo is required'),
      group: 'logo',
    }),
    defineField({
      name: 'logoMark',
      title: 'Logo Mark',
      type: 'image',
      description: 'Logo mark or icon (smaller version)',
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
      group: 'logo',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address',
      validation: (rule) =>
        rule.required().email().error('A valid email address is required'),
      group: 'contact',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Contact phone number',
      validation: (rule) => rule.required().error('Phone number is required'),
      group: 'contact',
    }),
    defineField({
      name: 'googleMapCoordinates',
      title: 'Google Map Coordinates',
      type: 'geopoint',
      description: 'Google map coordinates',
      validation: (rule) =>
        rule.required().error('Google map coordinates are required'),
      group: 'contact',
    }),
    defineField({
      name: 'socials',
      title: 'Social Media',
      type: 'array',
      description: 'Social media links',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Social media platform name',
              validation: (rule) => rule.required().error('Title is required'),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Social media profile URL',
              validation: (rule) => rule.required().error('URL is required'),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Social media icon',
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
                    rule
                      .required()
                      .error('Alt text is required for accessibility'),
                },
              ],
              validation: (rule) => rule.required().error('Icon is required'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
              media: 'icon',
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || 'Social Media',
                subtitle: subtitle || 'No URL',
                media,
              };
            },
          },
        },
      ],
      group: 'social',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'Full legal company name (for structured data)',
      validation: (rule) =>
        rule.required().error('Company name is required for SEO'),
      group: 'business',
    }),
    defineField({
      name: 'description',
      title: 'Company Description',
      type: 'text',
      rows: 3,
      description:
        'Brief company description for search engines (150-160 characters)',
      validation: (rule) =>
        rule
          .required()
          .max(160)
          .error('Description is required (max 160 characters)'),
      group: 'business',
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'object',
      description: 'Company physical address for Local Business schema',
      fields: [
        defineField({
          name: 'streetAddress',
          title: 'Street Address',
          type: 'string',
          description: 'Street number and name',
          validation: (rule) =>
            rule.required().error('Street address is required'),
        }),
        defineField({
          name: 'addressLocality',
          title: 'City',
          type: 'string',
          description: 'City or locality',
          validation: (rule) => rule.required().error('City is required'),
        }),
        defineField({
          name: 'addressRegion',
          title: 'State/Region',
          type: 'string',
          description: 'State, province, or region',
          validation: (rule) =>
            rule.required().error('State/region is required'),
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
          description: 'ZIP or postal code',
          validation: (rule) =>
            rule.required().error('Postal code is required'),
        }),
        defineField({
          name: 'addressCountry',
          title: 'Country',
          type: 'string',
          description: 'Country name or ISO 3166-1 alpha-2 code (e.g., US, GB)',
          validation: (rule) => rule.required().error('Country is required'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Physical address is required for Local Business schema'),
      group: 'business',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      description: 'Operating hours for Local Business schema',
      fields: [
        defineField({
          name: 'openingTime',
          title: 'Opening Time',
          type: 'string',
          description: 'Format: HH:MM (24-hour, e.g., 09:00)',
          validation: (rule) =>
            rule
              .required()
              .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                name: 'time',
                invert: false,
              })
              .error('Invalid time format. Use HH:MM (e.g., 09:00)'),
        }),
        defineField({
          name: 'closingTime',
          title: 'Closing Time',
          type: 'string',
          description: 'Format: HH:MM (24-hour, e.g., 17:00)',
          validation: (rule) =>
            rule
              .required()
              .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                name: 'time',
                invert: false,
              })
              .error('Invalid time format. Use HH:MM (e.g., 17:00)'),
        }),
        defineField({
          name: 'daysOfWeek',
          title: 'Days of Week',
          type: 'array',
          description: 'Select operating days',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Monday', value: 'Monday' },
              { title: 'Tuesday', value: 'Tuesday' },
              { title: 'Wednesday', value: 'Wednesday' },
              { title: 'Thursday', value: 'Thursday' },
              { title: 'Friday', value: 'Friday' },
              { title: 'Saturday', value: 'Saturday' },
              { title: 'Sunday', value: 'Sunday' },
            ],
          },
          validation: (rule) =>
            rule.required().min(1).error('Select at least one day'),
        }),
      ],
      validation: (rule) =>
        rule.required().error('Business hours are required for Local Business schema'),
      group: 'business',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'string',
      description: 'Relative price indicator for services (shown in local search results)',
      options: {
        list: [
          { title: '$ (Budget-Friendly)', value: '$' },
          { title: '$$ (Moderate)', value: '$$' },
          { title: '$$$ (Premium)', value: '$$$' },
          { title: '$$$$ (Luxury)', value: '$$$$' },
        ],
      },
      group: 'business',
    }),
    defineField({
      name: 'businessType',
      title: 'Business Type (Schema.org)',
      type: 'string',
      description: 'Select the most specific business category for structured data (helps Google understand your business)',
      options: {
        list: [
          { title: 'Local Business (Generic)', value: 'LocalBusiness' },
          { title: 'Professional Service', value: 'ProfessionalService' },
          { title: 'Consultant', value: 'Consultant' },
          { title: 'Accounting Service', value: 'AccountingService' },
          { title: 'Attorney', value: 'Attorney' },
          { title: 'Financial Service', value: 'FinancialService' },
        ],
      },
      initialValue: 'ProfessionalService',
      validation: (rule) => rule.required().error('Business type is required for structured data'),
      group: 'business',
    }),
    defineField({
      name: 'officeImage',
      title: 'Office Image',
      type: 'image',
      description: 'Photo of your office or workplace (optional but recommended for Local Business schema)',
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
            rule.custom((alt, context) => {
              const parent = context.parent as { asset?: { _ref?: string } };
              return !parent?.asset?._ref || alt
                ? true
                : 'Alt text is required when image is uploaded';
            }),
        },
      ],
      group: 'business',
    }),
  ],
  preview: {
    select: {
      email: 'email',
      phone: 'phone',
    },
    prepare({ email, phone }) {
      return {
        title: 'General Settings',
        subtitle: email || phone || 'No contact info',
      };
    },
  },
});
