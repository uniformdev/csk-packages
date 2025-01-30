import { pullLocales } from './pull-locales';

type PullArgs = {
  colors?: boolean;
  dimensions?: boolean;
  fonts?: boolean;
  borders?: boolean;
  groups?: boolean;
  locales?: boolean;
  allTokens?: boolean;
  allSettings: boolean;
};

export const pullCommand = async (args: PullArgs) => {
  if (args?.locales) {
    console.info('Pulling locales...');
    pullLocales().catch(e => console.error(e));
    return;
  }
};
