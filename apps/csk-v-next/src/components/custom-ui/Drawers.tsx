'use client';

import React, {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useLockScroll } from '@/hooks/useLockScroll';
import CloseIcon from './CloseIcon';
import Container from '../ui/Container';

const INITIAL_WIDTH = 1100;
const MIN_WIDTH = 800;
const MAX_WIDTH_OFFSET = 900;

type DrawersProps = PropsWithChildren<{
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pinned: boolean;
  setPinned: Dispatch<SetStateAction<boolean>>;
}>;

export const Drawers: FC<DrawersProps> = ({ children, open, pinned = true, setOpen, setPinned }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isPinDisabled, setPinDisabled] = useState(false);
  const [width, setWidth] = useState(INITIAL_WIDTH);
  const isResizing = useRef(false);

  useLockScroll(open && !pinned);

  useEffect(() => {
    const header = document.querySelector('header');
    setHeaderHeight(header?.getBoundingClientRect().height ?? 0);
  }, []);

  useEffect(() => {
    const updateWidthAndPinState = () => {
      setWidth(prevWidth => Math.max(MIN_WIDTH, Math.min(window.innerWidth - MAX_WIDTH_OFFSET, prevWidth)));
      setPinDisabled(window.innerWidth < MIN_WIDTH + MAX_WIDTH_OFFSET);
    };

    window.addEventListener('resize', updateWidthAndPinState);
    updateWidthAndPinState();

    return () => window.removeEventListener('resize', updateWidthAndPinState);
  }, []);

  useEffect(() => {
    if (isPinDisabled) {
      setPinned(false);
    }
  }, [isPinDisabled, setPinned]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    document.body.style.userSelect = 'none';
    if (isResizing.current) {
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(window.innerWidth - MAX_WIDTH_OFFSET, window.innerWidth - e.clientX)
      );
      setWidth(newWidth);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      style={pinned && open ? { width } : undefined}
      className={cn('w-0', { 'duration-500 ease-in-out': !isResizing.current })}
    >
      <div
        className={cn('fixed inset-y-0 right-0 flex w-full max-w-full translate-x-full opacity-0', {
          'translate-x-0 opacity-100': open,
          'duration-500 ease-in-out': !isResizing.current,
        })}
        style={pinned ? { width } : { marginTop: headerHeight }}
      >
        <div className={cn('relative w-full bg-white')}>
          <div
            className="absolute left-0 top-0 h-full w-0.5 cursor-ew-resize border-l bg-transparent hover:bg-gray-200"
            onMouseDown={handleMouseDown}
          />
          <Container className="relative">
            <div className="absolute top-4 flex w-full justify-end gap-x-4 px-4">
              <button
                type="button"
                onClick={() => setPinned(prev => !prev)}
                disabled={isPinDisabled}
                className={cn(
                  'rounded-md text-black hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-300',
                  { 'opacity-50': isPinDisabled }
                )}
              >
                <span className="sr-only">Pin panel</span>
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="black"
                    strokeWidth="2"
                    d="M19.1835 7.80516L16.2188 4.83755C14.1921 2.8089 13.1788 1.79457 12.0904 2.03468C11.0021 2.2748 10.5086 3.62155 9.5217 6.31506L8.85373 8.1381C8.59063 8.85617 8.45908 9.2152 8.22239 9.49292C8.11619 9.61754 7.99536 9.72887 7.86251 9.82451C7.56644 10.0377 7.19811 10.1392 6.46145 10.3423C4.80107 10.8 3.97088 11.0289 3.65804 11.5721C3.5228 11.8069 3.45242 12.0735 3.45413 12.3446C3.45809 12.9715 4.06698 13.581 5.28476 14.8L6.69935 16.2163L2.22345 20.6964C1.92552 20.9946 1.92552 21.4782 2.22345 21.7764C2.52138 22.0746 3.00443 22.0746 3.30236 21.7764L7.77841 17.2961L9.24441 18.7635C10.4699 19.9902 11.0827 20.6036 11.7134 20.6045C11.9792 20.6049 12.2404 20.5358 12.4713 20.4041C13.0192 20.0914 13.2493 19.2551 13.7095 17.5825C13.9119 16.8472 14.013 16.4795 14.2254 16.1835C14.3184 16.054 14.4262 15.9358 14.5468 15.8314C14.8221 15.593 15.1788 15.459 15.8922 15.191L17.7362 14.4981C20.4 13.4973 21.7319 12.9969 21.9667 11.9115C22.2014 10.826 21.1954 9.81905 19.1835 7.80516Z"
                    fill={pinned ? 'black' : undefined}
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setOpen(prev => !prev)}
                className="rounded-md text-black hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <span className="sr-only">Close panel</span>
                <CloseIcon />
              </button>
            </div>
          </Container>
          {children}
        </div>
      </div>
    </div>
  );
};
Drawers.displayName = 'Drawers';

export default Drawers;
