import { cn, resolveViewPort } from '@/utils/styling';
import { CountdownParameters, CountdownVariants } from '.';

type UnitClass = {
  variant?: CountdownVariants;
  backgroundColor?: CountdownParameters['backgroundColor'];
  border?: CountdownParameters['border'];
  size?: CountdownParameters['size'];
};
export const getUnitClass = ({ variant, backgroundColor, border, size }: UnitClass) =>
  cn('flex w-fit p-2 sm:p-4 text-center gap-2 items-center leading-none', {
    'flex-col': variant === CountdownVariants.LabelsUnder,
    'flex-col sm:flex-row': variant !== CountdownVariants.LabelsUnder,
    [`bg-${backgroundColor}`]: !!backgroundColor,
    [resolveViewPort(border, '{value}')]: border,
    ['items-center']: border,
    [resolveViewPort(size, 'text-{value}')]: !!size,
    [resolveViewPort(border, '{value}')]: !!border,
  });

type TextClass = {
  textColor?: CountdownParameters['textColor'];
};
export const getTextClass = ({ textColor }: TextClass) =>
  cn('flex gap-2 sm:gap-5 flex-wrap font-bold flex-col sm:flex-row justify-center items-center', {
    [`text-${textColor}`]: textColor,
  });
