import './(frontend)/globals.css';
import AnimatedButton from '@/components/animated-button';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import Lenis from '@/components/lenis';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function GlobalNotFound() {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Header />
        <Lenis>
          <div className='min-h-screen bg-black overflow-hidden relative '>
            <Image
              src={'404.svg'}
              alt='404'
              width={1920}
              height={1080}
              unoptimized
              className='absolute top-0 left-0 w-full h-full object-cover z-1'
            />

            <div className='absolute inset-0 w-full h-full ellipse-gradient'></div>

            <main className='relative z-10 flex flex-col items-start justify-end min-h-screen px-side pt-32 sm:pt-36 xl:pt-40 pb-16'>
              <div className='w-full 2xl:max-w-10/12 mx-auto'>
                <p className='font-mono font-medium text-lg text-white mb-2 sm:mb-3 xl:mb-1'>
                  uups <span className='text-primary'>/pmo</span>
                </p>

                {/* Large 404 text */}
                <Image
                  src={'404-text.svg'}
                  alt='404'
                  width={550}
                  height={210}
                  unoptimized
                  className='w-full sm:w-95 xl:w-137 h-auto object-contain mb-4 xl:mb-6'
                />

                {/* Error message */}
                <p className='font-mono text-sm leading-normal mb-4 sm:mb-6  sm:max-w-95 xl:max-w-137'>
                  This page is no longer available. Our infrastructure remains
                  fully operational — return to the homepage to find the
                  information you&apos;re looking for.
                </p>

                {/* CTA Buttons */}
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
                  <AnimatedButton
                    text='Back to home'
                    highlightedText='/pmo'
                    href='/'
                    variant='default'
                    className='w-full sm:w-auto justify-center'
                  />
                  <AnimatedButton
                    text='Contact us'
                    href='/contact-us'
                    variant='secondary'
                    icon={{ type: 'lucide', name: 'ArrowRight' }}
                    iconClassName='w-4 h-4 sm:w-6 sm:h-6'
                    className='w-full sm:w-auto justify-center'
                  />
                </div>
              </div>
            </main>
          </div>
        </Lenis>
        <Footer />
      </body>
    </html>
  );
}
