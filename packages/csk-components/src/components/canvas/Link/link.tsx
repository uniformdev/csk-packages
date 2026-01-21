import { FC } from 'react';
import { UniformSlot } from '@uniformdev/next-app-router/component';
import BaseLink from '@/components/ui/Link';
import { formatUniformLink } from '@/utils/routing';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { LinkProps, LinkParameters } from '.';

export const Link: FC<LinkProps & LinkParameters> = ({ slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot slot={slots.linkContent} />
  </BaseLink>
);

export default withFlattenParameters(Link);
