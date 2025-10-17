'use client';

import Image from 'next/image';
import burger from '../../../public/burger.svg';

const Burger = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <div
      className='flex items-center gap-2 cursor-pointer z-50'
      onClick={() => setIsOpen(!isOpen)}
    >
      <Image src={burger} unoptimized alt='Burger' width={40} height={32} />
    </div>
  );
};

export default Burger;
