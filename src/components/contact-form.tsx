'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AnimatedButton from './animated-button';
import Link from 'next/link';
import { toast } from 'sonner';
import { executeRecaptcha, loadRecaptchaScript } from '@/lib/recaptcha';

const contactFormSchema = z.object({
  fullName: z.string().min(2, '*min 2 chars').max(100, '*max 100 chars'),
  email: z.string().email('*invalid email'),
  company: z.string().max(100, '*max 100 chars').optional().or(z.literal('')),
  phone: z.string().max(20, '*max 20 chars').optional().or(z.literal('')),
  industrySector: z
    .enum([
      'data-centres',
      'oil-gas',
      'chemicals',
      'energy-infrastructure',
      'utilities',
      'other',
      '',
    ])
    .optional(),
  projectType: z
    .enum([
      'programme-management',
      'project-controls',
      'commissioning-support',
      'pmo-advisory',
      'cmms-implementation',
      'project-audit',
      'other',
      '',
    ])
    .optional(),
  message: z.string().min(10, '*min 10 chars').max(2000, '*max 2000 chars'),
  referralSource: z
    .enum([
      'linkedin',
      'referral',
      'search-engine',
      'industry-event',
      'other',
      '',
    ])
    .optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: '*You must consent to data processing',
  }),
  marketingConsent: z.boolean().default(false),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const INDUSTRY_SECTORS = [
  { value: 'data-centres', label: 'Data Centres' },
  { value: 'oil-gas', label: 'Oil & Gas' },
  { value: 'chemicals', label: 'Chemicals' },
  { value: 'energy-infrastructure', label: 'Energy Infrastructure' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'other', label: 'Other' },
];

const PROJECT_TYPES = [
  { value: 'programme-management', label: 'Programme Management' },
  { value: 'project-controls', label: 'Project Controls' },
  { value: 'commissioning-support', label: 'Commissioning Support' },
  { value: 'pmo-advisory', label: 'PMO Advisory' },
  { value: 'cmms-implementation', label: 'CMMS Implementation' },
  { value: 'project-audit', label: 'Project Audit' },
  { value: 'other', label: 'Other' },
];

const REFERRAL_SOURCES = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'referral', label: 'Referral' },
  { value: 'search-engine', label: 'Search Engine' },
  { value: 'industry-event', label: 'Industry Event' },
  { value: 'other', label: 'Other' },
];

export function ContactForm({ className }: { className?: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    // @ts-ignore - Known type incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2
    // See: https://github.com/react-hook-form/resolvers/issues/813
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      company: '',
      phone: '',
      industrySector: '',
      projectType: '',
      message: '',
      referralSource: '',
      gdprConsent: false,
      marketingConsent: false,
    },
    mode: 'onBlur',
  });

  // Load reCAPTCHA script on mount
  useEffect(() => {
    loadRecaptchaScript().catch((error) => {
      console.error('Failed to load reCAPTCHA:', error);
    });
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('contact_form');

      // Prepare submission data with metadata
      const submissionData = {
        fullName: data.fullName,
        email: data.email,
        message: data.message,
        gdprConsent: data.gdprConsent,
        marketingConsent: data.marketingConsent,
        // Convert empty strings to undefined for optional fields
        company: data.company || undefined,
        phone: data.phone || undefined,
        industrySector: data.industrySector || undefined,
        projectType: data.projectType || undefined,
        referralSource: data.referralSource || undefined,
        // Add metadata
        recaptchaToken,
        timestamp: new Date().toISOString(),
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      };

      const { sendContactEmail } = await import('@/actions/contact');
      const response = await sendContactEmail(submissionData);

      if (response.success) {
        form.reset();
        toast.success(response.message);
      } else {
        toast.error(response.message);
        console.error('Error sending email:', response.error);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as any)}
        className={cn('space-y-5 sm:space-y-3', className)}
      >
        {/* Full Name */}
        <FormField
          // @ts-expect-error - Known incompatibility between Zod v4.1.11 and @hookform/resolvers v5.2.2
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Full Name <span className='text-destructive'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder='John Doe'
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email & Phone - Grid on desktop */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          <FormField
            // @ts-expect-error - Zod v4 type incompatibility
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className='text-destructive'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='john.doe@example.com'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            // @ts-expect-error - Zod v4 type incompatibility
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type='tel'
                    placeholder='+44 20 1234 5678'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company Name */}
        <FormField
          // @ts-expect-error - Zod v4 type incompatibility
          control={form.control}
          name='company'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your company'
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Industry Sector & Project Type - Grid on desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
          <FormField
            // @ts-expect-error - Zod v4 type incompatibility
            control={form.control}
            name='industrySector'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Sector</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select industry sector' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-50'>
                    {INDUSTRY_SECTORS.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            // @ts-expect-error - Zod v4 type incompatibility
            control={form.control}
            name='projectType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select project type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className='max-h-50'>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Message */}
        <FormField
          // @ts-expect-error - Zod v4 type incompatibility
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem className='mt-3 sm:mt-6'>
              <FormLabel>
                Message / Enquiry Details{' '}
                <span className='text-destructive'>*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us about your inquiry...'
                  className='resize-none'
                  rows={6}
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* How did you hear about us? */}
        <FormField
          // @ts-expect-error - Zod v4 type incompatibility
          control={form.control}
          name='referralSource'
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select source' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='max-h-50'>
                  {REFERRAL_SOURCES.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* GDPR Consent (Required) */}
        <FormField
          // @ts-expect-error - Zod v4 type incompatibility
          control={form.control}
          name='gdprConsent'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0 mt-6'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel className='font-normal cursor-pointer block'>
                  I consent to PMO Hive processing my information to respond to
                  this enquiry. View our{' '}
                  <Link
                    href='/privacy-policy'
                    className='text-primary underline underline-offset-2 hover:text-primary/80'
                  >
                    Privacy Policy
                  </Link>
                  . <span className='text-destructive'>*</span>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Marketing Consent (Optional) */}
        <FormField
          // @ts-expect-error - Zod v4 type incompatibility
          control={form.control}
          name='marketingConsent'
          render={({ field }) => (
            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className='space-y-1 leading-none'>
                <FormLabel className='font-normal cursor-pointer'>
                  I would like to receive updates and insights from PMO Hive
                  (you can unsubscribe at any time).
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <AnimatedButton
          text={isSubmitting ? 'Sending...' : 'Send Message'}
          variant='secondary'
          onClick={form.handleSubmit(onSubmit as any)}
          icon={{ type: 'lucide', name: 'SendIcon' }}
          iconClassName='size-5'
          className='font-mono flex ml-auto mt-1 sm:mt-1.5'
          disabled={isSubmitting}
          type='submit'
        />
      </form>
    </Form>
  );
}
