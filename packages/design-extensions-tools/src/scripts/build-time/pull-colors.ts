import { CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildColors = async (connectionOptions: ConnectionOptions) => {
  if (!checkEnvironmentVariable()) return;
  if (!checkConnectionOptions(connectionOptions)) return;

  const response = await fetchTokenValue('getColors', connectionOptions);

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedPalette = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.Colors]: fetchedPalette,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Colors, 'pulled');
};
