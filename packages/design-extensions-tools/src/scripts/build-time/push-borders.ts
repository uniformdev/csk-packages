import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_CONFIG_FILE_PATH, CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, parseJson, pushTokenValue, syncSuccessLog } from '../../utils';
import { validateBordersConfiguration } from '../../utils/validation';

export const pushBorders = async () => {
  checkEnvironmentVariable(true);

  if (!fs.existsSync(DEFAULT_CONFIG_FILE_PATH)) {
    console.error(
      `No such file with styles: ${DEFAULT_CONFIG_FILE_PATH}. You can override it by setting DEX_CONFIG_FILE_PATH environment variable.`
    );
    return;
  }

  const configurationContent = fs.readFileSync(path.resolve(DEFAULT_CONFIG_FILE_PATH), 'utf8');

  const configuration = parseJson(configurationContent);

  const borders = configuration[CONFIGURATION_KEYS.Borders];

  if (!borders) {
    console.error(`No borders found in ${DEFAULT_CONFIG_FILE_PATH}`);
    return;
  }

  const { isValid, error } = validateBordersConfiguration(borders);

  if (!isValid) {
    throw new Error(error);
  }

  await pushTokenValue('setBorders', JSON.stringify(borders));

  syncSuccessLog(CONFIGURATION_KEYS.Borders, 'pushed');
};
