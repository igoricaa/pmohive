'use client';

import NextLink from 'next/link';
import { ComponentProps, MouseEvent } from 'react';
import { useMotionRouter } from '@/hooks/use-motion-router';

/**
 * Motion-powered Link component
 *
 * Drop-in replacement for next-view-transitions Link component.
 * Wraps navigation in View Transitions API with Motion animations.
 *
 * @example
 * ```tsx
 * import { Link } from '@/components/motion-link';
 *
 * <Link href="/about">About</Link>
 * ```
 */
export function Link({
  href,
  onClick,
  replace = false,
  ...props
}: ComponentProps<typeof NextLink>) {
  const router = useMotionRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Check if should use default navigation
    const shouldUseDefaultNavigation =
      e.metaKey || // CMD/CTRL click
      e.ctrlKey || // CTRL click
      e.shiftKey || // Shift click
      e.button !== 0 || // Not left click
      props.target === '_blank'; // External link

    if (shouldUseDefaultNavigation) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();

    // Call user's onClick if provided
    onClick?.(e);

    // Navigate with View Transitions
    if (replace) {
      router.replace(href.toString());
    } else {
      router.push(href.toString());
    }
  };

  return <NextLink href={href} onClick={handleClick} {...props} />;
}
