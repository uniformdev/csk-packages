import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';
import { getFontFamilyName } from '../../utils/getTokenStyles';

const FIND_FONTS_URL_REGEX = /@import\s+url\(\s*'([^']+)'\s*\);/g;
const REGEX_FONT_VARS = /--[^:]+: [^;]+;/g;

export const pushFonts = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts, true);

  const pathToStyleFile = path.join(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);

  if (!fs.existsSync(pathToStyleFile)) {
    console.error(`No such file with styles: ${pathToStyleFile}`);
    return;
  }

  const fontsCssFile = fs.readFileSync(path.resolve(pathToStyleFile), 'utf8');

  const fontUrl = FIND_FONTS_URL_REGEX.exec(fontsCssFile)?.[1];

  const googleFontValues = Object.fromEntries(
    fontUrl
      ? new URLSearchParams(new URL(fontUrl).search)
          .getAll('family')
          .map(fontValue => [getFontFamilyName(fontValue), fontValue])
      : []
  );

  const fonts: Record<string, string> =
    fontsCssFile.match(REGEX_FONT_VARS)?.reduce((acc, line) => {
      const [key, value] = line.split(':');
      if (!key || !value) return acc;
      return {
        ...acc,
        [key?.replace('--', '')]: value?.trim()?.replace(';', ''),
      };
    }, {}) || {};

  const { defaultFont, ...resolvedFonts } = Object.entries(fonts).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value.endsWith(' !important')) {
        return { ...acc, defaultFont: key, [key]: googleFontValues[value.replace(' !important', '')] || '' };
      }
      return { ...acc, [key]: googleFontValues[value] || '' };
    },
    {}
  );

  await pushTokenValue('setFonts', JSON.stringify(resolvedFonts), IS_CANARY_ENVIRONMENT);
  await pushTokenValue('setDefaultFont', JSON.stringify({ defaultFont }), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pushed');
};
