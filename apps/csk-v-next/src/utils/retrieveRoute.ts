import { retrieveRoute as uniformRetrieveRoute } from '@uniformdev/canvas-next-rsc';
import i18n from '@/i18n/locales.json';

const isLocaleInPath = (path: string | string[]): boolean =>
  (Array.isArray(path) ? path : [path]).some(segment => i18n.locales.includes(segment));

const formatPath = (path?: string | string[], locale?: string | null): string | string[] | undefined => {
  // If no locale is provided, just return the original path.
  if (!locale) return path;

  // If path is not defined, use the locale directly.
  if (!path) return locale;

  // If path already includes a recognized locale, return it as is.
  if (isLocaleInPath(path)) return path;

  // If path doesn't include a locale:
  // - For arrays, prepend the locale.
  // - For strings, concatenate the locale with '/'.
  return Array.isArray(path) ? [locale, ...path] : `${locale}/${path}`;
};

const retrieveRoute = async (props: Parameters<typeof uniformRetrieveRoute>[0], locale?: string | null) => {
  const { params = {} } = props;
  const updatedParams = {
    ...params,
    path: formatPath(params.path, locale),
  };

  return uniformRetrieveRoute({
    ...props,
    params: updatedParams,
  });
};

export default retrieveRoute;
