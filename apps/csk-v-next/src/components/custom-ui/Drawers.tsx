'use client';

import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useState } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useLockScroll } from '@/hooks/useLockScroll';
import CloseIcon from './CloseIcon';

export const Drawers: FC<PropsWithChildren<{ open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }>> = ({
  children,
  open,
  setOpen,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useLockScroll(open);

  useEffect(() => {
    const header = document.querySelector('header');
    setHeaderHeight(header?.getBoundingClientRect().height ?? 0);
  }, []);

  return (
    <div className="fixed inset-y-0 right-0 flex max-w-full" style={{ marginTop: headerHeight }}>
      <div
        className={cn(
          'relative w-screen bg-white transition-transform duration-500 ease-in-out translate-x-full opacity-0',
          {
            'translate-x-0 opacity-100': open,
          }
        )}
      >
        <div className="absolute right-4 top-4 flex">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md text-black hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <span className="sr-only">Close panel</span>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
Drawers.displayName = 'Drawers';
