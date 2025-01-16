import path from 'node:path';
import * as ora from 'ora';
import { checkbox, select } from '@inquirer/prompts';
import { getFolders } from './utils';
import { PATH_TO_COMPONENTS_FOLDER } from '../../constants';
import { capitalizeFirstLetter } from '../../utils';
import { copyFolders } from '../../utils/copy';

export const extractComponents = async (targetPath: string) => {
  const componentTypes = getFolders(targetPath);
  const selectedComponentsTypeIndex = await select({
    message: 'Select the necessary type of components to extract:',
    choices: componentTypes.map((name, index) => ({ value: index, name: capitalizeFirstLetter(name) })),
    loop: false,
  });
  const selectedComponentsType = componentTypes[selectedComponentsTypeIndex] as string;
  const selectedComponentsTypePath = path.resolve(targetPath, selectedComponentsType);

  const componentNames = getFolders(selectedComponentsTypePath);
  const selectedComponentIndexes = await checkbox({
    message: 'Select the necessary components to extract:',
    choices: componentNames.map((name, index) => ({ value: index, name })),
    loop: false,
    instructions: true,
    required: true,
  });
  const spinner = ora.default();

  spinner.start('Extracting files...');
  await copyFolders(
    path.resolve(selectedComponentsTypePath),
    path.resolve(process.cwd(), PATH_TO_COMPONENTS_FOLDER, selectedComponentsType),
    componentNames.filter((_, index) => selectedComponentIndexes.includes(index))
  );
  spinner.succeed('Files extracted');

  return;
};
