import fs from 'node:fs';
import path from 'node:path';
import { PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';
import { getValueWithAlias } from '../../utils/getTokenStyles';

const REGEX_DIMENSION_VARS = /--[^:]+: [^;]+;/g;

export const pushDimensions = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions, true);

  const pathToStyleFile = path.join(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Dimensions}.css`);

  if (!fs.existsSync(pathToStyleFile)) {
    console.error(
      `No such file with styles: ${pathToStyleFile}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const dimensionsCssFile = fs.readFileSync(path.resolve(pathToStyleFile), 'utf8');

  const dimensions = dimensionsCssFile.match(REGEX_DIMENSION_VARS)?.reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (!key || !value) return acc;
    return {
      ...acc,
      [key?.replace('--', '')]: getValueWithAlias(value?.trim()?.replace(';', '')),
    };
  }, {});

  await pushTokenValue('setDimensions', JSON.stringify(dimensions));

  syncSuccessLog(TOKEN_STYLE_FILE.Dimensions, 'pushed');
};
