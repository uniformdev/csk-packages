import path from 'node:path';

export const FG_GREEN = '\x1b[32m';

export enum CONFIG_FILE {
  Locales = 'locales',
}

export const DEFAULT_LOCALES_PATH = path.join('src', 'i18n');

export const PATH_TO_LOCALES_FOLDER = path.join(
  ...(process.env.LOCALES_PATH ?? DEFAULT_LOCALES_PATH).split(/[\\/]/).filter(Boolean)
);
