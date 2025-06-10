'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseContainer from '@/components/ui/Container';
import { cn } from '@/utils/styling';
import { CarouselProps } from '.';

// 16px - gap-x-4, we have to divide it by 2 because we have 2 gaps
const GAP_SIZE = 16;

export const Carousel: FC<CarouselProps> = ({
  countOfItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  fullHeight,
  itemsPerPage = '1',
  children,
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

  const totalGapSize = useMemo(() => {
    if (itemsPerPageNumber > 1) {
      const totalSize = GAP_SIZE * (itemsPerPageNumber - 1);

      return Math.ceil(totalSize / itemsPerPageNumber);
    }
    return 0;
  }, [itemsPerPageNumber]);

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
      className: 'flex size-full items-center justify-center',
      style: { minWidth: itemsPerPageNumber > 1 ? `calc(${100 / itemsPerPageNumber}% - ${totalGapSize}px)` : '100%' },
    });
  };

  return (
    <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div className="relative">
        <div
          ref={container}
          className={cn('flex overflow-x-hidden scroll-smooth', {
            'gap-x-4': itemsPerPageNumber > 1,
          })}
        >
          {renderSlides()}
        </div>
        {renderCarouselButtons()}
      </div>
    </BaseContainer>
  );
};
