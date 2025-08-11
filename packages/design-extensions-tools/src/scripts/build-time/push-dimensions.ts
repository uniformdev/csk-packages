import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';
import { validateDimensionsConfiguration } from '../../utils/validation';

export const pushDimensions = async () => {
  checkEnvironmentVariable(true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const dimensions = configuration[CONFIGURATION_KEYS.Dimensions];

  if (!dimensions) {
    console.error(`No dimensions found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  const { isValid, error } = validateDimensionsConfiguration(dimensions);

  if (!isValid) {
    throw new Error(error);
  }

  await pushTokenValue('setDimensions', JSON.stringify(dimensions));

  syncSuccessLog(CONFIGURATION_KEYS.Dimensions, 'pushed');
};
