import classNames, { ArgumentArray } from 'classnames';
import { twMerge } from 'tailwind-merge';
import { Asset } from '@uniformdev/assets';
import { flattenValues, LinkParamValue } from '@uniformdev/canvas';
import { ViewPort } from '@/types';

export const formatProjectMapLink = (projectMapLink?: LinkParamValue) => {
  if (!projectMapLink) return projectMapLink;

  // If the link is a projectMapNode, that means we can have dynamic input values
  if ('dynamicInputValues' in projectMapLink) {
    const { dynamicInputValues = {}, path } = projectMapLink;

    return Object.keys(dynamicInputValues).reduce(
      (acc, key) => acc?.replace(`:${key}`, `${dynamicInputValues[key]}`),
      path
    );
  }

  return projectMapLink.path;
};

type ResolvedAsset = {
  id?: string;
  url: string;
  file?: string;
  size?: number;
  title?: string;
  width?: number;
  height?: number;
  mediaType?: string;
  description?: string;
};
export const resolveAsset = (image?: Asset[]): ResolvedAsset[] =>
  (flattenValues(image as never) || []).filter(({ url }) => Boolean(url));

const TEMPLATE_REGEX = /\{[^}]+\}/g;
export const resolveViewPort = (
  viewPort: string | ViewPort<string> | undefined,
  template?: string | undefined
): string => {
  if (!viewPort) return '';

  if (typeof viewPort === 'string') return template ? template.replaceAll(TEMPLATE_REGEX, viewPort) : viewPort;

  const { desktop, tablet, mobile } = viewPort;

  const styles = [
    desktop ? `lg:${template ? template.replace(TEMPLATE_REGEX, desktop) : desktop}` : '',
    tablet ? `md:${template ? template.replace(TEMPLATE_REGEX, tablet) : tablet}` : '',
    mobile ? `${template ? template.replace(TEMPLATE_REGEX, mobile) : mobile}` : '',
  ];

  return styles.filter(Boolean).join(' ');
};

export const cn = (...inputs: ArgumentArray) => twMerge(classNames(inputs));
