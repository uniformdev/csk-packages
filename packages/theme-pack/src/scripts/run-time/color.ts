import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getTokenStyles } from '../../utils';

export const getColors = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Colors)) return;

  const colorsResponse = await fetchTokenValue('getColors');
  const colors = await colorsResponse.json();

  return getTokenStyles(colors);
};
