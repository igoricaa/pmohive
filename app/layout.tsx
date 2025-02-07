import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pmohive.com'),
  title: {
    default: 'PMO Hive',
    template: '%s | PMO Hive',
  },
  description:
    'PMO Hive is an innovative consultancy and recruitment agency specialising in Project Controls, PMO, and Capital Projects talent for the Energy and Chemical sectors, including Offshore Wind, Nuclear, Hydrogen, CCS, BESS, and Oil & Gas.',
  openGraph: {
    title: 'PMO Hive',
    description:
      'PMO Hive is an innovative consultancy and recruitment agency specialising in Project Controls, PMO, and Capital Projects talent for the Energy and Chemical sectors, including Offshore Wind, Nuclear, Hydrogen, CCS, BESS, and Oil & Gas.',
    url: 'https://pmohive.com',
    siteName: 'PMO Hive',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'PMO Hive',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${nunitoSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
