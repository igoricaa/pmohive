'use client';

import { motion, useScroll } from 'motion/react';

const ScrollMeter = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      id='scroll-indicator'
      className='fixed top-0 left-0 right-0 h-2 bg-primary z-25'
      style={{
        scaleX: scrollYProgress,
        originX: 0,
        willChange: 'transform',
      }}
    />
  );
};

export default ScrollMeter;
