import { FC } from 'react';
import { resolveColor } from '@/utils/colorPalette';
import { cn } from '@/utils/styling';
import { PageProps } from '.';

export const Page: FC<PageProps> = ({ className, header, footer, children, backgroundColor, style, ...restProps }) => {
  const bg = resolveColor(backgroundColor, 'background');
  return (
    <div
      className={cn('flex min-h-screen flex-col', bg.className, className)}
      style={{ ...bg.style, ...style }}
      {...restProps}
    >
      {header}

      <div className="flex flex-1 flex-col">{children}</div>

      {footer}
    </div>
  );
};
