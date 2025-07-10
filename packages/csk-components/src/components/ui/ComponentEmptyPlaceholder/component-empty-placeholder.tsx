import { FC } from 'react';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { ComponentEmptyPlaceholderParameters, ComponentEmptyPlaceholderProps } from '.';

export const ComponentEmptyPlaceholder: FC<
  ComponentEmptyPlaceholderProps & ComponentEmptyPlaceholderParameters
> = () => (
  <div className="p-4 bg-white text-black rounded-md border border-black">
    <p className="font-medium">Component not found</p>
  </div>
);

export default withFlattenParameters(ComponentEmptyPlaceholder);
