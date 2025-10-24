'use server';

import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/contact-email';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  industrySector?:
    | 'data-centres'
    | 'oil-gas'
    | 'chemicals'
    | 'energy-infrastructure'
    | 'utilities'
    | 'other';
  projectType?:
    | 'programme-management'
    | 'project-controls'
    | 'commissioning-support'
    | 'pmo-advisory'
    | 'cmms-implementation'
    | 'project-audit'
    | 'other';
  message: string;
  referralSource?:
    | 'linkedin'
    | 'referral'
    | 'search-engine'
    | 'industry-event'
    | 'other';
  gdprConsent: boolean;
  marketingConsent: boolean;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  recaptchaToken: string;
};

export type ContactFormResponse = {
  success: boolean;
  message: string;
  error?: string;
};

export async function sendContactEmail(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    // 1. Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptchaToken(data.recaptchaToken);
    if (!recaptchaResult.success) {
      console.error('reCAPTCHA verification failed:', recaptchaResult.error);
      return {
        success: false,
        message: 'Security verification failed. Please try again.',
        error: recaptchaResult.error,
      };
    }

    console.log('reCAPTCHA verified successfully, score:', recaptchaResult.score);

    // 2. Validate API key
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    // 3. Send email via Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'PMO Hive <noreply@pmohive.com>',
      to: ['contact@pmohive.com'],
      subject: 'New Contact Form Submission',
      react: ContactEmail(data),
    });

    if (error) {
      console.error('Resend API error:', error);
      return {
        success: false,
        message: 'Failed to send email',
        error: error.message,
      };
    }

    console.log('Email sent successfully:', emailData);
    return {
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
