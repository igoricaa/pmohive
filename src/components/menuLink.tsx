'use client';

import { Route } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Link } from '@/components/motion-link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ArrowUpRight } from 'lucide-react';

const MenuLink = ({
  route,
  className,
  variant,
}: {
  route: Route;
  className?: string;
  variant?: 'default' | 'footer' | 'mobile-menu';
}) => {
  const pathname = usePathname();

  // Check if this route or any of its children is active
  const isActive =
    pathname === route.path ||
    (route.children && route.children.some((child) => pathname === child.path));

  // For footer and mobile variants, don't render dropdown (will be handled separately)
  if (variant === 'footer' || variant === 'mobile-menu') {
    return (
      <Link
        href={route.path}
        className={cn(
          'text-xl font-bold hover:text-primary transition-[color,opacity] group relative whitespace-nowrap',
          className,
          pathname === route.path && 'text-primary',
          variant === 'footer' &&
            `opacity-50 hover:opacity-100 hover:translate-x-4 sm:hover:translate-x-0 translate-x-0 ${
              pathname === route.path
                ? 'opacity-100 translate-x-4 sm:translate-x-0'
                : 'opacity-50'
            }`,
          variant === 'mobile-menu' &&
            `text-2xl sm:text-4xl font-semibold ${
              pathname === route.path && 'translate-x-6 sm:translate-x-8'
            }`
        )}
      >
        <span
          className={cn(
            'text-primary text-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute -left-4 transition-[opacity,visibility]',
            pathname === route.path && 'opacity-100 visible',
            variant === 'mobile-menu' &&
              'text-2xl sm:text-4xl font-semibold -left-6 sm:-left-8'
          )}
        >
          /
        </span>
        {route.label}
      </Link>
    );
  }

  // If route has children, render as dropdown
  if (route.children && route.children.length > 0) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                'text-xl font-bold text-white! hover:text-primary! transition-colors group/trigger relative whitespace-nowrap bg-transparent! hover:bg-transparent! h-auto px-0 py-0',
                isActive && 'text-primary',
                className
              )}
            >
              <span
                className={cn(
                  'text-primary text-xl opacity-0 invisible group-hover/trigger:opacity-100 group-hover/trigger:visible absolute -left-4 transition-[opacity,visibility] hover:will-change-[opacity]',
                  isActive && 'opacity-100 visible'
                )}
              >
                /
              </span>
              {route.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className='bg-black-custom p-0'>
              <ul className='grid gap-4 px-6 pt-4 pb-6 has-[li:hover]:[&>li]:opacity-50'>
                {route.children.map((child) => (
                  <li key={child.path} className='transition-opacity hover:opacity-100!'>
                    <NavigationMenuLink asChild className='bg-transparent!'>
                      <Link
                        href={child.path}
                        className={cn(
                          'text-white whitespace-nowrap flex flex-row items-center gap-2 select-none rounded-md p-0! leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-primary group',
                          pathname === child.path && 'bg-accent text-primary'
                        )}
                      >
                        <div className='text-base font-semibold leading-none'>
                          {child.label}
                        </div>
                        <ArrowUpRight
                          color='#F09A60'
                          size={24}
                          className={cn(
                            'size-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility]',
                            pathname === child.path && 'opacity-100 visible'
                          )}
                        />
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // Default link without dropdown
  return (
    <Link
      href={route.path}
      className={cn(
        'text-xl font-bold hover:text-primary transition-[color,opacity] group relative whitespace-nowrap',
        className,
        pathname === route.path && 'text-primary'
      )}
    >
      <span
        className={cn(
          'text-primary text-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute -left-4 transition-[opacity,visibility] hover:will-change-[opacity]',
          pathname === route.path && 'opacity-100 visible'
        )}
      >
        /
      </span>
      {route.label}
    </Link>
  );
};

export default MenuLink;
