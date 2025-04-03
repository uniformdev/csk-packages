'use client';

import { FC, useState } from 'react';
import { Flex as BaseFlex } from '@uniformdev/csk-components/components/ui';
import BaseContainer from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { HeaderProps } from './';

const IconBurgerMenu: FC<{ isOpen: boolean; onClick: () => void; color?: string }> = ({ isOpen, onClick, color }) => (
  <button onClick={onClick} aria-label="Menu" className={cn('w-7 h-7 relative focus:outline-none')}>
    <div className="absolute left-1/2 top-1/2 block w-7 -translate-x-1/2 -translate-y-1/2">
      <span
        aria-hidden="true"
        className={cn('block absolute h-0.5 w-7 transform transition duration-500 ease-in-out', {
          'rotate-45': isOpen,
          ' -translate-y-2': !isOpen,
          [`bg-${color}`]: !!color,
        })}
      />
      <span
        aria-hidden="true"
        className={cn('block absolute h-0.5 w-7 transform transition duration-500 ease-in-out', {
          'opacity-0': isOpen,
          [`bg-${color}`]: !!color,
        })}
      />
      <span
        aria-hidden="true"
        className={cn('block absolute h-0.5 w-7 transform transition duration-500 ease-in-out', {
          '-rotate-45': isOpen,
          ' translate-y-2': !isOpen,
          [`bg-${color}`]: !!color,
        })}
      />
    </div>
  </button>
);

export const MobileHeader: FC<HeaderProps> = ({
  leftSection,
  rightSection,
  children,
  backgroundColor,
  spacing,
  border,
  className,
  color,
}) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const onMenuClick = () => {
    setIsBurgerMenuOpen(prev => !prev);
  };

  return (
    <nav>
      <BaseContainer
        id="mobile-header"
        fluidContent
        {...{
          backgroundColor,
          spacing,
          border,
          className,
        }}
      >
        <BaseFlex justifyContent="between">
          <div className="flex items-center gap-x-6">
            <IconBurgerMenu isOpen={isBurgerMenuOpen} onClick={onMenuClick} color={color} />
            <div className="flex items-center justify-start">{leftSection}</div>
          </div>

          <div className="flex items-center justify-end gap-x-4">{rightSection}</div>
        </BaseFlex>
      </BaseContainer>
      <BaseContainer
        fluidContent
        className={cn({
          'min-h-screen': isBurgerMenuOpen,
        })}
        {...{
          backgroundColor,
        }}
      >
        {isBurgerMenuOpen && (
          <div className="size-full py-8">
            <div className="flex flex-col items-center justify-center gap-y-8">{children}</div>
          </div>
        )}
      </BaseContainer>
    </nav>
  );
};
