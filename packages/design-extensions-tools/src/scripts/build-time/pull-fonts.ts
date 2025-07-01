import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_FONT_VARIANTS,
  DEFAULT_TAILWIND_FONT_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  TOKEN_STYLE_FILE,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import { getFontUrl, getRootFontsValue } from '../../utils/getTokenStyles';

const generateTailwindcssConfigFonts = (fonts: Record<string, string>, defaultFontKey: string) =>
  Object.fromEntries([
    ...Object.entries(fonts).map(([key]) => [`${key}`, `var(--${key})`]),
    ...(defaultFontKey ? [['default', `var(--default-font)`]] : []),
  ]);

const generateThemeBlock = (fontConfig: Record<string, string>) => {
  const lines = Object.entries(fontConfig)
    .map(([key, value]) => `\t--font-${key}: ${value};`)
    .join('\r\n');

  return `@theme {\r\n${lines}\r\n}`;
};

export const buildFontsStyle = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const fontsResponse = await fetchTokenValue('getFonts');
  const defaultFontKeyResponse = await fetchTokenValue('getDefaultFont');

  const fetchedFonts = await fontsResponse.json();
  const fetchedDefaultFontKey = await defaultFontKeyResponse.text();

  const tailwindcssFonts = generateTailwindcssConfigFonts(fetchedFonts, fetchedDefaultFontKey);
  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_FONT_VARIANTS,
    prefixes: 'font',
    keys: Object.keys(tailwindcssFonts),
  });
  const themeBlock = generateThemeBlock(tailwindcssFonts);

  const cssFonts = getRootFontsValue(fetchedFonts, fetchedDefaultFontKey);
  const fontUrl = getFontUrl(fetchedFonts);

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);
  const fontsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_FONT_CONF_PATH);

  fs.writeFileSync(fontsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(fontsCssPath, `${fontUrl}${cssFonts}`, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pulled');
};
