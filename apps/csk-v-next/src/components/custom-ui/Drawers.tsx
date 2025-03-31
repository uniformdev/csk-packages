'use client';

import { Dispatch, FC, PropsWithChildren, SetStateAction, useEffect, useRef, useState } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useLockScroll } from '@/hooks/useLockScroll';
import CloseIcon from './CloseIcon';

const INITIAL_WIDTH = 1050;
const MIN_WIDTH = 300;
const MAX_WIDTH_OFFSET = 50;

export const Drawers: FC<PropsWithChildren<{ open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }>> = ({
  children,
  open,
  setOpen,
}) => {
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const panelRef = useRef(null);
  const isResizing = useRef(false);

  useLockScroll(open);

  useEffect(() => {
    const handleResize = () => {
      setWidth(prevWidth => Math.max(MIN_WIDTH, Math.min(window.innerWidth - MAX_WIDTH_OFFSET, prevWidth)));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing.current) {
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(window.innerWidth - MAX_WIDTH_OFFSET, window.innerWidth - e.clientX)
      );
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={cn('fixed inset-0 z-10 hidden', { block: open })}>
      <div className="fixed inset-0 bg-gray-500/50 transition-opacity" onClick={() => setOpen(false)} />

      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div
          ref={panelRef}
          style={{ width: `${width}px` }}
          className={cn('relative bg-white shadow-xl transition-transform duration-500 ease-in-out translate-x-full', {
            'translate-x-0': open,
          })}
        >
          <div
            className="absolute left-0 top-0 h-full w-0.5 cursor-ew-resize bg-transparent hover:bg-gray-200"
            onMouseDown={handleMouseDown}
          />

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
    </div>
  );
};
Drawers.displayName = 'Drawers';
