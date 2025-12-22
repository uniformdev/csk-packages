import { FC } from 'react';
import { LinkParamValue, CanvasClient, flattenValues } from '@uniformdev/canvas';
import { ProjectMapClient } from '@uniformdev/project-map';
import BaseButton, { ButtonVariant } from '@/components/ui/Button';
import BaseText from '@/components/ui/Text';
import { compositionCache } from '@/utils/getSlotComponents';
import { formatUniformLink, resolveRouteToPath } from '@/utils/routing';
import { cn } from '@/utils/styling';
import { withFlattenParameters } from '@/utils/withFlattenParameters';
import { BreadcrumbLink, BreadcrumbsParameters, BreadcrumbsProps } from '.';
import { getSeparator } from './helpers';

export const Breadcrumbs: FC<
  BreadcrumbsProps & Omit<BreadcrumbsParameters, 'links'> & { links?: { title?: string; link?: LinkParamValue }[] }
> = async ({ separator, links, size, color, font, transform, autoGenerate, context }) => {
  // Matched route is 'composition' — this means we're in the composition pattern,
  // so we don't have access to the project map at this point.
  const isInPattern = !context?.type || context?.type !== 'page';

  const getManualBreadcrumbs = async (): Promise<BreadcrumbLink[]> =>
    links?.filter(Boolean).reduce<BreadcrumbLink[]>((acc, { title, link }) => {
      if (!title) return acc;

      return [...acc, { title, link: formatUniformLink(link) }];
    }, []) || [];

  const getAutoBreadcrumbs = async (): Promise<BreadcrumbLink[]> => {
    if (isInPattern) return [];
    const client = new ProjectMapClient({
      projectId: process.env.UNIFORM_PROJECT_ID,
      apiKey: process.env.UNIFORM_API_KEY,
      apiHost: process.env.UNIFORM_CLI_BASE_URL! || 'https://uniform.app',
    });

    const { projectMapNodes } = compositionCache.getUniformComposition({ id: context?._id }) || {};
    if (!projectMapNodes || !projectMapNodes[0]) return [];

    const { nodes } = await client.getNodes({
      path: projectMapNodes[0].path,
      includeAncestors: true,
      depth: 0,
    });

    if (!nodes?.length) return [];

    return Promise.all(
      nodes.map(async node => {
        const isDynamic = node.pathSegment?.includes(':');

        const title =
          isDynamic && node.compositionId
            ? await new CanvasClient({
                projectId: process.env.UNIFORM_PROJECT_ID,
                apiKey: process.env.UNIFORM_API_KEY,
              })
                .getCompositionById({ compositionId: node.compositionId })
                .then(({ composition }) => {
                  if (!composition) return node.name;
                  const flattened = flattenValues(composition);
                  return (flattened?.pageTitle as string) || node.name;
                })
                .catch(() => node.name)
            : node.name;

        const link =
          node.type === 'placeholder' ? undefined : resolveRouteToPath(node.path, context.pageState.routePath);

        return { title, link };
      })
    );
  };

  const itemToDisplay = autoGenerate ? await getAutoBreadcrumbs() : await getManualBreadcrumbs();

  if (isInPattern && autoGenerate) {
    return (
      <ul className="flex items-center">
        <li className="flex items-center">
          <BaseText size={size} font={font} color={color} transform={transform}>
            Breadcrumbs cannot be auto-generated because the project map is not accessible in this context.
          </BaseText>
        </li>
      </ul>
    );
  }

  if (!itemToDisplay.length) {
    // ToDo: Add breadcrumbs placeholder
    return null;
  }

  return (
    <ul
      className={cn('flex items-center', {
        [`text-${size}`]: !!size,
        [`text-${color}`]: !!color,
      })}
    >
      {itemToDisplay.map(({ title, link }, index) => (
        <li className="flex items-center" key={`${title}-${index}`}>
          {!!index && <div className="mx-2 size-[1em]">{getSeparator(separator)}</div>}
          {!link ? (
            <BaseText size={size} font={font} color={color} transform={transform}>
              {title}
            </BaseText>
          ) : (
            <BaseButton
              variant={ButtonVariant.Link}
              textColor={color}
              className={cn({
                [`font-${font}`]: !!font,
                [`text-${size}`]: !!size,
                [transform || '']: !!transform,
              })}
              href={link}
            >
              {title}
            </BaseButton>
          )}
        </li>
      ))}
    </ul>
  );
};

export default withFlattenParameters(Breadcrumbs);
