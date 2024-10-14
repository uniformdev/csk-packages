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

export const GF_SUFFIX = '_GF_';
const FIND_FONTS_URL_REGEX = /@import\s+url\(\s*'([^']+)'\s*\);/g;

export const pushFonts = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Fonts, true);

  const fontsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Fonts}.css`);

  const fontsCssFile = fs.readFileSync(fontsCssPath, 'utf8');

  const fontUrl = FIND_FONTS_URL_REGEX.exec(fontsCssFile)?.[1];

  const googleFonts = fontUrl
    ? new URLSearchParams(new URL(fontUrl).search).getAll('family').map(font => `${font}${GF_SUFFIX}`)
    : [];

  const response = await fetch(`${getIntegrationAPIURL('setFonts', isCanaryEnvironment ? 'canary' : '')}`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'x-api-key': process.env.UNIFORM_API_KEY || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(googleFonts),
  });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  syncSuccessLog(TOKEN_FILE.Fonts, 'pushed');
};
