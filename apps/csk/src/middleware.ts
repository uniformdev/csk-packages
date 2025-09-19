import { NextRequest, NextResponse } from 'next/server';
import { uniformMiddleware } from '@uniformdev/canvas-next-rsc-v2/middleware';
import locales from '@/i18n/locales.json';
import { DEVICE_TYPE_COOKIE_NAME, getDeviceType } from './utils/deviceType';
import { formatPath } from './utils/formatPath';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/playground') {
    return uniformMiddleware()(request);
  }

  const baseResponse = NextResponse.next();

  if (!baseResponse.ok) return baseResponse;

  const response = await uniformMiddleware({
    rewriteRequestPath: async ({ url }) => ({
      path: formatPath(url.pathname, locales.defaultLocale),
    }),
  })(request).then(result =>
    result.headers.get('x-middleware-rewrite')
      ? result
      : uniformMiddleware({
          rewriteRequestPath: async ({ url }) => ({
            path: formatPath(url.pathname, undefined),
          }),
        })(request)
  );

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
