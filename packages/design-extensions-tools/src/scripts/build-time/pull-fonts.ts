import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_CONF_PATH, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import { getFontUrl, getRootFontsValue } from '../../utils/getTokenStyles';

const generateTailwindcssConfigFonts = (fonts: Record<string, string>, defaultFontKey: string) =>
  Object.fromEntries([
    ...Object.entries(fonts).map(([key]) => [`${key}`, `var(--${key})`]),
    ...(defaultFontKey ? [['default', `var(--${defaultFontKey})`]] : []),
  ]);

export const buildFontsStyle = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return;

  if (!fs.existsSync(PATH_TO_STYLE_FOLDER)) {
    console.error(
      `No such directory for style files: ${PATH_TO_STYLE_FOLDER}. You can override it by setting STYLES_PATH environment variable.`
    );
    return;
  }

  const fontsResponse = await fetchTokenValue('getFonts');
  const defaultFontKeyResponse = await fetchTokenValue('getDefaultFont');

  const fetchedFonts = await fontsResponse.json();
  const fetchedDefaultFontKey = await defaultFontKeyResponse.text();

  const tailwindcssFonts = generateTailwindcssConfigFonts(fetchedFonts, fetchedDefaultFontKey);

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);
  const themeConfig = !fs.existsSync(themeConfigPath)
    ? undefined
    : JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));

  const updatedThemeConfig = {
    theme: {
      ...themeConfig.theme,
      extend: {
        ...themeConfig.extend,
        fontFamily: tailwindcssFonts,
      },
    },
  };

  const cssFonts = getRootFontsValue(fetchedFonts, fetchedDefaultFontKey);
  const fontUrl = getFontUrl(fetchedFonts);

  fs.writeFileSync(themeConfigPath, JSON.stringify(updatedThemeConfig.theme, null, 2), 'utf8');

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);
  fs.writeFileSync(fontsCssPath, `${fontUrl}${cssFonts}`, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pulled');
};
