import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Lenis from '@/components/lenis';

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
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative before:fixed before:inset-0 before:bg-[url('/bg-pattern.svg')] before:bg-repeat before:bg-size-[12px] before:opacity-15 before:-z-10`}
      >
        <Lenis>
          <Header />
          {children}
          <Footer />
        </Lenis>
      </body>
    </html>
  );
}
