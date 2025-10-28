'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTermlyModalDetector } from '@/hooks/use-termly-modal-detector';
import { useAppContext } from '../providers/app-ready-provider';

const SCRIPT_SRC_BASE = 'https://app.termly.io';

export default function TermlyCMP({
  autoBlock,
  masterConsentsOrigin,
  websiteUUID,
}: {
  autoBlock?: boolean;
  masterConsentsOrigin?: string;
  websiteUUID: string;
}) {
  const scriptSrc = useMemo(() => {
    const src = new URL(SCRIPT_SRC_BASE);
    src.pathname = `/resource-blocker/${websiteUUID}`;
    if (autoBlock) {
      src.searchParams.set('autoBlock', 'on');
    }
    if (masterConsentsOrigin) {
      src.searchParams.set('masterConsentsOrigin', masterConsentsOrigin);
    }
    return src.toString();
  }, [autoBlock, masterConsentsOrigin, websiteUUID]);

  const { isAppReady } = useAppContext();

  const isScriptAdded = useRef(false);

  useEffect(() => {
    if (isScriptAdded.current || !isAppReady) return;
    const script = document.createElement('script');
    script.src = scriptSrc;
    document.head.appendChild(script);
    isScriptAdded.current = true;
  }, [scriptSrc, isAppReady]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.Termly?.initialize();
  }, [pathname, searchParams]);

  // Disable Lenis smooth scroll when Termly modal is open
  useTermlyModalDetector();

  return null;
}
