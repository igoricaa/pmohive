'use client';

import {
  motion,
  useInView,
  UseInViewOptions,
  Variants,
  MotionProps,
} from 'motion/react';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

type MarginType = UseInViewOptions['margin'];

interface AnimateInViewProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inViewMargin?: MarginType;
  disableOnMobile?: boolean;
}

export function AnimateInView({
  children,
  className,
  variant,
  duration = 0.3,
  delay = 0,
  offset = 0,
  direction = 'down',
  inViewMargin = '0px',
  disableOnMobile = false,
  ...props
}: AnimateInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: inViewMargin });
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const defaultVariants: Variants = {
    hidden: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']:
        direction === 'right' || direction === 'down' ? -offset : offset,
      opacity: 0,
    },
    visible: {
      [direction === 'left' || direction === 'right' ? 'x' : 'y']: 0,
      opacity: 1,
    },
  };

  const combinedVariants = variant || defaultVariants;
  const shouldAnimate = disableOnMobile ? isDesktop : true;

  return (
    <motion.div
      ref={ref}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate={
        shouldAnimate && isInView
          ? 'visible'
          : shouldAnimate
            ? 'hidden'
            : 'visible'
      }
      exit={shouldAnimate ? 'hidden' : 'visible'}
      variants={combinedVariants}
      transition={{
        delay: 0.04 + delay,
        duration,
        ease: 'easeOut',
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
