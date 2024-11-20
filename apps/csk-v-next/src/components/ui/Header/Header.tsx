'use client';
import { FC } from 'react';
import { cn } from '@/utils';
import { HeaderProps } from './';
import { DesktopHeader } from './desktop';
import { MobileHeader } from './mobile';

export const Header: FC<HeaderProps> = ({ sticky, ...headerProps }) => (
  <header className={cn({ 'sticky top-0 shadow z-50': sticky })}>
    <div className="hidden md:block">
      <DesktopHeader {...headerProps} />
    </div>

    <div className="block md:hidden">
      <MobileHeader {...headerProps} />
    </div>
  </header>
);
