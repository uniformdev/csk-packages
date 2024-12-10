import { DEFAULT_INTEGRATION_URL, FG_GREEN, TOKEN_STYLE_FILE } from '../constants';

export {
  generateTailwindcssColorKeysPattern,
  generateTailwindcssDimensionKeysPattern,
  generateTailwindcssBorderKeysPattern,
  generateTailwindcssFontKeysPattern,
} from '../utils/generateTailwindcssPatterns';

export { getTokenStyles, getRootSimpleTokensValue, getRootBordersValue } from '../utils/getTokenStyles';

export const checkEnvironmentVariable = (tokenFile: string, isForce: boolean = false) => {
  if (!isForce && process.env.DEV_MODE === 'true') {
    console.info(`Skip fetch ${tokenFile} from integration in dev mode`);
    return false;
  }

  if (!process.env.UNIFORM_PROJECT_ID) {
    throw new Error('No project id provided');
  }
  return true;
};

export const fetchTokenValue = (endPoint: string, ...queryParams: string[]) =>
  fetch(
    `${process.env.INTEGRATION_URL || DEFAULT_INTEGRATION_URL}/api/${endPoint}?projectId=${process.env.UNIFORM_PROJECT_ID}${queryParams.length ? `&${queryParams.join('&')}` : ''}`,
    { cache: 'no-cache' }
  ).then(response => {
    if (!response.ok) {
      throw `${response.status} ${response.statusText}`;
    }
    if (response.status === 204) {
      throw `${response.status} ${response.statusText}: It looks like the current token configuration hasn't been set up yet.`;
    }
    return response;
  });

export const pushTokenValue = (endPoint: string, body?: BodyInit | null, isCanary = false) =>
  fetch(
    `${process.env.INTEGRATION_URL || DEFAULT_INTEGRATION_URL}/api/${endPoint}?projectId=${process.env.UNIFORM_PROJECT_ID}${isCanary ? `&env=canary` : ''}`,
    {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'x-api-key': process.env.UNIFORM_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body,
    }
  ).then(response => {
    if (!response.ok) {
      throw `${response.status} ${response.statusText}`;
    }
    return response;
  });

export const syncSuccessLog = (token: TOKEN_STYLE_FILE, mode: 'pushed' | 'pulled') => {
  console.info(FG_GREEN, `The ${token} configuration was successfully ${mode}`);
};
