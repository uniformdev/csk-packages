import { SpaceType, ViewPort } from '@/types/cskTypes';

type HeightType = 'full' | 'screen' | 'svh' | 'lvh' | 'dvh' | 'min' | 'max' | 'fit';

export type ContainerParameters = {
  displayName?: string;
  anchor?: string;
  backgroundColor?: string;
  spacing?: SpaceType | ViewPort<SpaceType>;
  border?: string | ViewPort<string>;
  fluidContent?: boolean;
  /** @deprecated Use height prop instead */
  fullHeight?: boolean;
  /** @deprecated Use height prop instead */
  fitHeight?: boolean;
  height?: HeightType | ViewPort<HeightType>;
};
