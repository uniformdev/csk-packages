import { FC, SVGProps } from 'react';
import { cn } from '@/utils/styling';

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = ({ className, ...restProps }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={cn('size-8', className)} {...restProps}>
    <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z" />
  </svg>
);
