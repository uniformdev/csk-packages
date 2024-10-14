import { TOKEN_FILE } from '../../constants';
import { checkEnvironmentVariable, getIntegrationAPIURL, getRootBordersValue, getTokensStyles } from '../../utils';

export const getBorders = async () => {
  checkEnvironmentVariable(TOKEN_FILE.Borders);
  const bordersResponse = await fetch(`${getIntegrationAPIURL('getBorders')}`, { cache: 'no-cache' });
  if (!bordersResponse.ok) {
    throw `Pull border configuration: ${bordersResponse.status} ${bordersResponse.statusText}`;
  }
  const borders = await bordersResponse.json();

  return getTokensStyles(borders, getRootBordersValue);
};
