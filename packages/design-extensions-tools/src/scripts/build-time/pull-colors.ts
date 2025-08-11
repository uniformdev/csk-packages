import { CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildColors = async () => {
  if (!checkEnvironmentVariable()) return;

  const response = await fetchTokenValue('getColors');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedPalette = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.Colors]: fetchedPalette,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Colors, 'pulled');
};
