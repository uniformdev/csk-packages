'use client';

import { FC, useState } from 'react';
import { Container, Flex, GridItem } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import ItemWrapper from '@/components/custom-ui/ItemWrapper';

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
      <Container
        id="mobile-header"
        fluidContent
        {...{
          backgroundColor,
          spacing,
          border,
          className,
        }}
      >
        <Flex className="items-center justify-between">
          <GridItem columnSpan="span-2">
            {
              <ItemWrapper>
                <div className="flex items-center justify-start">{leftSection}</div>
              </ItemWrapper>
            }
          </GridItem>
          <GridItem columnSpan="span-6">
            <IconBurgerMenu isOpen={isBurgerMenuOpen} onClick={onMenuClick} color={color} />
          </GridItem>
        </Flex>
      </Container>
      <Container
        fluidContent
        className={cn({
          'min-h-screen': isBurgerMenuOpen,
        })}
        {...{
          backgroundColor,
        }}
      >
        {isBurgerMenuOpen && (
          <div className="h-screen">
            <div className="mx-4 flex flex-col items-start justify-center backdrop-blur-2xl">{rightSection}</div>
          </div>
        )}
      </Container>
    </nav>
  );
};
