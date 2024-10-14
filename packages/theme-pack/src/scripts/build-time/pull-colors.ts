import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_CONF_PATH, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, getRootSimpleTokensValue, fetchTokenValue, syncSuccessLog } from '../../utils';

const generateTailwindcssConfigColors = (colors: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(colors).map(([key]) => [`${key}`, `var(--${key})`]));

export const buildColors = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors)) return;

  const response = await fetchTokenValue('getColors');

  const fetchedPalette = await response.json();

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);

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

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pulled');
};
