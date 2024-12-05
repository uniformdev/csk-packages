import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseHeader, { HeaderProps as BaseHeaderProps } from '@/components/ui/Header';
import { withPlaygroundWrapper } from '@/hocs';

export type HeaderParameters = Omit<BaseHeaderProps, 'sticky'>;
enum HeaderSlots {
  HeaderLeftContent = 'headerLeftContent',
  HeaderCenterContent = 'headerCenterContent',
  HeaderRightContent = 'headerRightContent',
}

export enum HeaderVariants {
  Sticky = 'sticky',
}

export type HeaderProps = ComponentProps<HeaderParameters, HeaderSlots>;

const Header: FC<HeaderProps> = ({ backgroundColor, color, spacing, border, context, component, slots }) => (
  <BaseHeader
    sticky={component.variant === HeaderVariants.Sticky}
    leftSection={<UniformSlot context={context} slot={slots.headerLeftContent} data={component} />}
    rightSection={<UniformSlot context={context} slot={slots.headerRightContent} data={component} />}
    {...{ backgroundColor, color, spacing, border }}
  >
    <UniformSlot context={context} slot={slots.headerCenterContent} data={component} />
  </BaseHeader>
);

export default withPlaygroundWrapper(Header);
