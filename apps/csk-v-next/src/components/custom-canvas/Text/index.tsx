import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { TextParameters } from './parameters';
import { Text } from './text';

export type TextProps = ComponentProps<TextParameters>;

export { type TextParameters } from './parameters';
export default withPlaygroundWrapper(Text);
