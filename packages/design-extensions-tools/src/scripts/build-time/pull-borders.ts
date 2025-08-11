import { CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildBorders = async () => {
  if (!checkEnvironmentVariable()) return;

  const response = await fetchTokenValue('getBorders');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedBorders = await response.json();

  addToConfiguration({
    [CONFIGURATION_KEYS.Borders]: fetchedBorders,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Borders, 'pulled');
};
