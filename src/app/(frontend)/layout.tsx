import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import Lenis from '@/components/lenis';
import BackgroundGradient from '@/components/bg-gradient';
import QueryProvider from '@/providers/query-provider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ViewTransitions } from 'next-view-transitions';

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
  return (
    <ViewTransitions>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
        >
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
        </body>
      </html>
    </ViewTransitions>
  );
}
