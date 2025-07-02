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

const generateFontsData = (fonts: Record<string, string>, defaultFontKey: string) => {
  const { fontKeys, themeLines } = Object.keys(fonts).reduce<{
    fontKeys: string[];
    themeLines: string[];
  }>(
    ({ fontKeys, themeLines }, key) => {
      fontKeys.push(key);
      themeLines.push(`\t--font-${key}: var(--${key});`);
      return { fontKeys, themeLines };
    },
    { fontKeys: [], themeLines: [] }
  );

  if (defaultFontKey) {
    fontKeys.push('default');
    themeLines.push(`\t--font-default: var(--default-font);`);
  }

  return {
    fontKeys,
    themeBlock: `@theme {\r\n${themeLines.join('\r\n')}\r\n}`,
  };
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

  const { fontKeys, themeBlock } = generateFontsData(fetchedFonts, fetchedDefaultFontKey);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_FONT_VARIANTS,
    prefixes: 'font',
    keys: fontKeys,
  });

  const cssFonts = getRootFontsValue(fetchedFonts, fetchedDefaultFontKey);
  const fontUrl = getFontUrl(fetchedFonts);

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);
  const fontsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_FONT_CONF_PATH);

  fs.writeFileSync(fontsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(fontsCssPath, `${fontUrl}${cssFonts}`, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pulled');
};
