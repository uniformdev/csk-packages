import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Container } from '@uniformdev/csk-components/components/ui';
import { TableProps } from '.';
import { getTableClasses } from './style-utils';

export const Table: FC<TableProps> = ({
  size,
  textColor,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
}) => (
  <Container className="flex flex-col gap-5" {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
    <div className="overflow-x-auto">
      <table className={getTableClasses({ size, textColor })}>
        <thead>
          <UniformSlot slot={slots.tableHead} context={context} data={component} />
        </thead>
        <tbody>
          <UniformSlot slot={slots.tableBody} context={context} data={component} />
        </tbody>
      </table>
    </div>
  </Container>
);
