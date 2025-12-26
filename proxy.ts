import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {


  return createMiddleware(routing)(req);
}


export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};