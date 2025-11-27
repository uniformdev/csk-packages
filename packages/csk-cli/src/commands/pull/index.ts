import { pullLocales } from './pull-locales';
import { pullUniformProject } from './pull-uniform';

type PullArgs = {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  locales?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
  dev?: boolean;
  uniform?: boolean;
};

export const pullCommand = async (args: PullArgs) => {
  const { dev, uniform, locales } = args || {};
  if (locales) {
    console.info('Pulling locales...');
    pullLocales().catch(e => console.error(e));
    return;
  } else if (uniform) {
    console.info('Pulling uniform canvas data...');
    pullUniformProject(!!dev).catch(e => console.error(e));
    return;
  }
};
