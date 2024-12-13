import fs from 'node:fs';
import path from 'node:path';
import { IS_CANARY_ENVIRONMENT, PATH_TO_CONFIG_FOLDER, CONFIG_FILE } from '../../constants';
import { checkEnvironmentVariable, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushAllowedGroups = async () => {
  checkEnvironmentVariable(CONFIG_FILE.AllowedGroups, true);

  const pathToStyleFile = path.join(PATH_TO_CONFIG_FOLDER, `${CONFIG_FILE.AllowedGroups}.json`);

  if (!fs.existsSync(pathToStyleFile)) {
    await pushTokenValue('setAllowedGroups', JSON.stringify({}), IS_CANARY_ENVIRONMENT);
  } else {
    const allowedGroupsConfig = JSON.parse(fs.readFileSync(path.resolve(pathToStyleFile), 'utf8'));
    await pushTokenValue('setAllowedGroups', JSON.stringify(allowedGroupsConfig), IS_CANARY_ENVIRONMENT);
  }

  syncSuccessLog(CONFIG_FILE.AllowedGroups, 'pushed');
};
