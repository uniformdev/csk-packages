import { FC } from 'react';
import { Container, Grid, GridItem } from '@uniformdev/csk-components/components/ui';
import ItemWrapper from '@/components/custom-ui/ItemWrapper';

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
      <Grid className="items-center" columnsCount="12" gapX="6">
        <GridItem columnSpan="span-2">
          {
            <ItemWrapper>
              <div className="flex items-center justify-start">{leftSection}</div>
            </ItemWrapper>
          }
        </GridItem>
        <GridItem columnSpan="span-7">
          <div className="hidden items-center justify-start gap-x-8 lg:flex">{children}</div>
        </GridItem>
        <GridItem columnSpan="span-3">
          <div className="flex items-center justify-end">{rightSection}</div>
        </GridItem>
      </Grid>
    </Container>
  </nav>
);
