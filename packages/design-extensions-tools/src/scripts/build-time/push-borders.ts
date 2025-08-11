import fs from 'node:fs';
import path from 'node:path';
import { PATH_TO_STYLE_FOLDER, DEFAULT_CONFIG_FILE_PATH, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushBorders = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders, true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const borders = configuration[TOKEN_STYLE_FILE.Borders];

  if (!borders) {
    console.error(`No borders found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  //await pushTokenValue('setBorders', JSON.stringify(borders));

  syncSuccessLog(TOKEN_STYLE_FILE.Borders, 'pushed');
};
