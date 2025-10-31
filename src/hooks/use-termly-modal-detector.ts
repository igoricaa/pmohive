'use client';

import { useEffect } from 'react';

/**
 * Hook that detects when Termly's cookie preferences modal is open
 * (NOT the consent banner, only the large preferences modal)
 * and disables Lenis smooth scroll by setting data-lenis-prevent on body.
 *
 * Uses the 't-preference-modal' class to specifically target the preferences modal.
 */
export function useTermlyModalDetector() {
  useEffect(() => {
    let isModalOpen = false;

    const checkModalVisibility = () => {
      // Look for the preferences modal specifically (not the consent banner)
      const modal = document.querySelector('.t-preference-modal');
      if (!modal) {
        if (isModalOpen) {
          // Modal was open but now removed from DOM
          document.body.removeAttribute('data-lenis-prevent');
          isModalOpen = false;
        }
        return;
      }

      // Check if preferences modal is visible
      const isVisible =
        (modal as HTMLElement).offsetParent !== null && // Not display: none
        window.getComputedStyle(modal).visibility !== 'hidden' &&
        modal.getAttribute('aria-hidden') !== 'true';

      if (isVisible && !isModalOpen) {
        // Modal opened
        document.body.setAttribute('data-lenis-prevent', 'true');
        isModalOpen = true;
      } else if (!isVisible && isModalOpen) {
        // Modal closed
        document.body.removeAttribute('data-lenis-prevent');
        isModalOpen = false;
      }
    };

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      // Use requestAnimationFrame to ensure Termly's styles/classes are applied
      requestAnimationFrame(() => {
        checkModalVisibility();
      });
    });

    // Observe entire document for modal appearing/disappearing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'aria-hidden', 'class'],
    });

    // Cleanup
    return () => {
      observer.disconnect();
      document.body.removeAttribute('data-lenis-prevent');
    };
  }, []);
}
