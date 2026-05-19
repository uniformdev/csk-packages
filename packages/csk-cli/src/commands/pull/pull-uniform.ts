import { execSync } from 'node:child_process';
import { cleanupProductionFiles, getAvailableCSKVariants, resolveCSKVariant } from '../../utils';

type PullUniformArgs = {
  dev?: boolean;
  variant?: string;
};

const pullUniformContent = (config?: string): void => {
  const cwd = process.cwd();
  execSync('design-extensions-tools pull', { stdio: 'inherit', cwd });
  execSync('design-extensions-tools apply', { stdio: 'inherit', cwd });
  const syncCommand = config ? `uniform sync pull --config ./uniform.config.${config}.ts` : 'uniform sync pull';
  execSync(syncCommand, { stdio: 'inherit', cwd });
};

export const pullUniformProject = async ({ dev: isDev = false, variant }: PullUniformArgs = {}) => {
  try {
    const folders = getAvailableCSKVariants();

    if (folders.length === 0) {
      pullUniformContent();
      return;
    }

    const selectedFolder = await resolveCSKVariant({ variant, folders, action: 'pull' });

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
