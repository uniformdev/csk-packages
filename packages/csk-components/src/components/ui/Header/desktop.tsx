import { FC } from 'react';
import BaseContainer from '@/components/ui/Container';
import BaseGrid from '@/components/ui/Grid';
import BaseGridItem from '@/components/ui/GridItem';
import { HeaderProps } from './';

export const DesktopHeader: FC<HeaderProps> = ({
  leftSection,
  rightSection,
  children,
  backgroundColor,
  spacing,
  border,
  className,
}) => (
  <nav>
    <BaseContainer fluidContent {...{ backgroundColor, spacing, border, className }}>
      <BaseGrid className="items-center" columnsCount="12">
        <BaseGridItem columnSpan="span-3">
          {<div className="flex items-center justify-start">{leftSection}</div>}
        </BaseGridItem>
        <BaseGridItem columnSpan="span-6">
          <div className="flex items-center justify-center gap-x-8">{children}</div>
        </BaseGridItem>
        <BaseGridItem columnSpan="span-3">
          <div className="flex items-center justify-end gap-x-4">{rightSection}</div>
        </BaseGridItem>
      </BaseGrid>
    </BaseContainer>
  </nav>
);
