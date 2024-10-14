import fs from 'node:fs';
import path from 'node:path';
import { TOKEN_FILE } from '../../constants';
import {
  checkEnvironmentVariable,
  getIntegrationAPIURL,
  getStylesPath,
  isCanaryEnvironment,
  syncSuccessLog,
} from '../../utils';

const REGEX_DIMENSION_VARS = /--[^:]+: [^;]+;/g;

export const pushDimensions = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Dimensions, true);

  const dimensionsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Dimensions}.css`);

  const dimensionsCssFile = fs.readFileSync(dimensionsCssPath, 'utf8');

  const dimensions = dimensionsCssFile.match(REGEX_DIMENSION_VARS)?.reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (!key || !value) return acc;
    return {
      ...acc,
      [key?.replace('--', '')]: value?.trim()?.replace(';', ''),
    };
  }, {});

  const response = await fetch(`${getIntegrationAPIURL('setDimensions', isCanaryEnvironment ? 'canary' : '')}`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'x-api-key': process.env.UNIFORM_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dimensions),
  });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  syncSuccessLog(TOKEN_FILE.Dimensions, 'pushed');
};
