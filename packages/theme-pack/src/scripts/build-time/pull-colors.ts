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

const generateTailwindcssConfigColors = (colors: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(colors).map(([key]) => [`${key}`, `var(--${key})`]));

export const buildColors = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Colors);

  const response = await fetch(`${getIntegrationAPIURL('getColors')}`, { cache: 'no-cache' });

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedPalette = await response.json();

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);

  const colorsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Colors}.css`);

  const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

  const tailwindcssColors = generateTailwindcssConfigColors(fetchedPalette);

  const updatedThemeConfig = {
    theme: {
      ...themeConfig.theme,
      extend: {
        ...themeConfig.extend,
        colors: tailwindcssColors,
      },
    },
  };

  const cssPalette = getRootSimpleTokensValue(fetchedPalette);

  fs.writeFileSync(themeConfigPath, JSON.stringify(updatedThemeConfig.theme, null, 2), 'utf8');

  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  syncSuccessLog(TOKEN_FILE.Colors, 'pulled');
};
