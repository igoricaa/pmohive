'use client';

import { AnimatePresence, easeOut, motion, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useAppContext } from './providers/app-ready-provider';

function LoadingProgressBar() {
  const progress = useMockLoading();
  const [showLoader, setShowLoader] = useState(() => {
    // Check if this is truly the initial load
    if (typeof window === 'undefined') return true;
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    return !hasLoaded;
  });
  const { setAppIsReady } = useAppContext();

  const toggleScroll = (value: boolean) => {
    const body = document.body as HTMLElement;
    body.style.overflow = value ? 'hidden' : '';
    if (value) {
      body.setAttribute('data-lenis-prevent', 'true');
    } else {
      body.removeAttribute('data-lenis-prevent');
    }
  };

  useEffect(() => {
    // If we're not showing the loader, we've already loaded - mark it immediately
    if (!showLoader) {
      sessionStorage.setItem('hasLoaded', 'true');
      setAppIsReady(true);
      return;
    }

    toggleScroll(true);

    // Listen for progress completion
    const unsubscribe = progress.on('change', (latest) => {
      if (latest >= 0.99) {
        // Mark as loaded BEFORE hiding the loader
        sessionStorage.setItem('hasLoaded', 'true');

        // Wait 150ms to show completed bar before hiding
        setTimeout(() => {
          setShowLoader(false);
          toggleScroll(false);
        }, 150);
      }
    });

    return () => {
      unsubscribe();
      toggleScroll(false);
    };
  }, [showLoader, progress, setAppIsReady]);

  const loaderVariants = {
    initial: { y: 0 },
    exit: {
      y: '-100%',
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <AnimatePresence mode='wait' onExitComplete={() => setAppIsReady(true)}>
      {showLoader && (
        <motion.div
          key='loader'
          variants={loaderVariants}
          initial='initial'
          exit='exit'
          className='fixed inset-0 h-screen w-screen z-200 bg-black-custom flex flex-col gap-5 items-center justify-center'
        >
          <p className='text-white font-semibold text-xl sm:text-2xl uppercase font-mono tracking-[0.2em]'>
            Loading
          </p>
          <div className='w-full max-w-8/10 md:max-w-sm h-1 overflow-hidden rounded-3xl'>
            <motion.div
              className='h-full w-[110vw] md:w-md will-change-transform origin-[0%_50%] bg-primary'
              style={{ scaleX: progress }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useMockLoading() {
  const progress = useSpring(0, {
    stiffness: 80,
    damping: 25,
  });

  useEffect(() => {
    let accumulated = 0;
    const targetDuration = 3000;
    const intervalTime = 350; // Jump every 350ms
    const totalIntervals = Math.floor(targetDuration / intervalTime);
    let currentInterval = 0;

    const interval = setInterval(() => {
      currentInterval++;

      const remaining = 1 - accumulated;
      const intervalsLeft = totalIntervals - currentInterval;

      // Base jump size to reach 100% if we maintain pace
      const baseJump =
        intervalsLeft > 0 ? remaining / intervalsLeft : remaining;

      // Add randomness: ±40% variance
      const randomFactor = 0.6 + Math.random() * 0.8; // 0.6 to 1.4 multiplier
      let jump = baseJump * randomFactor;

      // Safety: Always progress at least 5% of remaining, never overshoot
      jump = Math.max(jump, remaining * 0.05);
      jump = Math.min(jump, remaining);

      // On final interval, guarantee we hit 100%
      if (currentInterval >= totalIntervals) {
        jump = remaining;
      }

      accumulated = Math.min(accumulated + jump, 1);
      progress.set(accumulated);

      if (accumulated >= 1) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [progress]);

  return progress;
}

export default LoadingProgressBar;
