import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_CONFIG_FOLDER, TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushAllowedGroups = async () => {
  checkEnvironmentVariable(TOKEN_STYLE_FILE.AllowedGroups, true);

  const pathToStyleFile = path.join(PATH_TO_CONFIG_FOLDER, `${TOKEN_STYLE_FILE.AllowedGroups}.json`);

  if (!fs.existsSync(pathToStyleFile)) {
    console.error(`No such file with groups configuration: ${pathToStyleFile}`);
    return;
  }

  const allowedGroupsConfig = JSON.parse(fs.readFileSync(path.resolve(pathToStyleFile), 'utf8'));

  await pushTokenValue('setAllowedGroups', JSON.stringify(allowedGroupsConfig), IS_CANARY_ENVIRONMENT);

  syncSuccessLog(TOKEN_STYLE_FILE.AllowedGroups, 'pushed');
};
