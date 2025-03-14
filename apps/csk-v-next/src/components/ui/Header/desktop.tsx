import { FC } from 'react';
import BaseContainer from '@/components/ui/Container';
import BaseGrid from '@/components/ui/Grid';
import BaseGridItem from '@/components/ui/GridItem';
import { HeaderProps } from './';

export const DesktopHeader: FC<HeaderProps> = ({
  leftSection,
  rightSection,
  backgroundColor,
  spacing,
  border,
  className,
}) => (
  <nav>
    <BaseContainer fluidContent {...{ backgroundColor, spacing, border, className }}>
      <BaseGrid className="items-center" columnsCount="12">
        <BaseGridItem columnSpan="span-4">
          {<div className="flex max-w-40 items-center justify-start">{leftSection}</div>}
        </BaseGridItem>
        <BaseGridItem columnSpan="span-8">
          <div className="flex items-center justify-end border-b border-black [&>:first-child]:mr-auto">
            {rightSection}
          </div>
        </BaseGridItem>
      </BaseGrid>
    </BaseContainer>
  </nav>
);
