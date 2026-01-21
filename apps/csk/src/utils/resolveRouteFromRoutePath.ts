import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { serializeEvaluationResult } from '@uniformdev/next-app-router-shared';

import { resolveRouteFromCode } from '@uniformdev/next-app-router';

const resolveRouteFromRoutePath = async (routePath: string, isPreviewMode: boolean = false) => {
  const code = serializeEvaluationResult({
    payload: {
      compositionState: isPreviewMode ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
      routePath: routePath,
      keys: undefined,
      components: {},
      releaseId: undefined,
      rules: undefined,
      defaultConsent: undefined,
      previewMode: undefined,
      locale: undefined,
    },
  });

  return await resolveRouteFromCode({
    code,
  });
};

export default resolveRouteFromRoutePath;
