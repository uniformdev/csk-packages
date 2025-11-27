import { execSync } from 'node:child_process';
import { select } from '@inquirer/prompts';
import { capitalizeFirstLetter, cleanupProductionFiles, getAvailableCSKVariants } from '../init/utils';

const pullUniformContent = (config?: string): void => {
  const cwd = process.cwd();
  execSync('design-extensions-tools pull', { stdio: 'inherit', cwd });
  execSync('design-extensions-tools apply', { stdio: 'inherit', cwd });
  const syncCommand = config ? `uniform sync pull --config ./uniform.config.${config}.ts` : 'uniform sync pull';
  execSync(syncCommand, { stdio: 'inherit', cwd });
};

export const pullUniformProject = async (isDev: boolean) => {
  try {
    const folders = getAvailableCSKVariants();

    if (folders.length === 0) {
      pullUniformContent();
      return;
    }

    const selectedFolder = await select({
      message: 'Select the CSK variant to pull:',
      choices: folders.map(folder => ({ name: capitalizeFirstLetter(folder), value: folder })),
      loop: false,
    });

    pullUniformContent(selectedFolder);

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
