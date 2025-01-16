import path from 'node:path';
import * as ora from 'ora';
import { checkbox } from '@inquirer/prompts';
import { getFiles } from './utils';
import { PATH_TO_MODULES_FOLDER } from '../../constants';
import { copyFiles } from '../../utils/copy';

export const extractFiles = async (targetPath: string) => {
  const files = getFiles(targetPath);

  const selectedFilesIndexes = await checkbox({
    message: 'Select the necessary files to extract:',
    choices: files.map((name, index) => ({ value: index, name })),
    loop: false,
    instructions: true,
    required: true,
  });

  const spinner = ora.default();
  spinner.start('Extracting files...');
  await copyFiles(
    path.resolve(targetPath),
    path.resolve(process.cwd(), PATH_TO_MODULES_FOLDER, path.basename(targetPath)),
    files.filter((_, index) => selectedFilesIndexes.includes(index))
  );
  spinner.succeed('Files extracted');
  return;
};
