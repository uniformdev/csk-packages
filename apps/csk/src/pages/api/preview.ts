import { NextApiRequest, NextApiResponse } from 'next';
import { createPreviewHandler } from '@uniformdev/canvas-next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const projectId = req.query.projectId;
  await createPreviewHandler({
    secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'hello-world',
    playgroundPath: `/playground${projectId ? `?projectId=${projectId}` : ''}`,
  })(req, res);
};

export default handler;
