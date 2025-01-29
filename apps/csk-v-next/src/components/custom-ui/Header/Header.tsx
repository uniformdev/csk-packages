import { FC } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { HeaderProps } from './';
import { DesktopHeader } from './desktop';
import { MobileHeader } from './mobile';

export const Header: FC<HeaderProps> = ({ sticky, ...headerProps }) => (
  <header className={cn({ 'sticky top-0 z-50 py-[7px] border-y border-black/5': sticky })}>
    <div className="hidden border-y border-black/5 md:block">
      <DesktopHeader {...headerProps} />
    </div>

    <div className="block border-y border-black/5 md:hidden">
      <MobileHeader {...headerProps} />
    </div>
  </header>
);
