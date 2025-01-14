import fs from 'fs-extra';
import path from 'node:path';

const componentsSrc = path.resolve('./src/components');
const componentsDest = path.resolve('./dist/content/components');

const utilsSrc = path.resolve('./src/utils');
const utilsDest = path.resolve('./dist/content/utils');

const utilsToCopy = [
  'assets.ts',
  'createComponentResolver.ts',
  'createEmptyPlaceholderResolver.ts',
  'routing.ts',
  'styling.ts',
];

const copyComponents = async () => {
  try {
    await fs.copy(componentsSrc, componentsDest, { overwrite: true });
    console.info('✅ Components folder and its content copied successfully!');
  } catch (err) {
    console.error('❌ Error copying components folder:', err);
  }
};

const copySelectedUtils = async () => {
  try {
    await fs.ensureDir(utilsDest);

    for (const file of utilsToCopy) {
      const srcFile = path.join(utilsSrc, file);
      const destFile = path.join(utilsDest, file);

      if (await fs.pathExists(srcFile)) {
        await fs.copy(srcFile, destFile, { overwrite: true });
        console.info(`✅ Copied: ${file}`);
      } else {
        console.warn(`⚠️ File not found: ${file}`);
      }
    }
  } catch (err) {
    console.error('❌ Error copying selected utils:', err);
  }
};

async function copyContent() {
  console.info('📦 Starting to copy content...');
  await copyComponents();
  await copySelectedUtils();
  console.info('🎉 Content copied successfully!');
}

copyContent().catch(err => {
  console.error('❌ Unexpected error:', err);
});
