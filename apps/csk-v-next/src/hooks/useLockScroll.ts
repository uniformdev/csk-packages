import { useEffect } from 'react';

export const useLockScroll = (isOpen: boolean): void => {
  useEffect(() => {
    const html = document.querySelector('html');
    if (!html) return;
    html.style.overflow = !isOpen || html.style.overflow === 'hidden' ? 'auto' : 'hidden';
  }, [isOpen]);
};
