import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';

const REGEX_DIMENSION_VARS = /--[^:]+: [^;]+;/g;

export const pushDimensions = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions, true);

  const pathToStyleFile = path.join(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Dimensions}.css`);

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(`No such file with styles : ${pathToStyleFile}`);
    return;
  }

  const dimensionsCssPath = path.resolve(pathToStyleFile);

  const dimensionsCssFile = fs.readFileSync(dimensionsCssPath, 'utf8');

  const dimensions = dimensionsCssFile.match(REGEX_DIMENSION_VARS)?.reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (!key || !value) return acc;
    return {
      ...acc,
      [key?.replace('--', '')]: value?.trim()?.replace(';', ''),
    };
  }, {});

  await pushTokenValue('setDimensions', JSON.stringify(dimensions), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.Dimensions, 'pushed');
};
