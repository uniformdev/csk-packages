import { CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildBorders = async (connectionOptions: ConnectionOptions) => {
  if (!checkEnvironmentVariable()) return;
  if (!checkConnectionOptions(connectionOptions)) return;

  const response = await fetchTokenValue('getBorders', connectionOptions);

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedBorders = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.Borders]: fetchedBorders,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Borders, 'pulled');
};
