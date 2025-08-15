import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { uniformMiddleware } from '@uniformdev/canvas-next-rsc-v2/middleware';
import { routing } from './i18n/routing';
import { DEVICE_TYPE_COOKIE_NAME, getDeviceType } from './utils/deviceType';
import { formatPath } from './utils/formatPath';

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const baseResponse = intlMiddleware(request);

  if (!baseResponse.ok) return baseResponse;

  const response = await uniformMiddleware({
    rewriteRequestPath: async ({ url }) => ({
      path: formatPath(url.pathname),
      keys: {
        search: url.toString(),
      },
    }),
  })(request).then(result =>
    result.headers.get('x-middleware-rewrite')
      ? result
      : uniformMiddleware({
          rewriteRequestPath: async ({ url }) => ({
            path: formatPath(url.pathname, undefined),
            keys: {
              search: url.toString(),
            },
          }),
        })(request)
  );

  baseResponse.headers.forEach((value, key) => {
    if (!response.headers.get(key)) {
      response.headers.set(key, value);
    }
  });

  baseResponse.cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie);
  });

  if (!request.cookies.get(DEVICE_TYPE_COOKIE_NAME)) {
    response.cookies.set(DEVICE_TYPE_COOKIE_NAME, getDeviceType(request.headers.get('user-agent')));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
