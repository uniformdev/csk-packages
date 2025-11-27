import { program } from 'commander';
import { initUniformProject } from './commands/init';
import { pullCommand } from './commands/pull';
import { scaffold } from './commands/scaffold';

program.command('scaffold').description('Generate a new component based on canvas data').action(scaffold);

program
  .command('pull')
  .description('Pull additonal data')
  .option('-l, --locales', 'locales configuration')
  .option('-u, --uniform', 'uniform canvas data')
  .option('-d, --dev', 'development mode')
  .action(pullCommand);

program
  .command('init')
  .description('Initialize the uniform project')
  .option('-d, --dev', 'development mode')
  .action(initUniformProject);

program.parse(process.argv);
