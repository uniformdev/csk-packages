import { CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildFontsStyle = async () => {
  if (!checkEnvironmentVariable()) return;

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
    [CONFIGURATION_KEYS.Fonts]: fetchedFonts,
    [CONFIGURATION_KEYS.DefaultFontKey]: fetchedDefaultFontKey,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Fonts, 'pulled');
};
