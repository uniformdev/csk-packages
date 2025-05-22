import { notFound } from 'next/navigation';
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { UniformComposition } from '@uniformdev/canvas-next-rsc';
import { componentResolver } from '@/components';
import getCompositionByVersionId from '@/utils/getCompositionByVersionId';

type PageParameters = {
  params: Promise<{
    compositionId?: string;
  }>;
  searchParams: Promise<{ versionId?: string; isDraft?: string; secret?: string }>;
};

const Page = async (props: PageParameters) => {
  const searchParams = await props.searchParams;
  const { compositionId } = await props.params;
  const { versionId, isDraft, secret } = searchParams;

  if (!versionId || !compositionId || secret !== process.env.UNIFORM_PREVIEW_SECRET) return notFound();

  const state = isDraft ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE;

  const composition = await getCompositionByVersionId({
    compositionId,
    versionId,
    state,
    locale: 'en',
  });

  return (
    <UniformComposition
      {...props}
      params={Promise.resolve({ path: compositionId, locale: 'en' })}
      route={{
        type: 'composition',
        matchedRoute: '',
        compositionApiResponse: {
          composition,
          projectId: '',
          state,
          created: '',
          modified: '',
          pattern: false,
        },
      }}
      resolveComponent={componentResolver}
      mode="server"
    />
  );
};

export const fetchCache = 'force-cache';

export default Page;
