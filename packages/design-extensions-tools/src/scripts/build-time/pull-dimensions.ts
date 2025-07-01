import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_TAILWIND_DIMENSION_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  TOKEN_STYLE_FILE,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getRootSimpleTokensValue, syncSuccessLog } from '../../utils';

const generateTailwindcssConfigDimensions = (dimensions: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(dimensions).map(([key]) => [`${key}`, `var(--${key})`]));

const generateThemeBlock = (fontConfig: Record<string, string>) => {
  const lines = Object.entries(fontConfig)
    .map(([key, value]) => `\t--spacing-${key}: ${value};`)
    .join('\r\n');

  return `@theme {\r\n${lines}\r\n}`;
};

export const buildDimensions = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions)) return;

  const response = await fetchTokenValue('getDimensions');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const fetchedDimensions = await response.json();

  const dimensionsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Dimensions}.css`);
  const dimensionsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_DIMENSION_CONF_PATH);

  const tailwindcssDimensions = generateTailwindcssConfigDimensions(fetchedDimensions);
  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_DIMENSION_VARIANTS,
    prefixes: DEFAULT_DIMENSION_PREFIXES,
    keys: Object.keys(tailwindcssDimensions),
  });
  const themeBlock = generateThemeBlock(tailwindcssDimensions);

  const cssDimensions = getRootSimpleTokensValue(fetchedDimensions);

  fs.writeFileSync(dimensionsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  fs.writeFileSync(dimensionsCssPath, cssDimensions, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Dimensions, 'pulled');
};
