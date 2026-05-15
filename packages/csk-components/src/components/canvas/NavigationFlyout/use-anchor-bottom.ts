import { RefObject, useEffect, useState } from 'react';

export const useAnchorBottom = (ref: RefObject<HTMLElement | null>) => {
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const update = () => {
      const nav = ref.current?.closest('nav');
      if (nav) setBottom(nav.getBoundingClientRect().bottom);
    };

    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [ref]);

  return bottom;
};
