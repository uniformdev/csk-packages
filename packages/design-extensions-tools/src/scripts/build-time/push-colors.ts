import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushColors = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors, true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const colors = configuration[TOKEN_STYLE_FILE.Colors];

  if (!colors) {
    console.error(`No colors found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  //await pushTokenValue('setColors', JSON.stringify(colors));

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pushed');
};
