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
 * <Link href="/about-us">About</Link>
 * <Link href="/contact" delayMs={200}>Contact</Link> // Delay navigation by 200ms
 * ```
 */
export function Link({
  href,
  onClick,
  replace = false,
  delayMs,
  ...props
}: ComponentProps<typeof NextLink> & { delayMs?: number }) {
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

    // Navigate with View Transitions (with optional delay)
    const navigate = () => {
      if (replace) {
        router.replace(href.toString());
      } else {
        router.push(href.toString());
      }
    };

    if (delayMs) {
      setTimeout(navigate, delayMs);
    } else {
      navigate();
    }
  };

  return <NextLink href={href} onClick={handleClick} {...props} />;
}
