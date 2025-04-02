import { ContentClient, flattenValues } from '@uniformdev/canvas';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformEntry = (data: any): Record<string, any> => {
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productSlugs = searchParams.getAll('productSlugs');

  if (!productSlugs || productSlugs.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const contentClient = new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
    apiHost: process.env.UNIFORM_CLI_BASE_URL!,
    edgeApiHost: process.env.UNIFORM_CLI_BASE_EDGE_URL!,
  });

  const { entries } = await contentClient.getEntries({
    filters: {
      slug: {
        in: productSlugs as string & string[],
      },
    },
    locale: 'en',
  });

  const products = entries.map(entryResponse => {
    const flattened = flattenValues(entryResponse.entry);

    if (!flattened) return null;

    return {
      ...transformEntry(flattened),
      slug: entryResponse.entry?._slug,
    };
  });

  return new Response(JSON.stringify(products), { status: 200 });
}
