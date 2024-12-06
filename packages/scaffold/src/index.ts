import { program } from 'commander';
import * as ora from 'ora';
import { select } from '@inquirer/prompts';
import { PATH_TO_CUSTOM_CANVAS_FOLDER } from './constants';
import { indexComponentFile, registerComponentFile } from './steps';
import { getCanvasClient } from './utils';

program
  .command('add')
  .description('Generate a new component based on canvas data')
  .action(async () => {
    try {
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

      const pathGenerateProps = { pathToCanvasFolder: PATH_TO_CUSTOM_CANVAS_FOLDER, definition: selectedComponent };

      const pathToIndexFile = await indexComponentFile.path(pathGenerateProps);
      await indexComponentFile.write({ definition: selectedComponent, destinationPath: pathToIndexFile }).catch(() => {
        spinner.fail('Oops, something went wrong. We couldn’t generate the component for you.');
        spinner.stop();
        throw new Error('Something went wrong');
      });

      const pathToRegisterComponentFile = await registerComponentFile.path(pathGenerateProps);
      await registerComponentFile
        .write({
          definition: selectedComponent,
          destinationPath: pathToRegisterComponentFile,
        })
        .catch(() => {
          spinner.fail(
            'Oops, something went wrong. We couldn’t connect the component to the mapper. Please check if the required file is available or manually connect a new component.'
          );
          spinner.stop();
          throw new Error('Something went wrong');
        });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('force closed')) {
          console.info('\n👋 See you next time! 🧡\n');
        } else {
          console.error('\n🙁 Something went wrong. Please try again.\n');
        }
      }
    }
  });

program.parse(process.argv);
