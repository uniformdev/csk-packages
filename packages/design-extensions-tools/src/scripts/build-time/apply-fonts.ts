import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_FONT_VARIANTS,
  DEFAULT_TAILWIND_FONT_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  CONFIGURATION_KEYS,
  CONFIG_FILE_PATH,
} from '../../constants';
import { parseJson, syncSuccessLog } from '../../utils';
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

export const applyFonts = async (mode: 'css' | 'tailwind') => {
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

  const fonts = config[CONFIGURATION_KEYS.Fonts];
  const defaultFontKey = config[CONFIGURATION_KEYS.DefaultFontKey];

  if (!fonts) {
    console.error(`No fonts found in config file: ${CONFIG_FILE_PATH}`);
    return;
  }

  if (!defaultFontKey) {
    console.error(`No default font key found in config file: ${CONFIG_FILE_PATH}`);
    return;
  }

  const { fontKeys, themeBlock } = generateFontsData(fonts, defaultFontKey);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_FONT_VARIANTS,
    prefixes: 'font',
    keys: fontKeys,
  });

  const cssFonts = getRootFontsValue(fonts, defaultFontKey);
  const fontUrl = getFontUrl(fonts);

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${CONFIGURATION_KEYS.Fonts}.css`);

  const fontsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_FONT_CONF_PATH);

  if (mode === 'tailwind') {
    fs.writeFileSync(fontsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  }
  fs.writeFileSync(fontsCssPath, `${fontUrl}${cssFonts}`, 'utf8');

  syncSuccessLog(CONFIGURATION_KEYS.Fonts, 'applied');
};
