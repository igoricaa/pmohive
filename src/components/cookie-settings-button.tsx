'use client';

export function CookieSettingsButton() {
  return (
    <button
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).displayPreferenceModal) {
          (window as any).displayPreferenceModal();
        }
      }}
      className='font-sans font-semibold text-sm sm:text-base tracking-[0.1px] text-light-grey whitespace-nowrap hover:opacity-70 transition-opacity'
      aria-label='Cookie Settings'
    >
      Cookie Settings
    </button>
  );
}
