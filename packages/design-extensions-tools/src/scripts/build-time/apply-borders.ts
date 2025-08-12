import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  CONFIGURATION_KEYS,
  PATH_TO_STYLE_FOLDER,
  DEFAULT_TAILWIND_BORDER_CONF_PATH,
  DEFAULT_BORDER_VARIANTS,
  CONFIG_FILE_PATH,
} from '../../constants';
import { getRootBordersValue, parseJson, syncSuccessLog } from '../../utils';

const generateBordersData = (
  borders: Record<string, { color: string; width: string; radius: string; style: string }>
) => {
  const { borderKeys, themeLines } = Object.keys(borders).reduce<{
    borderKeys: string[];
    themeLines: string[];
  }>(
    (acc, key) => {
      acc.borderKeys.push(key);
      acc.themeLines.push(
        `.${key} {\r\n` +
          `\tborder-style: var(--${key}-style);\r\n` +
          `\tborder-radius: var(--${key}-radius);\r\n` +
          `\tborder-width: var(--${key}-width);\r\n` +
          `\tborder-color: var(--${key}-color);\r\n` +
          `}`
      );
      return acc;
    },
    { borderKeys: [], themeLines: [] }
  );

  return {
    borderKeys,
    themeBlock: themeLines.join('\r\n\r\n'),
  };
};

export const applyBorders = async (mode: 'css' | 'tailwind') => {
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

  const borders = config[CONFIGURATION_KEYS.Borders];

  if (!borders) {
    console.error(`No borders found in config file: ${CONFIG_FILE_PATH}`);
    return;
  }

  const { borderKeys, themeBlock } = generateBordersData(borders);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_BORDER_VARIANTS,
    prefixes: 'border',
    keys: borderKeys,
  });

  const cssBorders = getRootBordersValue(borders);

  const utilitiesPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_BORDER_CONF_PATH);
  const bordersCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${CONFIGURATION_KEYS.Borders}.css`);

  if (mode === 'tailwind') {
    fs.writeFileSync(utilitiesPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  }

  fs.writeFileSync(bordersCssPath, cssBorders, 'utf8');

  syncSuccessLog(CONFIGURATION_KEYS.Borders, 'applied');
};
