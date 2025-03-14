import { useCallback, useEffect, useState } from 'react';

const useUserStartInteractions = (): boolean => {
  const [isUserInteractionStarted, setIsUserInteractionStarted] = useState(false);

  const listener = useCallback(() => setIsUserInteractionStarted(true), []);

  useEffect(() => {
    if (isUserInteractionStarted) return;
    window.addEventListener('mousemove', listener, { passive: true, once: true });
    window.addEventListener('touchmove', listener, { passive: true, once: true });

    const id = setTimeout(() => {
      listener();
      window.removeEventListener('mousemove', listener);
      window.removeEventListener('touchmove', listener);
    }, 5000);

    return () => {
      clearTimeout(id);
      window.removeEventListener('mousemove', listener);
      window.removeEventListener('touchmove', listener);
    };
  }, [isUserInteractionStarted, listener]);

  return isUserInteractionStarted;
};

export default useUserStartInteractions;
