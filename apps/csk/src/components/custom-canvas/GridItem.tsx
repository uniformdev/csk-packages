import { FC } from 'react';
import {
  GridItem as CSKGridItem,
  GridItemProps as CSKGridItemProps,
} from '@uniformdev/csk-components/components/canvas/serverClient';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';

type GridItemProps = CSKGridItemProps;

const GridItem: FC<GridItemProps> = props => <CSKGridItem className="h-full" {...props} />;

export default withFlattenParameters(GridItem);
