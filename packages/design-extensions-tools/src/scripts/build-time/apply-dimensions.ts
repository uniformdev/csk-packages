import fs from 'node:fs';
import path from 'node:path';
import { generateTailwindcssSource } from 'src/utils/generateTailwindcssPatterns';
import {
  CONFIG_FILE_PATH,
  DEFAULT_DIMENSION_PREFIXES,
  DEFAULT_DIMENSION_VARIANTS,
  DEFAULT_TAILWIND_DIMENSION_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  CONFIGURATION_KEYS,
} from '../../constants';
import { getRootSimpleTokensValue, parseJson, syncSuccessLog } from '../../utils';

const generateDimensionsData = (dimensions: Record<string, { light: string; dark: string }>) => {
  const { dimensionKeys, themeLines } = Object.keys(dimensions).reduce<{
    dimensionKeys: string[];
    themeLines: string[];
  }>(
    ({ dimensionKeys, themeLines }, key) => {
      dimensionKeys.push(key);
      themeLines.push(`\t--spacing-${key}: var(--${key});`);
      return { dimensionKeys, themeLines };
    },
    { dimensionKeys: [], themeLines: [] }
  );

  return {
    dimensionKeys,
    themeBlock: `@theme {\r\n${themeLines.join('\r\n')}\r\n}`,
  };
};

export const applyDimensions = async (mode: 'css' | 'tailwind') => {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    console.error(
      `No such file: ${CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const config = parseJson(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'));

  const dimensions = config[CONFIGURATION_KEYS.Dimensions];

  if (!dimensions) {
    console.error(`No dimensions found in config file: ${CONFIG_FILE_PATH}`);
    return;
  }

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const { dimensionKeys, themeBlock } = generateDimensionsData(dimensions);

  const sourceLine = generateTailwindcssSource({
    variants: DEFAULT_DIMENSION_VARIANTS,
    prefixes: DEFAULT_DIMENSION_PREFIXES,
    keys: dimensionKeys,
  });

  const cssDimensions = getRootSimpleTokensValue(dimensions);

  const dimensionsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${CONFIGURATION_KEYS.Dimensions}.css`);
  const dimensionsTailwindcssPath = path.resolve(PATH_TO_STYLE_FOLDER, DEFAULT_TAILWIND_DIMENSION_CONF_PATH);

  if (mode === 'tailwind') {
    fs.writeFileSync(dimensionsTailwindcssPath, `${sourceLine}\r\n\r\n${themeBlock}`, 'utf8');
  }

  fs.writeFileSync(dimensionsCssPath, cssDimensions, 'utf8');

  syncSuccessLog(CONFIGURATION_KEYS.Dimensions, 'applied');
};
