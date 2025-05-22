import { notFound } from 'next/navigation';
import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import CompositionDiffViewer from '@/components/custom-ui/CompositionDiffViewer';
import getCompositionByVersionId from '@/utils/getCompositionByVersionId';

type PageParameters = {
  params: Promise<{ compositionId: string }>;
  searchParams: Promise<{
    draftVersionId?: string;
    publishedVersionId?: string;
    secret?: string;
    latestVersionScreenshotUrl?: string;
    latestPublishedVersionScreenshotUrl?: string;
  }>;
};

const Page = async (props: PageParameters) => {
  const {
    draftVersionId,
    publishedVersionId,
    secret,
    latestVersionScreenshotUrl,
    latestPublishedVersionScreenshotUrl,
  } = await props.searchParams;
  const { compositionId } = await props.params;

  if (
    secret !== process.env.UNIFORM_PREVIEW_SECRET ||
    !draftVersionId ||
    !publishedVersionId ||
    !latestVersionScreenshotUrl ||
    !latestPublishedVersionScreenshotUrl
  )
    return notFound();

  const [draftVersion, publishedVersion] = await Promise.all([
    getCompositionByVersionId({
      compositionId,
      versionId: draftVersionId,
      state: CANVAS_DRAFT_STATE,
      locale: 'en',
    }),
    getCompositionByVersionId({
      compositionId,
      versionId: publishedVersionId,
      state: CANVAS_PUBLISHED_STATE,
      locale: 'en',
    }),
  ]);

  const draftVersionString = JSON.stringify(draftVersion, null, 2);
  const publishedVersionString = JSON.stringify(publishedVersion, null, 2);

  return (
    <CompositionDiffViewer
      draftVersion={draftVersionString}
      publishedVersion={publishedVersionString}
      draftVersionId={draftVersionId}
      publishedVersionId={publishedVersionId}
      latestVersionScreenshotUrl={latestVersionScreenshotUrl}
      latestPublishedVersionScreenshotUrl={latestPublishedVersionScreenshotUrl}
    />
  );
};

export default Page;
