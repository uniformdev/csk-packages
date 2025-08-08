import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_FONT_VARIANTS,
  DEFAULT_TAILWIND_FONT_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  TOKEN_STYLE_FILE,
  CONFIG_FILE_PATH,
} from '../../constants';
import { checkEnvironmentVariable, parseJson, syncSuccessLog } from '../../utils';
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
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return;

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

  const fonts = config[TOKEN_STYLE_FILE.Fonts];
  const defaultFontKey = config[TOKEN_STYLE_FILE.DefaultFontKey];

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

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);

  const fontsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_FONT_CONF_PATH);

  if (mode === 'tailwind') {
    fs.writeFileSync(fontsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  }
  fs.writeFileSync(fontsCssPath, `${fontUrl}${cssFonts}`, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'applied');
};
