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

const REGEX_COLOR_VARS = /--[^:]+: [^;]+;/g;

export const pushColors = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Colors, true);

  const colorsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Colors}.css`);

  const colorsCssFile = fs.readFileSync(colorsCssPath, 'utf8');

  const palette = colorsCssFile.match(REGEX_COLOR_VARS)?.reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (!key || !value) return acc;
    return {
      ...acc,
      [key?.replace('--', '')]: value?.trim()?.replace(';', ''),
    };
  }, {});

  const response = await fetch(`${getIntegrationAPIURL('setColors', isCanaryEnvironment ? 'canary' : '')}`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'x-api-key': process.env.UNIFORM_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(palette),
  });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  syncSuccessLog(TOKEN_FILE.Colors, 'pushed');
};
