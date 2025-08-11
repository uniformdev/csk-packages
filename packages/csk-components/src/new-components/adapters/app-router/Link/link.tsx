import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc-v2/component';
import { LinkParameters } from '@/new-components/canvas/Link';
import BaseLink from '@/new-components/ui/Link';
import { formatUniformLink } from '@/utils/routing';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { LinkProps } from '.';

export const Link: FC<LinkProps & LinkParameters> = ({ slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot slot={slots.linkContent} />
  </BaseLink>
);

export default withFlattenParameters(Link);
