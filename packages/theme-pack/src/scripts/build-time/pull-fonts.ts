import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_CONF_PATH, PATH_TO_STYLE_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';

const REGEX_FONT_URL = /https?:\/\/[^\s'">]+/g;
const FONT_FAMILY_PREFIX = 'family';
const GF_SUFFIX = '_GF_';

const getFontName = (fontKey: string) => (fontKey.split(':')[0] || fontKey).replaceAll(GF_SUFFIX, '');

const generateTailwindcssConfigFontStyles = (links: string[]) =>
  Object.fromEntries(links.map(link => [`${getFontName(link).toLowerCase().replaceAll(' ', '-')}`, getFontName(link)]));

const generateTailwindcssConfigCustomFont = (customFontKeys: string[]) =>
  Object.fromEntries(customFontKeys.map(customFontKey => [customFontKey, `var(--font-${customFontKey})`]));

export const buildFontsStyle = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return;

  const fontStylesResponse = await fetchTokenValue('getFontStyles', 'resolve=false');

  const fetchedFontStyles = await fontStylesResponse.text();

  const customFontKeysResponse = await fetchTokenValue('getCustomFontKeys');

  const fetchedCustomFontKeys = await customFontKeysResponse.json();

  const tailwindcssConfigFonts = {
    ...generateTailwindcssConfigFontStyles(
      [...fetchedFontStyles.matchAll(REGEX_FONT_URL)]
        .map(([firstItem]) => new URL(firstItem).searchParams.getAll(FONT_FAMILY_PREFIX))
        .flat()
    ),
    ...generateTailwindcssConfigCustomFont(fetchedCustomFontKeys),
  };

  const themeConfigPath = path.resolve(DEFAULT_TAILWIND_CONF_PATH);
  const themeConfig = JSON.parse(fs.readFileSync(themeConfigPath, 'utf8'));
  const updatedThemeConfig = {
    theme: {
      ...themeConfig.theme,
      extend: {
        ...themeConfig.extend,
        fontFamily: tailwindcssConfigFonts,
      },
    },
  };

  fs.writeFileSync(themeConfigPath, JSON.stringify(updatedThemeConfig.theme, null, 2), 'utf8');

  const fontsCssPath = path.resolve(PATH_TO_STYLE_FOLDER, `${TOKEN_STYLE_FILE.Fonts}.css`);
  fs.writeFileSync(fontsCssPath, fetchedFontStyles, 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pulled');
};
