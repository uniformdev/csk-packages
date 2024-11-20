import { FC } from 'react';
import { LinkParamValue } from '@uniformdev/canvas';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import BaseLink from '@/components/ui/Link';
import { withPlaygroundWrapper } from '@/hocs';
import { formatUniformLink } from '@/utils';

enum LinkSlots {
  LinkContent = 'linkContent',
}

export type LinkParameters = {
  displayName?: string;
  link?: LinkParamValue;
  openInNewTab?: boolean;
};

type LinkProps = ComponentProps<LinkParameters, LinkSlots>;

const Link: FC<LinkProps> = ({ component, context, slots, link, openInNewTab }) => (
  <BaseLink link={formatUniformLink(link)} openInNewTab={openInNewTab}>
    <UniformSlot data={component} context={context} slot={slots.linkContent} />
  </BaseLink>
);

export default withPlaygroundWrapper(Link);
