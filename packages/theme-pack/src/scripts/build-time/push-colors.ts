import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';

const REGEX_COLOR_VARS = /--[^:]+: [^;]+;/g;

export const pushColors = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors, true);

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);

  const colorsCssFile = fs.readFileSync(colorsCssPath, 'utf8');

  const palette = colorsCssFile.match(REGEX_COLOR_VARS)?.reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (!key || !value) return acc;
    return {
      ...acc,
      [key?.replace('--', '')]: value?.trim()?.replace(';', ''),
    };
  }, {});

  await pushTokenValue('setColors', JSON.stringify(palette), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pushed');
};
