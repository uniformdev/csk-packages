import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getRootBordersValue, getTokenStyles } from '../../utils';

export const getBorders = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Borders)) return;

  const bordersResponse = await fetchTokenValue('getBorders');
  const borders = await bordersResponse.json();

  return getTokenStyles(borders, getRootBordersValue);
};
