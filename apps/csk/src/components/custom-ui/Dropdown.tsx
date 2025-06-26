'use client';

import { useState, useRef, ReactNode, FC } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { useOutsideClick } from '@/hooks/useOutsideClick';

type DropdownProps = {
  button: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  backgroundColor?: string;
};

const Dropdown: FC<DropdownProps> = ({ button, children, className, buttonClassName, backgroundColor }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <button type="button" onClick={() => setOpen(prev => !prev)} className={cn('w-max text-center', buttonClassName)}>
        {button}
      </button>

      {open && (
        <div
          className={cn('absolute left-1/2 z-10 max-h-60 w-max -translate-x-1/2 overflow-y-auto shadow', {
            [`bg-${backgroundColor}`]: backgroundColor,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
