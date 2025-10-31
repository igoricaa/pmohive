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

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PMO Hive',
  description:
    'PMO Hive is a platform for PMO professionals to connect, learn, and grow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const termlyUuid = process.env.NEXT_PUBLIC_TERMLY_UUID;

  return (
    <html lang='en'>
      <head>
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
