import { cn } from '@uniformdev/csk-components/utils/styling';
import { BadgeProps } from '.';

type BadgeClass = {
  pill: BadgeProps['pill'];
  size: BadgeProps['size'];
  dotColor: BadgeProps['dotColor'];
  borderColor: BadgeProps['borderColor'];
  backgroundColor: BadgeProps['backgroundColor'];
};
export const getBadgeClass = ({ pill, size, dotColor, borderColor, backgroundColor }: BadgeClass) =>
  cn('inline-flex items-center w-fit', {
    'rounded-full': pill,
    'rounded-md': !pill,
    'gap-x-1.5': !!dotColor,
    [`ring-1 ring-inset ring-${borderColor}`]: !!borderColor,
    [`bg-${backgroundColor}`]: !!backgroundColor,
    [`p-${size}`]: size,
  });
