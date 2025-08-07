import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildFontsStyle = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return;

  const fontsResponse = await fetchTokenValue('getFonts');

  if (!fontsResponse.ok) {
    throw `${fontsResponse.status} ${fontsResponse.statusText}`;
  }

  const defaultFontKeyResponse = await fetchTokenValue('getDefaultFont');

  if (!defaultFontKeyResponse.ok) {
    throw `${defaultFontKeyResponse.status} ${defaultFontKeyResponse.statusText}`;
  }

  const fetchedFonts = await fontsResponse.json();
  const fetchedDefaultFontKey = await defaultFontKeyResponse.text();

  addToConfiguration({
    fonts: fetchedFonts,
    defaultFontKey: fetchedDefaultFontKey,
  });

  syncSuccessLog(TOKEN_STYLE_FILE.Fonts, 'pulled');
};
