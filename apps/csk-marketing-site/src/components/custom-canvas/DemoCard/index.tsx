import dynamic from 'next/dynamic';
import { AssetParamValueItem } from '@uniformdev/assets';
import { LinkParamValue } from '@uniformdev/canvas';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { withSlotsDataValue } from '@uniformdev/csk-components/utils/withSlotsDataValue';

export type DemoCardParameters = {
  title?: string;
  patternId?: string;
  link?: LinkParamValue;
  previewImage?: AssetParamValueItem[];
  anchor?: string;
  enableComponentPreview?: boolean;
} & ContainerParameters;

export enum DemoCardSlots {
  DemoItem = 'demoItem',
}

export type DemoCardProps = ComponentProps<DemoCardParameters, DemoCardSlots>;
export default dynamic(() =>
  import('./demoCard').then(mod => withSlotsDataValue(withFlattenParameters(mod.DemoCard), [DemoCardSlots.DemoItem]))
);
