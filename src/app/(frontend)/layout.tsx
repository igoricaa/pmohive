import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import Lenis from '@/components/lenis';
import BackgroundGradient from '@/components/bg-gradient';
import QueryProvider from '@/providers/query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ReactTempus } from 'tempus/react';
import { Toaster } from '@/components/ui/sonner';
import { GTMConsentInit } from '@/components/gtm-consent-init';
import { GoogleTagManager } from '@next/third-parties/google';
import TermlyCMP from '@/components/sections/termly-cmp';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const termlyUuid = process.env.NEXT_PUBLIC_TERMLY_UUID;

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <GTMConsentInit />
        {gtmId && <GoogleTagManager gtmId={gtmId} />}
        {termlyUuid && (
          <TermlyCMP
            autoBlock={true}
            masterConsentsOrigin={
              process.env.NEXT_PUBLIC_TERMLY_MASTER_CONSENTS_ORIGIN ||
              'https://www.pmohive.com'
            }
            websiteUUID={termlyUuid}
          />
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
        <ReactTempus patch={true} />
      </body>
    </html>
  );
}
