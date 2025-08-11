import { CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildFontsStyle = async (connectionOptions: ConnectionOptions) => {
  if (!checkEnvironmentVariable()) return;
  if (!checkConnectionOptions(connectionOptions)) return;

  const fontsResponse = await fetchTokenValue('getFonts', connectionOptions);

  if (!fontsResponse.ok) {
    throw `${fontsResponse.status} ${fontsResponse.statusText}`;
  }

  const defaultFontKeyResponse = await fetchTokenValue('getDefaultFont', connectionOptions);

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
