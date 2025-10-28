'use client';

import { cn } from '@/lib/utils';

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => {
        if (
          typeof window !== 'undefined' &&
          (window as any).displayPreferenceModal
        ) {
          (window as any).displayPreferenceModal();
        }
      }}
      className={cn(
        'font-sans font-semibold text-sm sm:text-base tracking-[0.1px] text-light-grey whitespace-nowrap hover:opacity-70 transition-opacity',
        className
      )}
      aria-label='Cookie Settings'
    >
      Cookie Settings
    </button>
  );
}
