import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { withPlaygroundWrapper } from '@/hocs/withPlaygroundWrapper';
import { FormattedPrice } from './formatted-price';
import { TextParameters } from './parameters';

export type FormattedPriceProps = ComponentProps<TextParameters>;

export { type TextParameters } from './parameters';
export default withPlaygroundWrapper(FormattedPrice);
