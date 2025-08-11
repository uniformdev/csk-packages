import { CONFIGURATION_KEYS } from '../../constants';
import { ConnectionOptions } from '../../types';
import { checkConnectionOptions, checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildAllowedGroups = async (connectionOptions: ConnectionOptions) => {
  if (!checkEnvironmentVariable()) return;
  if (!checkConnectionOptions(connectionOptions)) return;

  const response = await fetchTokenValue('getAllowedGroups', connectionOptions);

  const fetchedAllowedGroups = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.AllowedGroups]: fetchedAllowedGroups || {},
  });

  syncSuccessLog(CONFIGURATION_KEYS.AllowedGroups, 'pulled');
};
