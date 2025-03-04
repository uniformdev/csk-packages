import path from 'node:path';
import * as ora from 'ora';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { registerCanvasComponents } from '@/utils/register';
import { checkbox } from '@inquirer/prompts';
import { getFolders } from './utils';
import { copyCanvasComponentsWithDependencies } from '../../utils/copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const targetPath = path.resolve(__dirname, 'content');

export const extractCanvasComponents = async (componentNames: string[]) => {
  try {
    const spinner = ora.default();
    const storedCanvasComponentsPath = path.resolve(targetPath, 'components', 'canvas');
    const storedCanvasComponents = getFolders(storedCanvasComponentsPath);

    if (
      componentNames.some(componentName => {
        const isCanvasComponent = storedCanvasComponents.includes(componentName);
        if (!isCanvasComponent) {
          console.error('Invalid component name:', componentName);
        }
        return !isCanvasComponent;
      })
    ) {
      return;
    }
    spinner.info('Welcome to Uniform Extractor');

    if (componentNames.length) {
      spinner.info('Canvas components to extract:');
      spinner.info(`${componentNames.join(', ')};`);
    } else {
      const selectedComponentIndexes = await checkbox({
        message: 'Select the canvas components to extract:',
        choices: storedCanvasComponents.map((name, index) => ({ value: index, name })),
        loop: false,
        instructions: true,
        required: true,
      });
      componentNames = storedCanvasComponents.filter((_, index) => selectedComponentIndexes.includes(index));
    }

    spinner.start('Extracting canvas components and their dependencies...');
    await copyCanvasComponentsWithDependencies(
      path.resolve(storedCanvasComponentsPath),
      path.resolve(process.cwd(), 'src'),
      componentNames,
      targetPath,
      spinner
    );
    spinner.succeed('Canvas components and their dependencies successfully extracted');

    spinner?.start('Starting registration...');
    const destination = path.resolve(process.cwd(), 'src');
    await registerCanvasComponents(destination, componentNames, spinner);

    return;
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('force closed')) {
        console.info('\n👋 See you next time! 🧡\n');
      } else {
        console.error('\n🙁 Something went wrong. Please try again.\n');
      }
    }
  }
};
