'use client';

import { motion, useScroll } from 'motion/react';

const ScrollMeter = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      id='scroll-indicator'
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 10,
        originX: 0,
        backgroundColor: '#ff0088',
      }}
    />
  );
};

export default ScrollMeter;
