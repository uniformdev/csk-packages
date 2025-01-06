import { program } from 'commander';
import initCommand from './commands/init';
import { scaffold } from './commands/scaffold';

program
  .command('init')
  .option('-d, --dev', 'development mode')
  .description('Initialize the project')
  .action(initCommand);

program.command('scaffold').description('Generate a new component based on canvas data').action(scaffold);

program.parse(process.argv);
