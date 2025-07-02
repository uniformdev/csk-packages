import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  TOKEN_STYLE_FILE,
  PATH_TO_STYLE_FOLDER,
  DEFAULT_TAILWIND_BORDER_CONF_PATH,
  DEFAULT_BORDER_VARIANTS,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getRootBordersValue, syncSuccessLog } from '../../utils';

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

export const buildBorders = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const response = await fetchTokenValue('getBorders');
  const fetchedBorders = await response.json();

  const { borderKeys, themeBlock } = generateBordersData(fetchedBorders);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_BORDER_VARIANTS,
    prefixes: 'border',
    keys: borderKeys,
  });

  const cssBorders = getRootBordersValue(fetchedBorders);

  const utilitiesPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_BORDER_CONF_PATH);
  const bordersCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Borders}.css`);

  fs.writeFileSync(utilitiesPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(bordersCssPath, cssBorders, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Borders, 'pulled');
};
