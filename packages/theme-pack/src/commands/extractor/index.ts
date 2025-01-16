import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { select } from '@inquirer/prompts';
import { extractComponents } from './extractComponents';
import { extractFiles } from './extractFiles';
import { getFolders } from './utils';
import { capitalizeFirstLetter } from '../../utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const extractor = async () => {
  try {
    const targetPath = path.resolve(__dirname, 'content');
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
