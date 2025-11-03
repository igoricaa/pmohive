import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import Lenis from '@/components/lenis';
import BackgroundGradient from '@/components/bg-gradient';
import QueryProvider from '@/providers/query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from '@/components/ui/sonner';
import { GTMConsentInit } from '@/components/gtm-consent-init';
import { GoogleTagManager } from '@next/third-parties/google';
import TermlyCMP from '@/components/sections/termly-cmp';
import { Suspense } from 'react';
import { AppProvider } from '@/components/providers/app-ready-provider';
import LoadingProgressBar from '@/components/progress-bar';
import Script from 'next/script';
import { getGeneralInfoData } from '@/sanity/lib/queries';
import OrganizationSchema from '@/components/structured-data/organization-schema';
import LocalBusinessSchema from '@/components/structured-data/local-business-schema';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pmohive.com'),
  title: {
    default: 'PMO Hive | Professional Project Management Services',
    template: '%s | PMO Hive',
  },
  description:
    'PMO Hive delivers expert project management office services, helping organizations optimize project delivery, improve governance, and drive strategic success.',
  keywords: [
    'PMO',
    'project management office',
    'project management services',
    'PMO consulting',
    'project governance',
    'project delivery',
    'portfolio management',
    'program management',
  ],
  authors: [{ name: 'PMO Hive' }],
  creator: 'PMO Hive',
  publisher: 'PMO Hive',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pmohive.com',
    siteName: 'PMO Hive',
    title: 'PMO Hive | Professional Project Management Services',
    description:
      'PMO Hive delivers expert project management office services, helping organizations optimize project delivery, improve governance, and drive strategic success.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'PMO Hive - Professional Project Management Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PMO Hive | Professional Project Management Services',
    description:
      'PMO Hive delivers expert project management office services, helping organizations optimize project delivery, improve governance, and drive strategic success.',
    images: ['/opengraph-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const termlyUuid = process.env.NEXT_PUBLIC_TERMLY_UUID;

  // Fetch general info for structured data (with error handling)
  let generalInfo = null;
  try {
    const data = await getGeneralInfoData();
    generalInfo = data.generalInfo;
  } catch (error) {
    console.error('[SEO] Failed to fetch general info for structured data:', error);
    // Site continues without structured data schemas
  }

  return (
    <html lang='en'>
      <head>
        {/* Structured Data for SEO */}
        {generalInfo && (
          <>
            <OrganizationSchema generalInfo={generalInfo} />
            <LocalBusinessSchema generalInfo={generalInfo} />
          </>
        )}

        {/* Custom Blocking Map must load BEFORE Termly script */}
        {termlyUuid && (
          <Script id='termly-custom-blocking-map' strategy='beforeInteractive'>
            {`
              window.TERMLY_CUSTOM_BLOCKING_MAP = {
                "cdn.sanity.io": "essential"
              };
            `}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <AppProvider>
          <LoadingProgressBar />
          <GTMConsentInit />
          {gtmId && <GoogleTagManager gtmId={gtmId} />}
          {termlyUuid && (
            <Suspense fallback={null}>
              <TermlyCMP
                autoBlock={true}
                masterConsentsOrigin={
                  process.env.NEXT_PUBLIC_TERMLY_MASTER_CONSENTS_ORIGIN ||
                  'https://www.pmohive.com'
                }
                websiteUUID={termlyUuid}
              />
            </Suspense>
          )}

          <QueryProvider>
            <NuqsAdapter>
              <Lenis>
                <Header />
                <BackgroundGradient />
                {children}
                <Footer />
              </Lenis>
            </NuqsAdapter>
          </QueryProvider>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
