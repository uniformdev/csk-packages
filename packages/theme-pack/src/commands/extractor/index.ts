import path from 'node:path';
import * as ora from 'ora';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { select } from '@inquirer/prompts';
import { extractComponents } from './extractComponents';
import { extractFiles } from './extractFiles';
import { getFolders } from './utils';
import { EXTRACT_CANVAS_COMPONENTS, PATH_TO_COMPONENTS_FOLDER } from '../../constants';
import { capitalizeFirstLetter } from '../../utils';
import { copyFolders } from '../../utils/copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const targetPath = path.resolve(__dirname, 'content');

export const extractCanvasComponents = async (componentNames: string[]) => {
  if (
    componentNames.some(componentName => {
      const isCanvasComponent = EXTRACT_CANVAS_COMPONENTS.includes(componentName);
      if (!isCanvasComponent) {
        console.error('Invalid component name:', componentName);
      }
      return !isCanvasComponent;
    })
  ) {
    return;
  }

  const spinner = ora.default();

  spinner.start('Extracting files...');
  spinner.info('Canvas components to extract:');
  await copyFolders(
    path.resolve(path.resolve(targetPath, 'components', 'canvas')),
    path.resolve(process.cwd(), PATH_TO_COMPONENTS_FOLDER, 'canvas'),
    componentNames
  );
  spinner.succeed('Files extracted');

  return;
};

export const extractor = async () => {
  try {
    console.info('Uniform Extractor');
    const modules = getFolders(targetPath);
    const selectedExtractTypeIndex = await select({
      message: 'Choose the appropriate module for extraction:',
      choices: modules.map((name, index) => ({ value: index, name: capitalizeFirstLetter(name) })),
      loop: false,
    });
    const selectedExtractModule = modules[selectedExtractTypeIndex] as string;
    const selectedExtractModulePath = path.resolve(targetPath, selectedExtractModule);

    if (selectedExtractModule === 'components') {
      await extractComponents(selectedExtractModulePath);
    } else {
      await extractFiles(selectedExtractModulePath);
    }

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
