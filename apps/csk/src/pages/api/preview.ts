import { createPreviewHandler } from '@uniformdev/canvas-next';
import { PREVIEW_PATH } from '@/constants';

export default createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'hello-world',
  playgroundPath: `${PREVIEW_PATH}/playground`,
  resolveFullPath: ({ slug }) => {
    return `${PREVIEW_PATH}` + (slug || '');
  },
});
