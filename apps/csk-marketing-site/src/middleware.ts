import { NextRequest } from 'next/server';
import { uniformMiddleware } from '@uniformdev/next-app-router/middleware';
import locales from '@/i18n/locales.json';
import { formatPath } from './utils/formatPath';

export async function middleware(request: NextRequest) {
  const releaseId = request.nextUrl.searchParams.get('releaseId');
  return uniformMiddleware({
    rewriteRequestPath: async ({ url }) => ({ path: formatPath(url.pathname, locales.defaultLocale) }),
    ...(releaseId ? { release: { id: releaseId } } : undefined),
  })(request).then(result =>
    result.headers.get('x-middleware-rewrite')
      ? result
      : uniformMiddleware({
          rewriteRequestPath: async ({ url }) => ({ path: formatPath(url.pathname, undefined) }),
          ...(releaseId ? { release: { id: releaseId } } : undefined),
        })(request)
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|preview-images|robots.txt).*)'],
  runtime: 'experimental-edge',
};
