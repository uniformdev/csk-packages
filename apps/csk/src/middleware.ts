import { uniformMiddleware } from '@uniformdev/canvas-next-rsc-v2/middleware';
import locales from '@/i18n/locales.json';
import { formatPath } from './utils/formatPath';
import projectMapClient from './utils/projectMapClient';

export default uniformMiddleware({
  // TODO: We need to find better way to handle this case when we have localized and not localized pages at the same time
  rewriteRequestPath: async ({ url }) => {
    // formatPath is used to add locale to the path if it's not present
    const pathWithLocale = formatPath(url.pathname, locales.defaultLocale);
    const pathWithoutLocale = formatPath(url.pathname, undefined);

    // We need to find not localized node in project map to get correct path for not localized pages
    const { nodes: [notLocalizedNode] = [] } = await projectMapClient.getNodes({
      path: pathWithoutLocale,
    });

    // If not localized node is found, we use it's path, otherwise we use the path with locale
    const path = notLocalizedNode?.type === 'composition' ? pathWithoutLocale : pathWithLocale;
    return { path };
  },
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
