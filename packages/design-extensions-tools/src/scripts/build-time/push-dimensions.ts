import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushDimensions = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions, true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const dimensions = configuration[TOKEN_STYLE_FILE.Dimensions];

  if (!dimensions) {
    console.error(`No dimensions found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  //await pushTokenValue('setDimensions', JSON.stringify(dimensions));

  syncSuccessLog(TOKEN_STYLE_FILE.Dimensions, 'pushed');
};
