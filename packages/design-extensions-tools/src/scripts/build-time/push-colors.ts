import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import {
  checkConnectionOptions,
  checkEnvironmentVariable,
  parseJson,
  pushTokenValue,
  syncSuccessLog,
} from '../../utils';
import { validateColorsConfiguration } from '../../utils/validation';

export const pushColors = async (connectionOptions: ConnectionOptions) => {
  checkEnvironmentVariable(true);
  if (!checkConnectionOptions(connectionOptions)) return;

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const colors = configuration[CONFIGURATION_KEYS.Colors];

  if (!colors) {
    console.error(`No colors found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  const themeKeys = Object.keys(colors);

  for (const key of themeKeys) {
    const { isValid, error } = validateColorsConfiguration(colors[key]);

    if (!isValid) {
      throw new Error(error);
    }
  }

  await pushTokenValue('setColors', JSON.stringify(colors), connectionOptions);

  syncSuccessLog(CONFIGURATION_KEYS.Colors, 'pushed');
};
