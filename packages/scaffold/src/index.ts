import { program } from 'commander';
import * as ora from 'ora';
import { select } from '@inquirer/prompts';
import { indexComponentFile, reactComponentFile, registerComponentFile } from './steps';
import { getCanvasClient, getPathToCanvasFolder } from './utils';

program
  .command('add')
  .description('Generate a new component')
  .action(async () => {
    const spinner = ora.default();
    console.info('Uniform RSC Scaffolder');
    const canvasClient = await getCanvasClient();

    spinner?.start('Loading Component Definitions');
    const { componentDefinitions: definitions } = await canvasClient.getComponentDefinitions();
    spinner?.succeed('Component Definitions Loaded');

    const selectedIndex = await select({
      message: 'Select the necessary component to generate files:',
      choices: definitions
        .sort((itemA, itemB) => new Date(itemB.created || '').getTime() - new Date(itemA.created || '').getTime())
        .map(({ name }, index) => ({ value: index, name })),
      loop: false,
    });

    const selectedComponent = definitions[selectedIndex];

    if (!selectedComponent) {
      console.info('No component selected');
      return;
    }
    const pathToCanvasFolder = await getPathToCanvasFolder();

    const pathGenerateProps = { pathToCanvasFolder, definition: selectedComponent };

    const pathToIndexFile = indexComponentFile.path(pathGenerateProps);
    await indexComponentFile.write({ definition: selectedComponent, destinationPath: pathToIndexFile });

    const pathToReactComponentFile = reactComponentFile.path(pathGenerateProps);
    await reactComponentFile.write({ definition: selectedComponent, destinationPath: pathToReactComponentFile });

    const pathToRegisterComponentFile = registerComponentFile.path(pathGenerateProps);
    await registerComponentFile.write({ definition: selectedComponent, destinationPath: pathToRegisterComponentFile });
  });

program.parse(process.argv);
