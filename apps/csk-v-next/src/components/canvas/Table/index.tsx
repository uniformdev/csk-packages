import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@/components/canvas/Container';
import Container from '@/components/ui/Container';
import { cn } from '@/utils';

export type TableParameters = ContainerParameters & {
  size?: string;
  textColor?: string;
};

enum TableSlots {
  TableHead = 'tableHead',
  TableBody = 'tableBody',
}

type TableProps = ComponentProps<TableParameters, TableSlots>;

const Table: FC<TableProps> = ({
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
      <table
        className={cn('text-left w-full [&_tr:not(:last-child)_td]:border-b [&_th]:border-b', {
          [`text-${textColor}`]: textColor,
          [`[&_td]:p-${size} [&_th]:p-${size}`]: size,
        })}
      >
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

export default Table;
