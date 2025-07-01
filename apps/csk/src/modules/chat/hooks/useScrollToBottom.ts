import { type RefObject, useEffect, useRef } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T | null>,
  RefObject<T | null>,
  () => void,
  boolean,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const isAutoScrollEnabled = useRef(true);

  const scrollToBottom = () => {
    const container = containerRef.current;
    const end = endRef.current;
    if (!container || !end) return;

    end.scrollIntoView({ behavior: 'smooth', block: 'end' });
    isAutoScrollEnabled.current = true;
  };

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

  return [containerRef, endRef, scrollToBottom, isAutoScrollEnabled.current];
}
