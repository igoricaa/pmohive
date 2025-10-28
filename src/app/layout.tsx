import { Geist, Geist_Mono } from 'next/font/google';
import './(frontend)/globals.css';
import Header from '@/components/header/header';
import Footer from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
