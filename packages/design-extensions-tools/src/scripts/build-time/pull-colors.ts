import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildColors = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors)) return;

  const response = await fetchTokenValue('getColors');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedPalette = await response.json();

  addToConfiguration({
    [TOKEN_STYLE_FILE.Colors]: fetchedPalette,
  });

  syncSuccessLog(TOKEN_STYLE_FILE.Colors, 'pulled');
};
