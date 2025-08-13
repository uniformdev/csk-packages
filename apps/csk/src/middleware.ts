//? if (localization) {
import createIntlMiddleware from 'next-intl/middleware';
//? } else {
//? write('import { NextRequest, NextResponse } from "next/server";\n');
//? }
import { uniformMiddleware } from '@uniformdev/canvas-next-rsc-v2/middleware';
import locales from '@/i18n/locales.json';
//? if (localization) {
import { routing } from './i18n/routing';
//? }
import { DEVICE_TYPE_COOKIE_NAME, getDeviceType } from './utils/deviceType';
import { formatPath } from './utils/formatPath';

//? if (localization) {
const intlMiddleware = createIntlMiddleware(routing);
//? }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function middleware(request: any) {
  //? if (localization) {
  const baseResponse = intlMiddleware(request);
  //? } else {
  //? write('const baseResponse = NextResponse.next();\n');
  //? }

  if (!baseResponse.ok) return baseResponse;

  const response = await uniformMiddleware({
    rewriteRequestPath: async ({ url }) => ({
      path: formatPath(url.pathname, locales.defaultLocale),
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
