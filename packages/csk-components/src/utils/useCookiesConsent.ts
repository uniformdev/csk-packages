import { useCallback, useMemo } from 'react';
import { useUniformContext } from '@uniformdev/canvas-next-rsc-client-v2';

const useCookiesConsent = () => {
  const { context } = useUniformContext();

  const consent = useMemo(() => context?.storage?.data?.consent, [context?.storage?.data?.consent]);

  const updateConsent = useCallback(
    (value: boolean) => context?.storage.updateData([{ type: 'consent', data: value }]),
    [context?.storage]
  );

  return { consent, updateConsent };
};

export default useCookiesConsent;
