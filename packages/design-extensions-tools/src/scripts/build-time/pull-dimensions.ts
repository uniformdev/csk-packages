import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildDimensions = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions)) return;

  const response = await fetchTokenValue('getDimensions');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedDimensions = await response.json();

  addToConfiguration({
    dimensions: fetchedDimensions,
  });

  syncSuccessLog(TOKEN_STYLE_FILE.Dimensions, 'pulled');
};
