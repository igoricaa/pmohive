'use client';

import { cn } from '@/lib/utils';
import Burger from './burger';
import { useState } from 'react';
import Link from 'next/link';
import { GeneralInfo } from '../../../sanity.types';
import hexagonalPattern from '../../../public/hexagonal-pattern.svg';
import ImageNext from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';
import { routes } from '@/app/data';
import MenuLink from '../menuLink';

const MobileMenu = ({ socials }: { socials: GeneralInfo['socials'] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='xl:hidden'>
      <Burger isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={cn(
          'fixed inset-0 z-20 transition-opacity duration-300',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={cn(
            'absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_right,transparent_100px,black_20%,black_100%)] transition-opacity duration-300 ',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,transparent_20%,black_50%,black_100%)] transition-opacity duration-300 ',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div
          className={cn(
            'absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_right,transparent_50%,black_70%,black_100%)] transition-opacity duration-300 ',
            isOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div
        className={cn(
          'fixed top-0 right-0 w-full sm:w-130 h-screen bg-black translate-x-full transition-transform ease-out duration-300 z-30 px-6 sm:px-8 pb-6 sm:pb-8 pt-26 sm:pt-35 flex flex-col justify-between overflow-hidden',
          'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-black before:from-5% before:via-[#F79E62] before:via-50% before:to-black before:to-95%',
          isOpen && 'translate-x-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageNext
          src={hexagonalPattern}
          alt='Hexagonal pattern'
          unoptimized
          className='object-contain min-w-[747px] h-[531px] -z-10 absolute -top-6 -left-50'
        />

        <div className='flex flex-col gap-4 sm:gap-6'>
          {routes.map((route) => (
            <MenuLink key={route.path} route={route} variant='mobile-menu' />
          ))}
        </div>

        <div className='flex flex-col-reverse sm:flex-col gap-4'>
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
                  <ImageNext
                    src={urlFor(social.icon as SanityImageSource).url()}
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

          <nav className='flex flex-col sm:flex-row sm:items-center gap-3'>
            <Link
              href='/data-protection'
              className='font-sans font-semibold text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Data Protection
            </Link>
            <span className='font-light text-base tracking-[0.1px] text-light-grey hidden sm:block'>
              |
            </span>
            <Link
              href='/terms'
              className='font-sans font-semibold text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Terms &amp; Conditions
            </Link>
            <span className='text-base tracking-[0.1px] text-light-grey hidden sm:block'>
              |
            </span>
            <Link
              href='/imprint'
              className='font-sans font-semibold text-base tracking-[0.1px] text-light-grey whitespace-nowrap'
            >
              Imprint
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
