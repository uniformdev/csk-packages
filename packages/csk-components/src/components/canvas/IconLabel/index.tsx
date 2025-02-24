import { Asset } from '@uniformdev/assets';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { TextParameters } from '@/components/canvas/Text/parameters';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { IconLabel } from './icon-label';

export type IconLabelParameters = TextParameters & {
  icon?: Asset[];
};

export type IconLabelProps = ComponentProps<IconLabelParameters>;

export default withPlaygroundWrapper(IconLabel);
