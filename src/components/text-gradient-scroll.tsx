'use client';

import {
  type MotionValue,
  type UseScrollOptions,
  motion,
  useScroll,
  useTransform,
} from 'motion/react';
import type React from 'react';
import { createContext, useContext, useRef } from 'react';
import { cn } from '@/lib/utils';

type TextOpacityEnum = 'none' | 'soft' | 'medium';
type ViewTypeEnum = 'word' | 'letter';

type TextGradientScrollType = {
  text: string;
  type?: ViewTypeEnum;
  className?: string;
  textOpacity?: TextOpacityEnum;
  highlightFirstWord?: boolean;
  offset?: UseScrollOptions['offset'];
};

type LetterType = {
  children: React.ReactNode | string;
  progress: MotionValue<number>;
  range: number[];
  isFirst?: boolean;
  highlightFirstWord?: boolean;
};

type WordType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
  isFirst?: boolean;
  highlightFirstWord?: boolean;
};

type CharType = {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: number[];
  isFirst?: boolean;
  highlightFirstWord?: boolean;
};

type TextGradientScrollContextType = {
  textOpacity?: TextOpacityEnum;
  type?: ViewTypeEnum;
};

const TextGradientScrollContext = createContext<TextGradientScrollContextType>(
  {}
);

function useGradientScroll() {
  const context = useContext(TextGradientScrollContext);
  return context;
}

function TextGradientScroll({
  text,
  className,
  type = 'letter',
  textOpacity = 'soft',
  highlightFirstWord = false,
  offset = ['start center', 'end center'],
}: TextGradientScrollType) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const words = text.split(' ');

  return (
    <TextGradientScrollContext.Provider value={{ textOpacity, type }}>
      <p
        ref={ref}
        className={cn(
          'relative flex m-0 flex-wrap font-semibold justify-center font-sans text-2xl sm:text-3xl xl:text-5xl 2xl:text-6xl leading-none xl:leading-[110%]',
          className
        )}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return type === 'word' ? (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              isFirst={i === 0}
              highlightFirstWord={highlightFirstWord}
            >
              {word}
            </Word>
          ) : (
            <Letter
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              isFirst={i === 0}
              highlightFirstWord={highlightFirstWord}
            >
              {word}
            </Letter>
          );
        })}
      </p>
    </TextGradientScrollContext.Provider>
  );
}

export { TextGradientScroll };

const Word = ({
  children,
  progress,
  range,
  isFirst,
  highlightFirstWord = false,
}: WordType) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className='relative me-2 mt-2'>
      <span style={{ position: 'absolute', opacity: 0.1 }}>{children}</span>
      <motion.span
        className={cn(isFirst && highlightFirstWord && 'text-primary')}
        style={{ transition: 'all .5s', opacity: opacity, willChange: 'opacity' }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const Letter = ({
  children,
  progress,
  range,
  isFirst,
  highlightFirstWord = false,
}: LetterType) => {
  if (typeof children === 'string') {
    const amount = range[1] - range[0];
    const step = amount / children.length;

    return (
      <span className='relative me-2 mt-2'>
        {children.split('').map((char: string, i: number) => {
          const start = range[0] + i * step;
          const end = range[0] + (i + 1) * step;
          return (
            <Char
              key={`c_${i}`}
              progress={progress}
              range={[start, end]}
              isFirst={isFirst}
              highlightFirstWord={highlightFirstWord}
            >
              {char}
            </Char>
          );
        })}
      </span>
    );
  }
};

const Char = ({
  children,
  progress,
  range,
  isFirst,
  highlightFirstWord = false,
}: CharType) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const { textOpacity } = useGradientScroll();

  return (
    <span>
      <span
        className={cn('absolute font-sans', {
          'opacity-0': textOpacity == 'none',
          'opacity-10': textOpacity == 'soft',
          'opacity-30': textOpacity == 'medium',
        })}
      >
        {children}
      </span>
      <motion.span
        className={cn(
          isFirst && highlightFirstWord && 'text-primary',
          'font-sans'
        )}
        style={{
          transition: 'all .5s',
          opacity: opacity,
          willChange: 'opacity',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};
