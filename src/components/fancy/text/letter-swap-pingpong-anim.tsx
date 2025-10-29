'use client';

import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { AnimationOptions, motion, stagger, useAnimate } from 'motion/react';

interface TextProps {
  label: string;
  highlightedText?: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: 'first' | 'last' | 'center' | number;
  className?: string;
  onClick?: () => void;
  isParentHovered?: boolean;
}

const LetterSwapPingPong = ({
  label,
  highlightedText,
  reverse = true,
  transition = {
    type: 'spring',
    duration: 0.7,
  },
  staggerDuration = 0.03,
  staggerFrom = 'first',
  className,
  onClick,
  isParentHovered,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);

      animate(
        '.letter',
        { y: reverse ? '100%' : '-100%' },
        mergeTransition(transition)
      );

      animate(
        '.letter-secondary',
        {
          top: '0%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);

      animate(
        '.letter',
        {
          y: 0,
        },
        mergeTransition(transition)
      );

      animate(
        '.letter-secondary',
        {
          top: reverse ? '-100%' : '100%',
        },
        mergeTransition(transition)
      );
    },
    100,
    { leading: true, trailing: true }
  );

  // Trigger animation when parent hover state changes
  useEffect(() => {
    if (isParentHovered !== undefined) {
      if (isParentHovered) {
        hoverStart();
      } else {
        hoverEnd();
      }
    }
  }, [isParentHovered]);

  return (
    <motion.span
      className={`flex justify-center items-center relative overflow-hidden  ${className} `}
      onClick={onClick}
      ref={scope}
      style={{ willChange: isHovered ? 'transform' : 'auto' }}
      {...props}
    >
      <span className='sr-only'>
        {label}
        {highlightedText}
      </span>
      {label.split('').map((letter: string, i: number) => {
        return (
          <span
            className='whitespace-pre relative flex'
            key={i}
            aria-hidden={true}
          >
            <motion.span
              className={`relative letter`}
              style={{ top: 0, willChange: isHovered ? 'transform' : 'auto' }}
            >
              {letter}
            </motion.span>
            <motion.span
              className='absolute letter-secondary '
              style={{
                top: reverse ? '-100%' : '100%',
                willChange: isHovered ? 'transform' : 'auto',
              }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
      {highlightedText?.split('').map((letter: string, i: number) => {
        return (
          <span
            className='whitespace-pre relative flex text-primary'
            key={label.length + i}
            aria-hidden={true}
          >
            <motion.span
              className={`relative letter`}
              style={{ top: 0, willChange: isHovered ? 'transform' : 'auto' }}
            >
              {i === 0 && ' '}
              {letter}
            </motion.span>
            <motion.span
              className='absolute letter-secondary '
              style={{
                top: reverse ? '-100%' : '100%',
                willChange: isHovered ? 'transform' : 'auto',
              }}
            >
              {i === 0 && ' '}
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default LetterSwapPingPong;
