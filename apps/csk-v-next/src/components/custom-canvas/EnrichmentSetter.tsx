'use client';

import { FC, useEffect, useMemo } from 'react';
import { DataWithProperties, flattenValues } from '@uniformdev/canvas';
import { ComponentProps } from '@uniformdev/canvas-next-rsc/component';
import { useUniformContext } from '@uniformdev/canvas-next-rsc-client';

type Enrichment = { cat: string; key: string; str: string };

export type EnrichmentSetterParameters = {
  enrichments?: DataWithProperties;
};

export type EnrichmentSetterProps = ComponentProps<EnrichmentSetterParameters>;

const EnrichmentSetter: FC<EnrichmentSetterProps> = ({ enrichments, context: { searchParams } }) => {
  const isPreviewMode = searchParams?.is_incontext_editing_mode === 'true';
  const { context } = useUniformContext();

  const enrichmentValues = useMemo(() => (flattenValues(enrichments) as unknown as Enrichment[]) || [], [enrichments]);

  useEffect(() => {
    if (isPreviewMode) return;

    context?.update({
      enrichments: enrichmentValues.map(enrichment => ({
        ...enrichment,
        str: Number(enrichment.str),
      })),
    });
  }, [context, enrichmentValues, enrichments, isPreviewMode]);

  return null;
};

export default EnrichmentSetter;
