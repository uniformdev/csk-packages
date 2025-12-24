import fs from 'node:fs';
import path from 'node:path';
import { LocaleClient, LocalesGetResponse } from '@uniformdev/canvas';
import { CONFIG_FILE, PATH_TO_LOCALES_FOLDER } from './constants';
import { syncSuccessLog } from './utils';

type LocalizationSettings = {
  locales: string[];
  localeNames: { [key: string]: string };
  localeGroups: { [key: string]: string };
  defaultLocale: string | null;
};

export const pullLocales = async () => {
  if (!fs.existsSync(PATH_TO_LOCALES_FOLDER)) {
    console.error(
      `No such directory for locales files: ${PATH_TO_LOCALES_FOLDER}. You can override it by setting LOCALES_PATH environment variable.`
    );
    return;
  }

  const client = new LocaleClient({
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiKey: process.env.UNIFORM_API_KEY,
    apiHost: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
  });

  const localeResponse: LocalesGetResponse = await client.get();

  const { results: localeDefinitions } = localeResponse;

  const localizationSettings = localeDefinitions?.reduce<LocalizationSettings>(
    (acc, l) => {
      acc.locales.push(l.locale);
      acc.localeNames[l.locale] = l.displayName;
      acc.localeGroups[l.locale] = l.group ?? '';
      if (l.isDefault) {
        acc.defaultLocale = l.locale;
      }
      return acc;
    },
    {
      locales: [],
      localeNames: {},
      localeGroups: {},
      defaultLocale: null,
    }
  );

  const localesPath = path.resolve(PATH_TO_LOCALES_FOLDER, `${CONFIG_FILE.Locales}.json`);

  fs.writeFile(localesPath, JSON.stringify(localizationSettings, undefined, ' '), e => {
    if (e) {
      console.error(e);
    }
  });

  syncSuccessLog(CONFIG_FILE.Locales, 'pulled');
};
