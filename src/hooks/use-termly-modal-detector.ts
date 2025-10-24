'use client';

import { useEffect } from 'react';

/**
 * Hook that detects when Termly's cookie settings modal is open
 * and disables Lenis smooth scroll by setting data-lenis-prevent on body.
 *
 * Mirrors the pattern used in mobile-menu.tsx and sidebar.tsx.
 */
export function useTermlyModalDetector() {
  useEffect(() => {
    const modalId = 'termly-code-snippet-support';
    let isModalOpen = false;

    const checkModalVisibility = () => {
      const modal = document.getElementById(modalId);
      if (!modal) {
        if (isModalOpen) {
          // Modal was open but now removed from DOM
          document.body.removeAttribute('data-lenis-prevent');
          isModalOpen = false;
        }
        return;
      }

      // Check if modal is visible
      const isVisible =
        modal.offsetParent !== null && // Not display: none
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

    // Initial check
    checkModalVisibility();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      checkModalVisibility();
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
