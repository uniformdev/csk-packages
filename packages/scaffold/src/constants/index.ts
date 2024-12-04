import path from 'node:path';

export const DEFAULT_CUSTOM_CANVAS_FOLDER_PATH = '/src/components/custom-canvas';

export const PATH_TO_CUSTOM_CANVAS_FOLDER = path.join(
  ...(process.env.CUSTOM_CANVAS_FOLDER_PATH ?? DEFAULT_CUSTOM_CANVAS_FOLDER_PATH).split('/').filter(Boolean)
);
