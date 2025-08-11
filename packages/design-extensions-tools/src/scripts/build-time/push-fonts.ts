import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushFonts = async () => {
  checkEnvironmentVariable(true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const fonts = configuration[CONFIGURATION_KEYS.Fonts];

  if (!fonts) {
    console.error(`No fonts found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  const defaultFont = configuration[CONFIGURATION_KEYS.DefaultFontKey];

  await pushTokenValue('setFonts', JSON.stringify(fonts));
  await pushTokenValue('setDefaultFont', JSON.stringify({ defaultFont }));

  syncSuccessLog(CONFIGURATION_KEYS.Fonts, 'pushed');
};
