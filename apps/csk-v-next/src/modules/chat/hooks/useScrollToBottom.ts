import { useEffect, useRef, type RefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [RefObject<T | null>, RefObject<T | null>] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const isAutoScrollEnabled = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (!container || !end) return;

    const THRESHOLD = 50;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight <= THRESHOLD;
      isAutoScrollEnabled.current = isAtBottom;
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    const observer = new MutationObserver(() => {
      if (isAutoScrollEnabled.current) {
        end.scrollIntoView({ behavior: 'instant', block: 'end' });
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return [containerRef, endRef];
}
