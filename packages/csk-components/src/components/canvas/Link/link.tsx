import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Link as BaseLink } from '@uniformdev/csk-components/components/ui';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { LinkProps } from '.';

export const Link: FC<LinkProps> = ({ component, context, slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot data={component} context={context} slot={slots.linkContent} />
  </BaseLink>
);
