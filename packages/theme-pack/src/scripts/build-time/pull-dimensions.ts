import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_CONF_PATH, TOKEN_FILE } from '../../constants';
import {
  checkEnvironmentVariable,
  getIntegrationAPIURL,
  getRootSimpleTokensValue,
  getStylesPath,
  syncSuccessLog,
} from '../../utils';

const generateTailwindcssConfigDimensions = (dimensions: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(dimensions).map(([key]) => [`${key}`, `var(--${key})`]));

export const buildDimensions = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Dimensions);

  const response = await fetch(`${getIntegrationAPIURL('getDimensions')}`, { cache: 'no-cache' });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedDimensions = await response.json();

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);

  const dimensionsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Dimensions}.css`);

  const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

  const tailwindcssDimensions = generateTailwindcssConfigDimensions(fetchedDimensions);

  const updatedThemeConfig = {
    theme: {
      ...themeConfig.theme,
      extend: {
        ...themeConfig.extend,
        spacing: tailwindcssDimensions,
      },
    },
  };

  const cssDimensions = getRootSimpleTokensValue(fetchedDimensions);

  fs.writeFileSync(themeConfigPath, JSON.stringify(updatedThemeConfig.theme, null, 2), 'utf8');

  fs.writeFileSync(dimensionsCssPath, cssDimensions, 'utf8');

  syncSuccessLog(TOKEN_FILE.Dimensions, 'pulled');
};
