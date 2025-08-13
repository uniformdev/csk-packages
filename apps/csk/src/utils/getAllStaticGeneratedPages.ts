import { getProjectMapClient } from '@uniformdev/canvas-next-rsc-v2';
import locales from '@/i18n/locales.json';

const getAllStaticGeneratedPages = async () => {
  const projectMapNodes = await getProjectMapClient({
    cache: {
      type: 'default',
    },
  })
    .getNodes({ tree: false })
    .then(({ nodes }) => nodes);

  const preparedPaths =
    projectMapNodes?.map(({ path }) => {
      if (path.includes(':locale')) {
        return locales.locales.map(locale => path.replace(':locale', locale));
      }
      return path;
    }) ?? [];

  return preparedPaths.flat();
};

export default getAllStaticGeneratedPages;
