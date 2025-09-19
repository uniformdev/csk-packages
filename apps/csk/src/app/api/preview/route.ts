import { NextRequest } from 'next/server';

import {
  createPreviewGETRouteHandler,
  createPreviewPOSTRouteHandler,
  createPreviewOPTIONSRouteHandler,
} from '@uniformdev/canvas-next-rsc-v2/handler';

const getHandler = createPreviewGETRouteHandler();
const postHandler = createPreviewPOSTRouteHandler();
const optionsHandler = createPreviewOPTIONSRouteHandler();

export async function GET(request: NextRequest, _context: { params: Promise<Record<string, unknown>> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return getHandler(request as any);
}

export async function POST(request: NextRequest, _context: { params: Promise<Record<string, unknown>> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return postHandler(request as any);
}

export async function OPTIONS(_request: NextRequest, _context: { params: Promise<Record<string, unknown>> }) {
  return optionsHandler();
}
