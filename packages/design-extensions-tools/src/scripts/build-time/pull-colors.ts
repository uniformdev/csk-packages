import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_TAILWIND_COLOR_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  ROOT_COLOR_SCHEME_KEY,
  TOKEN_STYLE_FILE,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import { getColorTokensValue } from '../../utils/getTokenStyles';

const generateColorsData = (colors: Record<string, { light: string; dark: string }>) => {
  const { colorKeys, themeLines } = Object.keys(colors).reduce<{
    colorKeys: string[];
    themeLines: string[];
  }>(
    ({ colorKeys, themeLines }, key) => {
      colorKeys.push(key);
      themeLines.push(`\t--color-${key}: var(--${key});`);
      return { colorKeys, themeLines };
    },
    { colorKeys: [], themeLines: [] }
  );

  return {
    colorKeys,
    themeBlock: `@theme {\r\n${themeLines.join('\r\n')}\r\n}`,
  };
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

  const palette = fetchedPalette[ROOT_COLOR_SCHEME_KEY] || {};
  const { colorKeys, themeBlock } = generateColorsData(palette);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_COLOR_VARIANTS,
    prefixes: DEFAULT_COLOR_PREFIXES,
    keys: colorKeys,
  });

  const cssPalette = getColorTokensValue(fetchedPalette);

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);
  const colorsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_COLOR_CONF_PATH);

  fs.writeFileSync(colorsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pulled');
};
