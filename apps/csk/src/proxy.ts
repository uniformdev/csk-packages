import { NextRequest } from 'next/server';
import { handleUniformRoute } from '@uniformdev/canvas-next-rsc-v2/middleware';
import locales from '@/i18n/locales.json';
import { geolocation } from '@vercel/functions';
import { formatPath } from './utils/formatPath';

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

export default function proxy(request: NextRequest) {
  const { country } = geolocation(request);

  const isGDPRCountry = GDPR_COUNTRIES.includes(country || '');
  const defaultConsent = !isGDPRCountry;

  return handleUniformRoute({
    request,
    defaultConsent,
    rewriteRequestPath: async ({ url }) => ({ path: formatPath(url.pathname, locales.defaultLocale) }),
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
