import { execSync } from 'node:child_process';
import { select } from '@inquirer/prompts';
import { capitalizeFirstLetter, cleanupProductionFiles, getAvailableCSKVariants } from '../../utils';

type InitArgs = {
  dev?: boolean;
};

const pushUniformContent = (config?: string): void => {
  const cwd = process.cwd();
  execSync('design-extensions-tools push', { stdio: 'inherit', cwd });
  const syncCommand = config ? `uniform sync push --config ./uniform.config.${config}.ts` : 'uniform sync push';
  execSync(syncCommand, { stdio: 'inherit', cwd });
  execSync('uniform context manifest publish', { stdio: 'inherit', cwd });
};

export const initUniformProject = async (args: InitArgs) => {
  try {
    const { dev: isDev = false } = args || {};

    const folders = getAvailableCSKVariants();

    if (folders.length === 0) {
      pushUniformContent();
      return;
    }

    const selectedFolder = await select({
      message: 'Select the CSK variant to push:',
      choices: folders.map(folder => ({ name: capitalizeFirstLetter(folder), value: folder })),
      loop: false,
    });

    pushUniformContent(selectedFolder);

    if (!isDev) {
      cleanupProductionFiles(folders, selectedFolder);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('force closed')) {
        console.info('\n👋 See you next time! 🧡\n');
      } else {
        console.error('\n🙁 Something went wrong. Please try again.\n');
        console.error(error);
      }
    }
  }
};
