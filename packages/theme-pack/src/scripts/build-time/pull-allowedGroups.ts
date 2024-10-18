import fs from 'node:fs';
import path from 'node:path';
import { PATH_TO_CONFIG_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';

export const buildAllowedGroups = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.AllowedGroups)) return;

  if (!fs.existsSync(PATH_TO_CONFIG_FOLDER)) {
    console.error(`No such directory for config files: ${PATH_TO_CONFIG_FOLDER}`);
    return;
  }

  const response = await fetchTokenValue('getAllowedGroups');

  const fetchedAllowedGroups = await response.json();

  const allowedGroupsPath = path.resolve(PATH_TO_CONFIG_FOLDER, `${TOKEN_STYLE_FILE.AllowedGroups}.json`);

  fs.writeFileSync(allowedGroupsPath, JSON.stringify(fetchedAllowedGroups, null, 2), 'utf8');

  syncSuccessLog(TOKEN_STYLE_FILE.AllowedGroups, 'pulled');
};
