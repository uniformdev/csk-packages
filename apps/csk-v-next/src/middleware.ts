//? if (localization) {
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all routes but exclude _next, static, and API routes
  matcher: ['/((?!_next|static|api|playground|favicon.ico|robots.txt|sitemap.xml).*)'],
};
//? }
