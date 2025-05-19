import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { LinkParamValue } from '@uniformdev/canvas';
import { UniformSlot, ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { Container as BaseContainer } from '@uniformdev/csk-components/components/ui';
import { formatUniformLink } from '@uniformdev/csk-components/utils/routing';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { capitalizeFirstLetter } from '@/utils/text';

const WrapCard: FC<PropsWithChildren & { href?: string; name: string }> = ({ href, name, children }) =>
  href?.length ? (
    <Link href={href} title={name} className="*:transition *:duration-150 *:ease-in-out *:hover:scale-[1.01]">
      {children}
    </Link>
  ) : (
    children
  );

enum TemplateCardSlots {
  TemplateItem = 'templateItem',
}

type TemplateCardProps = ComponentProps<
  ContainerParameters & { link?: LinkParamValue; anchor?: string; comingSoon: boolean },
  TemplateCardSlots
>;
const TemplateCard: FC<TemplateCardProps> = ({
  link,
  anchor,
  slots,
  component,
  context,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  displayName,
  comingSoon,
}) => {
  const href = formatUniformLink(link);

  return (
    <BaseContainer
      className={classNames('relative', {
        'cursor-not-allowed': comingSoon,
      })}
      {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}
    >
      <WrapCard
        href={href && anchor ? `${href}#${anchor}` : href}
        name={capitalizeFirstLetter(displayName || 'Component')}
      >
        <div className={cn('flex size-full flex-col items-center', { 'opacity-40': comingSoon })}>
          <UniformSlot data={component} context={context} slot={slots.templateItem} />
        </div>
      </WrapCard>
      {comingSoon && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-button-primary px-5 py-2.5 text-center text-sm font-bold uppercase text-text-light">
          Coming Soon
        </div>
      )}
    </BaseContainer>
  );
};

export default TemplateCard;
