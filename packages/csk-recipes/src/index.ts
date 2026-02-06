import { program } from 'commander';
import initCommand from './commands/init';
import { getProxyUrl, setProxyUrl } from './utils/proxy';

program.option('--proxy <url>', 'HTTPS proxy URL. Defaults to HTTPS_PROXY env var.', getProxyUrl());

program
  .command('init')
  .option('-d, --dev', 'development mode')
  .option('-t, --template <template>', 'template name ("baseline", "coffee-shop", "radiant")')
  .option('-r, --recipes <recipes...>', 'recipes to include ("localization", "ga", "uniform-insights")')
  .option('-v, --verbose', 'verbose mode')
  .description('Initialize the project')
  .action(initCommand);

program.hook('preAction', command => {
  const opts = command.opts();
  setProxyUrl(opts.proxy);
});

program.parse(process.argv);
