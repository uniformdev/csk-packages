import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_TAILWIND_COLOR_CONF_PATH,
  DEFAULT_TAILWIND_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  ROOT_COLOR_SCHEME_KEY,
  TOKEN_STYLE_FILE,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import { getColorTokensValue } from '../../utils/getTokenStyles';

const generateTailwindcssConfigColors = (colors: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(colors).map(([key]) => [`${key}`, `var(--${key})`]));

const generateThemeBlock = (fontConfig: Record<string, string>) => {
  const lines = Object.entries(fontConfig)
    .map(([key, value]) => `\t--color-${key}: ${value};`)
    .join('\r\n');

  return `@theme {\r\n${lines}\r\n}`;
};

export const buildColors = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const response = await fetchTokenValue('getColors');

  const fetchedPalette = await response.json();

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);
  const colorsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_COLOR_CONF_PATH);

  const tailwindcssColors = generateTailwindcssConfigColors(fetchedPalette[ROOT_COLOR_SCHEME_KEY] || {});
  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_COLOR_VARIANTS,
    prefixes: DEFAULT_COLOR_PREFIXES,
    keys: Object.keys(tailwindcssColors),
  });
  const themeBlock = generateThemeBlock(tailwindcssColors);

  const cssPalette = getColorTokensValue(fetchedPalette);

  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  fs.writeFileSync(colorsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pulled');
};
