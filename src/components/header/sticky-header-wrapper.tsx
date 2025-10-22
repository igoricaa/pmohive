'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface StickyHeaderWrapperProps {
  topBar: React.ReactNode;
  mainBar: React.ReactNode;
}

export default function StickyHeaderWrapper({
  topBar,
  mainBar,
}: StickyHeaderWrapperProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Track if we're scrolled past 100px
          setIsScrolled(currentScrollY >= 100);

          // Clear any existing timeout
          if (scrollTimeout.current) {
            clearTimeout(scrollTimeout.current);
          }

          // Only apply hide/show logic after 100px threshold
          if (currentScrollY >= 100) {
            // Hide header immediately while scrolling (any direction)
            setIsVisible(false);

            // Set timeout to show header after 0.3 seconds of no scrolling
            scrollTimeout.current = setTimeout(() => {
              setIsVisible(true);
            }, 300);
          } else {
            // Above 100px threshold - always show header
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-side transition-colors duration-300 ${
        isScrolled
          ? 'bg-gradient-to-b from-black/90 via-black/70 to-transparent'
          : ''
      }`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ opacity: 1, height: 'auto' }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {topBar}
          </motion.div>
        )}
      </AnimatePresence>
      {mainBar}
    </motion.header>
  );
}
