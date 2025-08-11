import { CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildAllowedGroups = async () => {
  if (!checkEnvironmentVariable()) return;

  const response = await fetchTokenValue('getAllowedGroups');

  const fetchedAllowedGroups = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.AllowedGroups]: fetchedAllowedGroups || {},
  });

  syncSuccessLog(CONFIGURATION_KEYS.AllowedGroups, 'pulled');
};
