import fs from 'node:fs';
import path from 'node:path';
import { CONFIGURATION_KEYS, DEFAULT_CONFIG_FILE_PATH } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';

export const pushAllowedGroups = async () => {
  checkEnvironmentVariable(true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const allowedGroups = configuration[CONFIGURATION_KEYS.AllowedGroups];

  if (!allowedGroups) {
    console.error(`No colors found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  await pushTokenValue('setAllowedGroups', JSON.stringify(allowedGroups));

  syncSuccessLog(CONFIGURATION_KEYS.AllowedGroups, 'pushed');
};
