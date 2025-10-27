'use client';

import { cn } from '@/lib/utils';
import Burger from './burger';
import { useEffect, useState } from 'react';
import { Link } from '@/components/motion-link';
import { GeneralInfo } from '../../../sanity.types';
import hexagonalPattern from '../../../public/hexagonal-pattern.svg';
import ImageNext from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';
import { Route } from '@/lib/types';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

const MobileMenu = ({
  socials,
  routes,
}: {
  socials: GeneralInfo['socials'];
  routes: Route[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-lenis-prevent', 'true');
    } else {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-lenis-prevent');
    }

    return () => {
      document.body.style.overflow = '';
      document.body.removeAttribute('data-lenis-prevent');
    };
  }, [isOpen]);

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
          'fixed top-0 right-0 w-full sm:w-130 h-screen bg-black translate-x-full transition-transform ease-out duration-200 z-30 px-6 sm:px-8 pb-6 sm:pb-8 pt-26 sm:pt-35 flex flex-col justify-between overflow-hidden',
          'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-black before:from-5% before:via-[#F79E62] before:via-50% before:to-black before:to-95%',
          isOpen && 'translate-x-0'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ImageNext
          src={hexagonalPattern}
          alt='Hexagonal pattern'
          unoptimized
          className='object-contain min-w-[595px] h-[423px] -z-10 absolute -top-6 -left-5 opacity-20'
        />

        <div className='flex flex-col gap-4 sm:gap-6'>
          {routes.map((route) => {
            // Check if this route or any of its children is active
            const isActive =
              pathname === route.path ||
              (route.children &&
                route.children.some((child) => pathname === child.path));

            // If route has children, render as accordion
            if (route.children && route.children.length > 0) {
              return (
                <Accordion
                  key={route.path}
                  type='single'
                  collapsible
                  className='border-none'
                >
                  <AccordionItem value={route.path} className='border-none'>
                    <AccordionTrigger
                      className={cn(
                        'text-2xl sm:text-4xl font-semibold hover:no-underline py-0 group/trigger relative',
                        isActive && 'text-primary translate-x-6 sm:translate-x-8'
                      )}
                    >
                      <span
                        className={cn(
                          'text-primary text-2xl sm:text-4xl font-semibold opacity-0 invisible group-hover/trigger:opacity-100 group-hover/trigger:visible absolute -left-6 sm:-left-8 transition-[opacity,visibility]',
                          isActive && 'opacity-100 visible'
                        )}
                      >
                        /
                      </span>
                      {route.label}
                    </AccordionTrigger>
                    <AccordionContent className='pb-0 pt-4'>
                      <div className='flex flex-col gap-3 pl-6 sm:pl-8'>
                        {route.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className={cn(
                              'text-lg sm:text-xl font-medium hover:text-primary transition-colors relative group/child pl-4',
                              pathname === child.path && 'text-primary'
                            )}
                          >
                            <span
                              className={cn(
                                'text-primary text-lg sm:text-xl opacity-0 invisible group-hover/child:opacity-100 group-hover/child:visible absolute -left-0 transition-[opacity,visibility]',
                                pathname === child.path && 'opacity-100 visible'
                              )}
                            >
                              /
                            </span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            }

            // Default link without accordion
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  'text-2xl sm:text-4xl font-semibold hover:text-primary transition-colors group relative',
                  pathname === route.path &&
                    'text-primary translate-x-6 sm:translate-x-8'
                )}
              >
                <span
                  className={cn(
                    'text-primary text-2xl sm:text-4xl font-semibold opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute -left-6 sm:-left-8 transition-[opacity,visibility]',
                    pathname === route.path && 'opacity-100 visible'
                  )}
                >
                  /
                </span>
                {route.label}
              </Link>
            );
          })}
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
