//? if (localization) {
import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
//? } else {
//? write('import { NextRequest, NextResponse } from "next/server";\n');
//? }
import { DEVICE_TYPE_COOKIE_NAME, getDeviceType } from './utils/deviceType';

//? if (localization) {
const intlMiddleware = createIntlMiddleware(routing);
//? }
export default async function middleware(request: NextRequest) {
  //? if (localization) {
  const response = await intlMiddleware(request);
  //? } else {
  //? write('const response = NextResponse.next();\n');
  //? }
  if (!request.cookies.get(DEVICE_TYPE_COOKIE_NAME)) {
    response.cookies.set(DEVICE_TYPE_COOKIE_NAME, getDeviceType(request.headers.get('user-agent')));
  }

  return response;
}

export const config = {
  // Match all routes but exclude _next, static, and API routes
  matcher: ['/((?!_next|static|api|playground|favicon.ico|robots.txt|sitemap.xml).*)'],
};
