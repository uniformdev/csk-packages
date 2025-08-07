import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, syncSuccessLog } from '../../utils';
import addToConfiguration from '../../utils/addToConfiguration';

export const buildBorders = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders)) return;

  const response = await fetchTokenValue('getBorders');

  if (!response.ok) {
    throw `${response.status} ${response.statusText}`;
  }

  const fetchedBorders = await response.json();

  addToConfiguration({
    [TOKEN_STYLE_FILE.Borders]: fetchedBorders,
  });

  syncSuccessLog(TOKEN_STYLE_FILE.Borders, 'pulled');
};
