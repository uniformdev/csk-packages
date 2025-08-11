import path from 'node:path';
import { EXTRACT_CANVAS_COMPONENTS, EXTRACT_TYPES, EXTRACT_UI_COMPONENTS, EXTRACT_UTILS } from '../constants';
import { copyFiles, copyFolders } from '../utils/copy';

async function copyContent() {
  console.info('📦 Starting to copy content...');

  // Copy components -> canvas
  await copyFolders(
    path.resolve('src', 'new-components', 'canvas'),
    path.resolve('dist', 'content', 'new-components', 'canvas'),
    EXTRACT_CANVAS_COMPONENTS
  );

  await copyFolders(
    path.resolve('src', 'new-components', 'ui'),
    path.resolve('dist', 'content', 'new-components', 'ui'),
    EXTRACT_UI_COMPONENTS
  );

  // Copy utils
  await copyFiles(path.resolve('src', 'utils'), path.resolve('dist', 'content', 'utils'), EXTRACT_UTILS);

  // Copy types
  await copyFiles(path.resolve('src', 'types'), path.resolve('dist', 'content', 'types'), EXTRACT_TYPES);

  console.info('🎉 Content copied successfully!');
}

copyContent().catch(err => {
  console.error('❌ Unexpected error:', err);
});
