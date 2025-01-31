import { program } from 'commander';
import { pullCommand } from './commands/pull';
import { scaffold } from './commands/scaffold';

program.command('scaffold').description('Generate a new component based on canvas data').action(scaffold);

program
  .command('pull')
  .description('Pull additonal data')
  .option('-l, --locales', 'locales configuration')

  .action(pullCommand);

program.parse(process.argv);
