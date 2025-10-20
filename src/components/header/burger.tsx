'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Burger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const clickDelay = 500;

  const handleClick = () => {
    if (currentTimeout === null) {
      setIsOpen(!isOpen);

      if (isOpen) {
        setIsClosing(true);
      }

      const timer = setTimeout(() => {
        setIsClosing(false);
        setCurrentTimeout(null);
      }, clickDelay);

      setCurrentTimeout(timer);
    }
  };

  useEffect(() => {
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [currentTimeout]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        'relative w-10 h-7.5 cursor-pointer z-50',
        isOpen && 'active',
        isClosing && 'closing'
      )}
    >
      <span className='absolute w-8.5 md:w-10 border-t-3 border-white origin-center block burger-menu-piece top-0'></span>
      <span className='absolute w-8.5 md:w-10 border-t-3 border-white origin-center block burger-menu-piece top-3'></span>
      <span className='absolute w-8.5 md:w-10 border-t-3 border-white origin-center block burger-menu-piece top-6'></span>
    </div>
  );
};

export default Burger;
