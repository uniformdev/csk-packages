import { generateSitemap } from '@uniformdev/csk-components/utils/sitemap';
import localesConfig from '@/i18n/locales.json';
import { AI_ASSISTANT_CONFIGURATION_PLACEHOLDER } from '@/modules/chat/constants';
import { ContentType } from '@/types';
import contentClient from '@/utils/contentClient';

const SKIP_SITEMAP_URLS = ['/:locale/previews', AI_ASSISTANT_CONFIGURATION_PLACEHOLDER];

export const getAllEntrySlugs = ({
  offset = 0,
  limit = 50,
  entryType,
}: {
  offset?: number;
  limit?: number;
  entryType: string;
}): Promise<string[]> =>
  contentClient
    .getEntries({
      limit,
      offset,
      withTotalCount: true,
      skipDataResolution: true,
      skipPatternResolution: true,
      skipOverridesResolution: true,
      filters: {
        type: { eq: entryType },
      },
    })
    .then(async ({ entries, totalCount }) => {
      const newOffset = offset + limit;
      const slugs = entries.map(entry => entry.entry._slug || '').filter(Boolean);
      return newOffset <= (totalCount || 0)
        ? [...slugs, ...(await getAllEntrySlugs({ entryType, offset: newOffset }))]
        : slugs;
    })
    .catch(e => {
      console.error(e);
      return [];
    });

export default async function sitemap() {
  const baseUrl = process.env.BASE_URL ? `https://${process.env.BASE_URL}` : 'http://localhost:3000';
  const productSlugs = await getAllEntrySlugs({ entryType: ContentType.Product });
  const articleSlugs = await getAllEntrySlugs({ entryType: ContentType.Article });

  const skipUrls = SKIP_SITEMAP_URLS.reduce<string[]>((acc, skipUrl) => {
    if (skipUrl.includes(':locale')) {
      return acc.concat(localesConfig.locales.map(locale => `${baseUrl}${skipUrl.replace(':locale', locale)}`));
    }
    return acc.concat(`${baseUrl}${skipUrl}`);
  }, []);

  return generateSitemap(baseUrl, {
    locale: localesConfig.locales,
    'product-slug': productSlugs,
    'article-slug': articleSlugs,
  })().then(sitemap => sitemap.filter(item => !skipUrls.some(skipUrl => item.url.includes(skipUrl))));
}
