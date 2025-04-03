import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseHeader from '@/components/ui/Header';
import { HeaderProps, HeaderVariants } from '.';

export const Header: FC<HeaderProps> = ({ backgroundColor, color, spacing, border, context, component, slots }) => (
  <BaseHeader
    sticky={component.variant === HeaderVariants.Sticky}
    leftSection={<UniformSlot context={context} slot={slots.headerLeftContent} data={component} />}
    rightSection={<UniformSlot context={context} slot={slots.headerRightContent} data={component} />}
    {...{ backgroundColor, color, spacing, border }}
  >
    <UniformSlot context={context} slot={slots.headerCenterContent} data={component} />
  </BaseHeader>
);
