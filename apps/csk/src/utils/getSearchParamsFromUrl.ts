const getSearchParamsFromUrl = (urlString: string): Record<string, string | string[]> => {
  if (!urlString) {
    return {};
  }

  const url = new URL(urlString);
  const params: Record<string, string | string[]> = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (params[key]) {
      params[key] = Array.isArray(params[key]) ? [...(params[key] as string[]), value] : [params[key] as string, value];
    } else {
      params[key] = value;
    }
  }

  return params;
};

export default getSearchParamsFromUrl;
