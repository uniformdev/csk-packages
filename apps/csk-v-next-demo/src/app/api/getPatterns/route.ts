import { CanvasClient } from '@uniformdev/canvas';
import { getCanvasClient } from '@/utils/canvas/canvasClients';

const getMemoizedContentClient = (() => {
  let canvasClient: CanvasClient;
  return () => {
    if (!canvasClient) canvasClient = getCanvasClient();
    return canvasClient;
  };
})();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await getMemoizedContentClient().getCompositionList(body);
    return Response.json(response);
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
