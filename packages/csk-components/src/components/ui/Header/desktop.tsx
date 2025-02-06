import { FC } from 'react';
import { Container, Grid, GridItem } from '@uniformdev/csk-components/components/ui';
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
    <Container fluidContent {...{ backgroundColor, spacing, border, className }}>
      <Grid className="items-center" columnsCount="12">
        <GridItem columnSpan="span-3">{<div className="flex items-center justify-start">{leftSection}</div>}</GridItem>
        <GridItem columnSpan="span-6">
          <div className="flex items-center justify-center gap-x-8">{children}</div>
        </GridItem>
        <GridItem columnSpan="span-3">
          <div className="flex items-center justify-end gap-x-4">{rightSection}</div>
        </GridItem>
      </Grid>
    </Container>
  </nav>
);
