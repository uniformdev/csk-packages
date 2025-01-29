import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import {
  HeaderProps as CSKHeaderProps,
  HeaderVariants as CSKHeaderVariants,
} from '@uniformdev/csk-components/components/canvas';
import { withPlaygroundWrapper } from '@uniformdev/csk-components/hocs/withPlaygroundWrapper';
import BaseHeader from '@/components/custom-ui/Header';
import ItemWrapper from '@/components/custom-ui/ItemWrapper';

const Header: FC<CSKHeaderProps> = ({ backgroundColor, color, spacing, border, context, component, slots }) => (
  <BaseHeader
    sticky={component.variant === CSKHeaderVariants.Sticky}
    leftSection={<UniformSlot context={context} slot={slots.headerLeftContent} data={component} />}
    rightSection={
      <UniformSlot context={context} slot={slots.headerRightContent} data={component}>
        {({ child, key }) => <ItemWrapper key={key}>{child}</ItemWrapper>}
      </UniformSlot>
    }
    {...{ backgroundColor, color, spacing, border }}
  >
    <UniformSlot context={context} slot={slots.headerCenterContent} data={component} />
  </BaseHeader>
);

export default withPlaygroundWrapper(Header);
