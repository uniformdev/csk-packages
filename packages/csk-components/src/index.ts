import { program } from 'commander';
import { extractCanvasComponents } from './commands/extractor';
import { EXTRACT_CANVAS_COMPONENTS } from './constants';

type ExtractArgs = {
  components?: string[];
};

program
  .command('extract')
  .description('Extract canvas, ui and content components and utils for them')
  .option(
    '-c, --components <components...>',
    `canvas components to extract: \n${EXTRACT_CANVAS_COMPONENTS.join(', \n')}`
  )
  .action(async (args: ExtractArgs) => {
    const { components: extractComponents = [] } = args;
    await extractCanvasComponents(extractComponents).catch(e => console.error(e));

    return;
  });

program.parse(process.argv);
