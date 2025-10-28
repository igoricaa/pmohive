'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { useCallback } from 'react';

const supportsViewTransitions =
  typeof document !== 'undefined' && 'startViewTransition' in document;

function slideInOutAnimation() {
  // Old page exit animation
  document.documentElement.animate(
    [
      {
        opacity: '1',
        transform: 'translateY(0)',
      },
      {
        opacity: '0.2',
        transform: 'translateY(-35%)',
      },
    ],
    {
      duration: 1200,
      easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    }
  );

  // New page enter animation
  document.documentElement.animate(
    [
      {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
      },
    ],
    {
      duration: 1200,
      easing: 'cubic-bezier(0.87, 0, 0.13, 1)',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}

interface TransitionOptions {
  /**
   * Callback function to customize the transition animation
   * Called after startViewTransition is initiated
   */
  onTransitionReady?: () => void;
}

/**
 * useMotionRouter
 *
 * Enhanced router hook that wraps navigation in View Transitions API
 * with Motion-powered animations. Drop-in replacement for next/navigation's useRouter.
 *
 * @example
 * ```tsx
 * const router = useMotionRouter();
 *
 * router.push('/about-us', {
 *   onTransitionReady: () => {
 *     // Custom animation logic
 *   }
 * });
 * ```
 */
export function useMotionRouter() {
  const router = useNextRouter();

  const push = useCallback(
    (href: string, options?: TransitionOptions) => {
      if (!supportsViewTransitions) {
        // Fallback for unsupported browsers
        router.push(href);
        return;
      }

      // Use browser's native View Transitions API
      const transition = (document as any).startViewTransition(() => {
        // This callback updates the DOM
        router.push(href);
      });

      // Apply animations after snapshots are captured but before animation plays
      transition.ready.then(() => {
        // Call custom animation or use default
        if (options?.onTransitionReady) {
          options.onTransitionReady();
        } else {
          slideInOutAnimation();
        }
      });
    },
    [router]
  );

  const replace = useCallback(
    (href: string, options?: TransitionOptions) => {
      if (!supportsViewTransitions) {
        router.replace(href);
        return;
      }

      // Use browser's native View Transitions API
      const transition = (document as any).startViewTransition(() => {
        // This callback updates the DOM
        router.replace(href);
      });

      // Apply animations after snapshots are captured but before animation plays
      transition.ready.then(() => {
        if (options?.onTransitionReady) {
          options.onTransitionReady();
        } else {
          slideInOutAnimation();
        }
      });
    },
    [router]
  );

  return {
    push,
    replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
  };
}
