import { program } from 'commander';
import initCommand from './commands/init';

program
  .command('init')
  .option('-d, --dev', 'development mode')
  .option('-t, --template <template>', 'template name ("baseline", "coffee-shop", "radiant")')
  .option('-r, --recipes <recipes...>', 'recipes to include ("localization", "ga", "uniform-insights", "shadcn")')
  .description('Initialize the project')
  .action(initCommand);

program.parse(process.argv);
