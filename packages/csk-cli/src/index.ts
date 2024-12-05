import { program } from 'commander';
import initCommand from './commands/init';

program
  .command('init')
  .option('-d, --dev', 'development mode')
  .description('Initialize the project')
  .action(initCommand);

program.parse(process.argv);
