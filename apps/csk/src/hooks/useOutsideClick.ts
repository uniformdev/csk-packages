'use client';

import { useEffect, RefObject } from 'react';

export function useOutsideClick<T extends HTMLElement>(ref: RefObject<T | null>, handler: () => void): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler();
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
}
