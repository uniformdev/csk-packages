import { FC } from 'react';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { Link as BaseLink } from '@uniformdev/theme-pack/components/ui';
import { formatUniformLink } from '@uniformdev/theme-pack/utils/routing';
import { LinkProps } from '.';

export const Link: FC<LinkProps> = ({ component, context, slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot data={component} context={context} slot={slots.linkContent} />
  </BaseLink>
);
