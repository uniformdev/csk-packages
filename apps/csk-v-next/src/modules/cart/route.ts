import { ContentClient, flattenValues } from '@uniformdev/canvas';
import { transformEntry } from './utils';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const productSlugs = searchParams.getAll('productSlugs');

  if (!productSlugs || productSlugs.length === 0) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const contentClient = new ContentClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
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
