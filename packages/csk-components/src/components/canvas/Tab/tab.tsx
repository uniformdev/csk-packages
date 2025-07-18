import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { TabParameters, TabProps } from '.';

const Tab: FC<TabProps & TabParameters> = ({ slots }) => <UniformSlot slot={slots.tabContent} />;

export default withFlattenParameters(Tab);
