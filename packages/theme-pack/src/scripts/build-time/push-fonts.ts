import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';

export const GF_SUFFIX = '_GF_';
const FIND_FONTS_URL_REGEX = /@import\s+url\(\s*'([^']+)'\s*\);/g;

export const pushFonts = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts, true);

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);

  const fontsCssFile = fs.readFileSync(fontsCssPath, 'utf8');

  const fontUrl = FIND_FONTS_URL_REGEX.exec(fontsCssFile)?.[1];

  const googleFonts = fontUrl
    ? new URLSearchParams(new URL(fontUrl).search).getAll('family').map(font => `${font}${GF_SUFFIX}`)
    : [];

  await pushTokenValue('setFonts', JSON.stringify(googleFonts), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pushed');
};
