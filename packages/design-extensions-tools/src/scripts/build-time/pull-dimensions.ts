import { CONFIGURATION_KEYS } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildDimensions = async () => {
  if (!checkEnvironmentVariable()) return;

  const response = await fetchTokenValue('getDimensions');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedDimensions = await response.json();

  addToConfiguration({
    dimensions: fetchedDimensions,
  });

  syncSuccessLog(CONFIGURATION_KEYS.Dimensions, 'pulled');
};
