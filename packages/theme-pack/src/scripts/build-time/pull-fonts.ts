import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TAILWIND_CONF_PATH, TOKEN_FILE } from '../../constants';
import { checkEnvironmentVariable, getIntegrationAPIURL, getStylesPath, syncSuccessLog } from '../../utils';

const REGEX_FONT_URL = /https?:\/\/[^\s'">]+/g;
const FONT_FAMILY_PREFIX = 'family';
const GF_SUFFIX = '_GF_';

const getFontName = (fontKey: string) => (fontKey.split(':')[0] || fontKey).replaceAll(GF_SUFFIX, '');

const generateTailwindcssConfigFontStyles = (links: string[]) =>
  Object.fromEntries(links.map(link => [`${getFontName(link).toLowerCase().replaceAll(' ', '-')}`, getFontName(link)]));

const generateTailwindcssConfigCustomFont = (customFontKeys: string[]) =>
  Object.fromEntries(customFontKeys.map(customFontKey => [customFontKey, `var(--font-${customFontKey})`]));

export const buildFontsStyle = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Fonts);

  const fontStylesResponse = await fetch(`${getIntegrationAPIURL('getFontStyles')}`, { cache: 'no-cache' });

  if (!fontStylesResponse.ok) {
    throw `${fontStylesResponse.status} ${fontStylesResponse.statusText}`;
  }
  const fetchedFontStyles = await fontStylesResponse.text();

  const customFontKeysResponse = await fetch(`${getIntegrationAPIURL('getCustomFontKeys')}`, { cache: 'no-cache' });

  if (!customFontKeysResponse.ok) {
    throw `${customFontKeysResponse.status} ${customFontKeysResponse.statusText}`;
  }
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

  const fontsCssPath = path.resolve(...getStylesPath(), `${TOKEN_FILE.Fonts}.css`);
  fs.writeFileSync(fontsCssPath, fetchedFontStyles, 'utf8');

  syncSuccessLog(TOKEN_FILE.Fonts, 'pulled');
};
