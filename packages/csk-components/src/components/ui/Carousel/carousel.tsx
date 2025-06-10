'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseContainer from '@/components/ui/Container';
import { cn, resolveViewPort } from '@/utils/styling';
import { CarouselProps } from '.';

export const Carousel: FC<CarouselProps> = ({
  countOfItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  itemsPerPage = '1',
  children,
  gapX,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPageNumber = Number(itemsPerPage);

  const [reCheckCarouselSlider, setReCheckCarouselSlider] = useState<boolean>(false);

  const totalCountOfItems = useMemo(() => {
    if (itemsPerPageNumber > 1) {
      return Math.ceil((countOfItems ?? 0) / itemsPerPageNumber);
    }
    return countOfItems ?? 0;
  }, [countOfItems, itemsPerPageNumber]);

  useEffect(() => {
    const handleResize = () => setReCheckCarouselSlider(prev => !prev);
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

  const renderSlides = () => {
    return children({
      className: cn('flex size-full items-center justify-center', {
        [resolveViewPort(gapX, 'px-{value}')]: gapX,
      }),
      style: { minWidth: itemsPerPageNumber > 1 ? `calc(${100 / itemsPerPageNumber}%)` : '100%' },
    });
  };

  return (
    <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div
        className={cn('relative', {
          [resolveViewPort(gapX, '-mx-{value}')]: gapX,
        })}
      >
        <div ref={container} className="flex overflow-x-hidden scroll-smooth">
          {renderSlides()}
        </div>
        {renderCarouselButtons()}
      </div>
    </BaseContainer>
  );
};
