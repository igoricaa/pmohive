import Link from 'next/link';
import Image from 'next/image';
import { getGeneralInfoData } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { routes } from '@/app/data';
import MenuLink from './menuLink';
import hexagonalPattern from '../../public/hexagonal-pattern.svg';

export default async function Footer() {
  const { generalInfo: generalInfoData } = await getGeneralInfoData();

  if (!generalInfoData) {
    return <footer>Loading...</footer>;
  }

  const { logoFull, email, phone, socials } = generalInfoData;

  const routesMidIndex = Math.ceil(routes.length / 2);

  return (
    <footer className='relative overflow-hidden pt-6 sm:pt-10.5 xl:pt-22.5 px-side '>
      {/* Decorative hexagonal pattern - top right */}
      <div className='absolute right-0 -top-1.5 md:-top-26 md:-right-53 xl:-right-41 w-[747px] h-[531px] opacity-20 pointer-events-none z-0'>
        <Image
          src={hexagonalPattern}
          alt='Hexagonal pattern'
          width={747}
          height={531}
          unoptimized
          className='object-contain w-118 sm:w-187'
        />
      </div>

      <div className='relative z-10'>
        {/* Top section with logo and navigation */}
        <div className='flex flex-col sm:flex-row justify-between'>
          {/* Logo */}
          <Link href='/'>
            <Image
              src={urlFor(logoFull).url()}
              alt={logoFull.alt}
              width={419}
              height={214}
              className='object-contain h-full w-44 min-w-44 md:w-68.5 md:min-w-68.5 xl:w-105 xl:min-w-105'
            />
          </Link>

          {/* Right side content */}
          <div className='flex flex-1 min-w-0 flex-col sm:items-end pb-2.5'>
            {/* Tagline */}
            <h2 className='font-bold md:max-lg:font-semibold text-[28px] sm:text-4xl max-w-63 sm:max-w-80 xl:max-w-none sm:text-end mt-4 sm:mt-0'>
              Precision in Every Future We Build
            </h2>

            {/* Navigation links */}
            <nav className='flex flex-col gap-4 sm:gap-3 xl:gap-4 py-8 sm:pt-24 sm:pb-6 xl:pt-11 xl:pb-9'>
              <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-end'>
                {routes.slice(0, routesMidIndex).map((route) => (
                  <MenuLink key={route.path} route={route} variant='footer' />
                ))}
              </div>

              <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-end'>
                {routes.slice(routesMidIndex).map((route) => (
                  <MenuLink key={route.path} route={route} variant='footer' />
                ))}
              </div>
            </nav>

            {/* Social media icons */}
            {socials && socials.length > 0 && (
              <div className='flex items-center gap-6 xl:gap-8'>
                {socials.map((social) => (
                  <Link
                    key={social.url}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:opacity-70 transition-opacity'
                    aria-label={social.title}
                  >
                    <Image
                      src={urlFor(social.icon).url()}
                      alt={social.title}
                      width={30}
                      height={30}
                      unoptimized
                      className='w-7.5 h-7.5 xl:w-8.5 xl:h-8.5'
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom section with copyright and legal links */}
        <div className='flex flex-col sm:flex-row-reverse justify-between pt-4 pb-4.5 sm:pt-5 sm:pb-5 sm:items-center gap-2 border-t-1 border-white/30 mt-8 sm:mt-6 xl:mt-7'>
          {/* Legal links */}
          <nav className='flex items-center gap-3 justify-between'>
            <Link
              href='/data-protection'
              className='font-sans font-semibold text-sm sm:text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Data Protection
            </Link>
            <span className='font-light text-base tracking-[0.1px] text-light-grey'>
              |
            </span>
            <Link
              href='/terms'
              className='font-sans font-semibold text-sm sm:text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Terms &amp; Conditions
            </Link>
            <span className='text-base tracking-[0.1px] text-light-grey'>
              |
            </span>
            <Link
              href='/imprint'
              className='font-sans font-semibold text-sm sm:text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Imprint
            </Link>
          </nav>

          {/* Copyright */}
          <p className='font-mono font-light tracking-[0.1px] sm:mt-0 text-white/40 sm:text-white'>
            � Copyright 2025 /pmohive
          </p>
        </div>
      </div>
    </footer>
  );
}
