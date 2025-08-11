import { CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildDimensions = async (connectionOptions: ConnectionOptions) => {
  if (!checkEnvironmentVariable()) return;
  if (!checkConnectionOptions(connectionOptions)) return;

  const response = await fetchTokenValue('getDimensions', connectionOptions);

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedDimensions = await response.json();

  addToConfiguration({
    dimensions: fetchedDimensions,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Dimensions, 'pulled');
};
