import { FC, PropsWithChildren } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';

type TooltipProps = {
  className?: string;
  wrapperClassName?: string;
  text: string;
};

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({ className, text, children, wrapperClassName }) => (
  <div className={cn('group relative', wrapperClassName)}>
    {children}
    <div
      className={cn(
        'absolute top-full right-1/2 mb-2 hidden w-max translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-sm text-white shadow-lg group-hover:flex',
        className
      )}
    >
      {text}
    </div>
  </div>
);

export default Tooltip;
