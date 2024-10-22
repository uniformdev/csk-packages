import fs from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_TAILWIND_CONF_PATH,
  PATH_TO_STYLE_FOLDER,
  ROOT_COLOR_SCHEME_KEY,
  TOKEN_STYLE_FILE,
} from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import { getColorTokensValue } from '../../utils/getTokenStyles';

const generateTailwindcssConfigColors = (colors: Record<string, { light: string; dark: string }>) =>
  Object.fromEntries(Object.entries(colors).map(([key]) => [`${key}`, `var(--${key})`]));

export const buildColors = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(`No such directory for style files: ${PATH_TO_STYLE_FOLDER}`);
    return;
  }

  const response = await fetchTokenValue('getColors');

  const fetchedPalette = await response.json();

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);

  const colorsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Colors}.css`);

  const themeConfig = !fs.existsSync(themeConfigPath)
    ? undefined
    : JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

  const tailwindcssColors = generateTailwindcssConfigColors(fetchedPalette[ROOT_COLOR_SCHEME_KEY]);

  const updatedThemeConfig = {
    theme: {
      ...themeConfig.theme,
      extend: {
        ...themeConfig.extend,
        colors: tailwindcssColors,
      },
    },
  };

  const cssPalette = getColorTokensValue(fetchedPalette);

  fs.writeFileSync(themeConfigPath, JSON.stringify(updatedThemeConfig.theme, null, 2), 'utf8');

  fs.writeFileSync(colorsCssPath, cssPalette, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pulled');
};
