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

const REGEX_BORDER_VARS = /--[^:]+: [^;]+;/g;

export const pushBorders = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Borders, true);

  const bordersCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Borders}.css`);

  const bordersCssFile = fs.readFileSync(bordersCssPath, 'utf8');

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
          [propertyName]: value?.trim()?.replace(';', ''),
        },
      };
    }, {});

  const response = await fetch(`${getIntegrationAPIURL('setBorders', isCanaryEnvironment ? 'canary' : '')}`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'x-api-key': process.env.UNIFORM_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(borders),
  });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  syncSuccessLog(TOKEN_FILE.Borders, 'pushed');
};
