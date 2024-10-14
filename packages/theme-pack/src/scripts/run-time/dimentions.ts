import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue, getTokenStyles } from '../../utils';

export const getDimensions = async () => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Dimensions)) return;

  const dimensionsResponse = await fetchTokenValue('getDimensions');
  const dimensions = await dimensionsResponse.json();

  return getTokenStyles(dimensions);
};
