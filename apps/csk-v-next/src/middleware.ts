import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { UAParser } from 'ua-parser-js';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getDevice();
  const deviceType = deviceInfo && deviceInfo.type ? deviceInfo.type.toLowerCase() : 'desktop';

  const response = await intlMiddleware(request);
  response.cookies.set('deviceType', deviceType.substring(0, 1));

  return response;
}

export const config = {
  // Match all routes but exclude _next, static, and API routes
  matcher: ['/((?!_next|static|api|playground|favicon.ico|robots.txt|sitemap.xml).*)'],
};
