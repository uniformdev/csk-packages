//? if (localization) {
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
//? } else {
//? write('import { NextRequest, NextResponse } from "next/server";\n');
//? }
import { uniformMiddleware } from '@uniformdev/canvas-next-rsc-v2/middleware';
import locales from '@/i18n/locales.json';
//? if (cookieConsent) {
import { geolocation } from '@vercel/functions';
//? }
//? if (localization) {
import { routing } from './i18n/routing';
//? }
import { formatPath } from './utils/formatPath';

//? if (localization) {
const intlMiddleware = createIntlMiddleware(routing);
//? }

//? if (cookieConsent) {
const GDPR_COUNTRIES = [
  'AL',
  'AD',
  'AM',
  'AT',
  'AZ',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'GE',
  'DE',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'KZ',
  'LV',
  'LI',
  'LT',
  'LU',
  'MT',
  'MD',
  'MC',
  'ME',
  'MK',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'SM',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'TR',
  'UA',
  'GB',
  'VA',
  'CN',
  'BR',
  'ZA',
  'AE',
];
//? }

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/playground') {
    return uniformMiddleware()(request);
  }

  //? if (cookieConsent) {
  const { country } = geolocation(request);
  const isGDPRCountry = GDPR_COUNTRIES.includes(country || '');
  const defaultConsent = !isGDPRCountry;
  //? }

  //? if (localization) {
  const baseResponse = intlMiddleware(request);
  //? } else {
  //? write('const baseResponse = NextResponse.next();\n');
  //? }

  if (!baseResponse.ok) return baseResponse;

  const response = await uniformMiddleware({
    //? if (cookieConsent) {
    defaultConsent,
    //? }
    rewriteRequestPath: async ({ url }) => ({ path: formatPath(url.pathname, locales.defaultLocale) }),
  })(request).then(result =>
    result.headers.get('x-middleware-rewrite')
      ? result
      : uniformMiddleware({
          //? if (cookieConsent) {
          defaultConsent,
          //? }
          rewriteRequestPath: async ({ url }) => ({ path: formatPath(url.pathname, undefined) }),
        })(request)
  );

  baseResponse.cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie);
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
  runtime: 'experimental-edge',
};
