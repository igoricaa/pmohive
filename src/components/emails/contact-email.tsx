import * as React from 'react';
import type { ContactFormData } from '@/actions/contact';

export const ContactEmail = ({
  firstName,
  lastName,
  email,
  country,
  interest,
  message,
}: ContactFormData) => {
  const interestLabel =
    interest === 'introduction-to-pmo'
      ? 'Introduction to PMO'
      : 'Data Center Potentials';

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9fafb',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#111827',
          }}
        >
          New Contact Form Submission
        </h1>

        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Contact Information
          </h2>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#374151' }}>Name:</strong>{' '}
            <span style={{ color: '#111827' }}>
              {firstName} {lastName}
            </span>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#374151' }}>Email:</strong>{' '}
            <a
              href={`mailto:${email}`}
              style={{ color: '#2563eb', textDecoration: 'none' }}
            >
              {email}
            </a>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#374151' }}>Country:</strong>{' '}
            <span style={{ color: '#111827' }}>{country}</span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Area of Interest
          </h2>
          <div
            style={{
              backgroundColor: '#f3f4f6',
              padding: '12px',
              borderRadius: '6px',
              color: '#111827',
            }}
          >
            {interestLabel}
          </div>
        </div>

        <div>
          <h2
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Message
          </h2>
          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '16px',
              borderRadius: '6px',
              borderLeft: '4px solid #2563eb',
              color: '#111827',
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6',
            }}
          >
            {message}
          </div>
        </div>

        <div
          style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #e5e7eb',
            fontSize: '12px',
            color: '#6b7280',
          }}
        >
          This email was sent from the PMO Hive contact form.
        </div>
      </div>
    </div>
  );
};
