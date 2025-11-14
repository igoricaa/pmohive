'use client';

import { useState } from 'react';
import { Link } from '@/components/motion-link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Send as SendIcon, Rocket } from 'lucide-react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import LetterSwapPingPong from './fancy/text/letter-swap-pingpong-anim';

const ICON_MAP = {
  ArrowRight,
  SendIcon,
  Rocket,
} as const;

type IconName = keyof typeof ICON_MAP;

type IconProp =
  | { type: 'lucide'; name: IconName }
  | { type: 'sanity'; source: SanityImageSource; alt: string }
  | { type: 'url'; src: string; alt: string };

type AnimatedButtonProps = {
  text: string;
  variant: 'default' | 'secondary';
  highlightedText?: string;
  icon?: IconProp;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
  iconClassName?: string;
  delayMs?: number;
} & (
  | {
      href: string;
      disabled?: never;
      type?: never;
    }
  | {
      href?: never;
      disabled?: boolean;
      type?: 'button' | 'submit' | 'reset';
    }
);

const AnimatedButton = ({
  text,
  href,
  onClick,
  variant,
  highlightedText,
  icon,
  className,
  iconClassName,
  disabled,
  type,
  delayMs,
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <>
      <LetterSwapPingPong
        label={text}
        highlightedText={highlightedText}
        isParentHovered={isHovered}
      />
      {icon && (
        <>
          {icon.type === 'lucide' &&
            (() => {
              const Icon = ICON_MAP[icon.name];
              return <Icon className={iconClassName} />;
            })()}

          {icon.type === 'sanity' && (
            <Image
              src={urlFor(icon.source).url()}
              alt={icon.alt}
              width={20}
              height={20}
              sizes='20px'
              className={iconClassName}
            />
          )}

          {icon.type === 'url' && (
            <Image
              src={icon.src}
              alt={icon.alt}
              width={20}
              height={20}
              sizes='20px'
              className={iconClassName}
            />
          )}
        </>
      )}
    </>
  );

  const commonProps = {
    className: cn(buttonVariants({ variant }), className),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <Link href={href} {...commonProps} onClick={onClick} delayMs={delayMs}>
        {content}
      </Link>
    );
  }

  return (
    <Button onClick={onClick} disabled={disabled} type={type} {...commonProps}>
      {content}
    </Button>
  );
};

export default AnimatedButton;
