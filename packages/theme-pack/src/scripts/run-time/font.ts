import { TOKEN_STYLE_FILE } from '../../constants';
import { checkEnvironmentVariable, fetchTokenValue } from '../../utils';

export const getDefaultFont = async (): Promise<string | null> => {
  if (!checkEnvironmentVariable(TOKEN_STYLE_FILE.Fonts)) return null;

  const defaultFontResponse = await fetchTokenValue('getDefaultFont');
  const { defaultFont = '' } = await defaultFontResponse.json();

  return defaultFont || null;
};
