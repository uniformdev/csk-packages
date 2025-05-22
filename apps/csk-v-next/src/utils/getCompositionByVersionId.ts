'use server';

import { getCanvasClient } from '@uniformdev/canvas-next-rsc';

const canvasClient = getCanvasClient({
  cache: {
    type: 'revalidate',
    interval: 0,
  },
});

const getCompositionByVersionId = async ({
  compositionId,
  versionId,
  state,
  locale,
}: {
  compositionId: string;
  versionId: string;
  state: number;
  locale: string;
}) => {
  const { composition } = await canvasClient.getCompositionById({
    compositionId,
    versionId,
    state,
    locale,
  });

  return composition;
};

export default getCompositionByVersionId;
