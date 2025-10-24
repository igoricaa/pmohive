import * as React from 'react';
import type { ContactFormData } from '@/actions/contact';

export const ContactEmail = ({
  fullName,
  email,
  company,
  phone,
  industrySector,
  projectType,
  message,
  referralSource,
  gdprConsent,
  marketingConsent,
  timestamp,
  ipAddress,
  userAgent,
}: ContactFormData) => {
  // Label mappings
  const industrySectorLabels: Record<string, string> = {
    'data-centres': 'Data Centres',
    'oil-gas': 'Oil & Gas',
    chemicals: 'Chemicals',
    'energy-infrastructure': 'Energy Infrastructure',
    utilities: 'Utilities',
    other: 'Other',
  };

  const projectTypeLabels: Record<string, string> = {
    'programme-management': 'Programme Management',
    'project-controls': 'Project Controls',
    'commissioning-support': 'Commissioning Support',
    'pmo-advisory': 'PMO Advisory',
    'cmms-implementation': 'CMMS Implementation',
    'project-audit': 'Project Audit',
    other: 'Other',
  };

  const referralSourceLabels: Record<string, string> = {
    linkedin: 'LinkedIn',
    referral: 'Referral',
    'search-engine': 'Search Engine',
    'industry-event': 'Industry Event',
    other: 'Other',
  };

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
            <span style={{ color: '#111827' }}>{fullName}</span>
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
          {company && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#374151' }}>Company:</strong>{' '}
              <span style={{ color: '#111827' }}>{company}</span>
            </div>
          )}
          {phone && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#374151' }}>Phone:</strong>{' '}
              <span style={{ color: '#111827' }}>{phone}</span>
            </div>
          )}
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
            Project Details
          </h2>
          {industrySector && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#374151' }}>Industry Sector:</strong>{' '}
              <span style={{ color: '#111827' }}>
                {industrySectorLabels[industrySector]}
              </span>
            </div>
          )}
          {projectType && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#374151' }}>Project Type:</strong>{' '}
              <span style={{ color: '#111827' }}>
                {projectTypeLabels[projectType]}
              </span>
            </div>
          )}
          {referralSource && (
            <div style={{ marginBottom: '12px' }}>
              <strong style={{ color: '#374151' }}>How did they hear about us:</strong>{' '}
              <span style={{ color: '#111827' }}>
                {referralSourceLabels[referralSource]}
              </span>
            </div>
          )}
          {!industrySector && !projectType && !referralSource && (
            <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>
              No project details provided
            </div>
          )}
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
            Consent & Compliance
          </h2>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#374151' }}>GDPR Consent:</strong>{' '}
            <span style={{ color: '#059669', fontWeight: '600' }}>
              ✓ Granted
            </span>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ color: '#374151' }}>Marketing Consent:</strong>{' '}
            <span
              style={{
                color: marketingConsent ? '#059669' : '#6b7280',
                fontWeight: marketingConsent ? '600' : 'normal',
              }}
            >
              {marketingConsent ? '✓ Yes' : 'No'}
            </span>
            {marketingConsent && (
              <span
                style={{
                  marginLeft: '8px',
                  backgroundColor: '#fef3c7',
                  color: '#92400e',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                FOLLOW UP REQUIRED
              </span>
            )}
          </div>
          <div style={{ marginBottom: '12px', fontSize: '12px' }}>
            <strong style={{ color: '#374151' }}>Timestamp:</strong>{' '}
            <span style={{ color: '#6b7280' }}>
              {new Date(timestamp).toLocaleString('en-GB', {
                dateStyle: 'full',
                timeStyle: 'long',
              })}
            </span>
          </div>
          {ipAddress && (
            <div style={{ marginBottom: '12px', fontSize: '12px' }}>
              <strong style={{ color: '#374151' }}>IP Address:</strong>{' '}
              <span style={{ color: '#6b7280' }}>{ipAddress}</span>
            </div>
          )}
          {userAgent && (
            <div style={{ fontSize: '12px' }}>
              <strong style={{ color: '#374151' }}>User Agent:</strong>{' '}
              <span
                style={{
                  color: '#6b7280',
                  wordBreak: 'break-all',
                }}
              >
                {userAgent}
              </span>
            </div>
          )}
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
