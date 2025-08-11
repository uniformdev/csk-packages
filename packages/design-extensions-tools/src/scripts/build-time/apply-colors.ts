import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_COLOR_PREFIXES,
  DEFAULT_COLOR_VARIANTS,
  DEFAULT_TAILWIND_COLOR_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  ROOT_COLOR_SCHEME_KEY,
  CONFIGURATION_KEYS,
  CONFIG_FILE_PATH,
} from '../../constants';
import { parseJson, syncSuccessLog } from '../../utils';
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

export const applyColors = async (mode: 'css' | 'tailwind') => {
  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    console.error(
      `No such file: ${CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const config = parseJson(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'));

  const colors = config[CONFIGURATION_KEYS.Colors];

  if (!colors) {
    console.error(`No colors found in config file: ${CONFIG_FILE_PATH}`);
    return;
  }

  const palette = colors[ROOT_COLOR_SCHEME_KEY] || {};

  const { colorKeys, themeBlock } = generateColorsData(palette);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_COLOR_VARIANTS,
    prefixes: DEFAULT_COLOR_PREFIXES,
    keys: colorKeys,
  });

  const cssPalette = getColorTokensValue(colors);

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${CONFIGURATION_KEYS.Colors}.css`);
  const colorsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_COLOR_CONF_PATH);

  if (mode === 'tailwind') {
    fs.writeFileSync(colorsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  }

  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  syncSuccessLog(CONFIGURATION_KEYS.Colors, 'applied');
};
