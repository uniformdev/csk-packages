import { ViewPort } from '@/types/cskTypes';

export const getHeightValue = ({
  height,
  fullHeight,
  fitHeight,
}: {
  height?: string | ViewPort<string> | undefined;
  fullHeight?: boolean | undefined;
  fitHeight?: boolean | undefined;
}) => {
  if (height) return height;
  // Cover deprecated cases
  if (fullHeight) return 'h-screen';
  if (fitHeight) return 'h-full';

  return undefined;
};
