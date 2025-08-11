import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-react';
import { HeaderEmptyPlaceholder, HeaderSlots, HeaderVariants } from '@/new-components/canvas/Header';
import BaseHeader from '@/new-components/ui/Header';
import { HeaderProps } from '.';

const Header: FC<HeaderProps> = ({ backgroundColor, color, spacing, border, component }) => (
  <BaseHeader
    sticky={component.variant === HeaderVariants.Sticky}
    leftSection={
      <UniformSlot
        name={HeaderSlots.HeaderLeftContent}
        emptyPlaceholder={<HeaderEmptyPlaceholder slotName={HeaderSlots.HeaderLeftContent} />}
      />
    }
    rightSection={
      <UniformSlot
        name={HeaderSlots.HeaderRightContent}
        emptyPlaceholder={<HeaderEmptyPlaceholder slotName={HeaderSlots.HeaderRightContent} />}
      />
    }
    {...{ backgroundColor, color, spacing, border }}
  >
    <UniformSlot
      name={HeaderSlots.HeaderCenterContent}
      emptyPlaceholder={<HeaderEmptyPlaceholder slotName={HeaderSlots.HeaderCenterContent} />}
    />
  </BaseHeader>
);

export default Header;
