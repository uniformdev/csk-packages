import fs from 'fs';
import { CONFIGURATION_KEYS, PATH_TO_CONFIG_FOLDER } from '../../constants';
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

  //remove old file if it exists
  const oldAllowedGroupsPath = `${PATH_TO_CONFIG_FOLDER}/${CONFIGURATION_KEYS.AllowedGroups}.json`;
  if (fs.existsSync(oldAllowedGroupsPath)) {
    fs.unlinkSync(oldAllowedGroupsPath);
  }

  syncSuccessLog(CONFIGURATION_KEYS.AllowedGroups, 'pulled');
};
