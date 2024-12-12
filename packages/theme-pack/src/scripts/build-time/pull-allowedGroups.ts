import fs from 'node:fs';
import path from 'node:path';
import { PATH_TO_CONFIG_FOLDER, CONFIG_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';

export const buildAllowedGroups = async () => {
  if (!checkEnvironmentVariable(CONFIG_FILE.AllowedGroups)) return;

  if (!fs.existsSync(PATH_TO_CONFIG_FOLDER)) {
    console.error(
      `No such directory for config files: ${PATH_TO_CONFIG_FOLDER}. You can override it by setting CONFIG_PATH environment variable.`
    );
    return;
  }

  const response = await fetchTokenValue('getAllowedGroups');

  const fetchedAllowedGroups = await response.json();

  const allowedGroupsPath = path.resolve(PATH_TO_CONFIG_FOLDER, `${CONFIG_FILE.AllowedGroups}.json`);

  fs.writeFileSync(allowedGroupsPath, JSON.stringify(fetchedAllowedGroups, null, 2), 'utf8');

  syncSuccessLog(CONFIG_FILE.AllowedGroups, 'pulled');
};
