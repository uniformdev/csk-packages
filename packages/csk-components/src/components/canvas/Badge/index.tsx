import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { Badge } from './badge';

export type BadgeParameters = {
  text?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  dotColor?: string;
  pill?: boolean;
  size?: string;
};

export type BadgeProps = ComponentProps<BadgeParameters>;

export default withPlaygroundWrapper(Badge);
