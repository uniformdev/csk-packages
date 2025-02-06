'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { CarouselProps } from '.';

export const Carousel: FC<CarouselProps> = ({
  countOfItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  children,
}) => {
  const container = useRef<HTMLInputElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reCheckCarouselSlider, setReCheckCarouselSlider] = useState<boolean>(false);

  const totalCountOfItems = (() => {
    if (countOfItems) return countOfItems;
    return Array.isArray(children) ? children.length : 1;
  })();

  useEffect(() => {
    const handleResize = () => setReCheckCarouselSlider(prevState => !prevState);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (container.current) {
      const { clientWidth } = container.current;
      container.current.scrollLeft = currentIndex * clientWidth;
    }
  }, [currentIndex, reCheckCarouselSlider]);

  const handlerPreviousNextButton = useCallback(
    () => setCurrentIndex(prevState => (prevState === 0 ? totalCountOfItems - 1 : prevState - 1)),
    [totalCountOfItems]
  );

  const handlerClickNextButton = useCallback(
    () => setCurrentIndex(prevState => (totalCountOfItems - 1 === prevState ? 0 : prevState + 1)),
    [totalCountOfItems]
  );

  const renderCarouselButtons = useCallback(
    () => (
      <div
        className={cn('absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between', {
          [`text-${backgroundColor} invert`]: !!backgroundColor,
          'text-black dark:text-white': !backgroundColor,
        })}
      >
        <button onClick={handlerPreviousNextButton}>❮</button>
        <button onClick={handlerClickNextButton}>❯</button>
      </div>
    ),
    [backgroundColor, handlerClickNextButton, handlerPreviousNextButton]
  );

  return (
    <Container {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div className="relative">
        <div ref={container} className="flex flex-row items-center overflow-x-hidden scroll-smooth">
          {children}
        </div>
        {renderCarouselButtons()}
      </div>
    </Container>
  );
};
