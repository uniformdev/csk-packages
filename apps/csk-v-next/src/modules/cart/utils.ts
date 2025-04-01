import { flattenValues } from '@uniformdev/canvas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformEntry = (data: any): Record<string, any> => {
  if (data?.entry) {
    return transformEntry(flattenValues(data.entry, { levels: 3 }));
  }

  if (data?.fields) {
    return transformEntry(data.fields);
  }

  if (Array.isArray(data)) {
    return data.map(item => transformEntry(item));
  }

  if (typeof data === 'object' && data !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = transformEntry(value);
    }
    return result;
  }

  return data;
};
