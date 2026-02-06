import { program } from 'commander';
import { initUniformProject } from './commands/init';
import { pullCommand } from './commands/pull';
import { scaffold } from './commands/scaffold';
import { getProxyUrl, createProxyFetch } from './utils/proxy';

program.option('--proxy <url>', 'HTTPS proxy URL. Defaults to HTTPS_PROXY env var.', getProxyUrl());

program
  .command('scaffold')
  .description('Generate a new component based on canvas data')
  .action(async () => {
    const opts = program.opts();
    const proxyFetch = createProxyFetch(opts.proxy);
    await scaffold(proxyFetch);
  });

program
  .command('pull')
  .description('Pull additonal data')
  .option('-l, --locales', 'locales configuration')
  .option('-u, --uniform', 'uniform canvas data')
  .option('-d, --dev', 'development mode')
  .action(async args => {
    const opts = program.opts();
    const proxyFetch = createProxyFetch(opts.proxy);
    await pullCommand(args, proxyFetch);
  });

program
  .command('init')
  .description('Initialize the uniform project')
  .option('-d, --dev', 'development mode')
  .action(initUniformProject);

program.parse(process.argv);
