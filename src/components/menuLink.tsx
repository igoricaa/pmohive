'use client';

import { Route } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MenuLink = ({
  route,
  className,
  variant,
}: {
  route: Route;
  className?: string;
  variant?: 'default' | 'footer';
}) => {
  const pathname = usePathname();

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
          }`
      )}
    >
      <span
        className={cn(
          'text-primary text-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute -left-4 transition-[opacity,visibility]',
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
