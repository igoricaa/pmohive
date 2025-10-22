'use server';

import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  interest: 'introduction-to-pmo' | 'data-center-potentials';
  message: string;
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
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

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
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
