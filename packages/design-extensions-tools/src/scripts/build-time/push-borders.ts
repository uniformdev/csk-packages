import fs from 'node:fs';
import path from 'node:path';
import { PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';
import { getValueWithAlias } from '../../utils/getTokenStyles';

const REGEX_BORDER_VARS = /--[^:]+: [^;]+;/g;

export const pushBorders = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders, true);

  const pathToStyleFile = path.join(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Borders}.css`);

  if (!fs.existsSync(pathToStyleFile)) {
    console.error(
      `No such file with styles: ${pathToStyleFile}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const bordersCssFile = fs.readFileSync(path.resolve(pathToStyleFile), 'utf8');

  const borders = bordersCssFile
    .match(REGEX_BORDER_VARS)
    ?.reduce<Record<string, Record<string, string>>>((acc, line) => {
      const [key, value] = line.split(':');
      if (!key || !value) return acc;
      const lastDashIndex = key.lastIndexOf('-');

      const borderKey = key.substring(0, lastDashIndex).replace('--', '');
      const propertyName = key.substring(lastDashIndex + 1);

      return {
        ...acc,
        [borderKey]: {
          ...acc[borderKey],
          [propertyName]: getValueWithAlias(value?.trim()?.replace(';', '')),
        },
      };
    }, {});

  await pushTokenValue('setBorders', JSON.stringify(borders));

  syncSuccessLog(TOKEN_STYLE_FILE.Borders, 'pushed');
};
