'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseContainer from '@/components/ui/Container';
import { cn, resolveViewPort } from '@/utils/styling';
import { CarouselProps, CarouselVariant } from '.';

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
  variant = CarouselVariant.DEFAULT,
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

  const renderCarouselButtons = () => {
    if (variant === CarouselVariant.BROCHURE) {
      return (
        <div className={cn('flex py-4 px-4 z-5 gap-x-4 justify-end items-center', {})}>
          <button onClick={handlerPreviousNextButton}>❮</button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalCountOfItems }).map((_, index) => (
              <button
                key={`slide-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={cn('h-2 rounded-full transition-all duration-300 size-2 opacity-50', {
                  'w-6 opacity-100': index === currentIndex,
                  [`bg-${backgroundColor} invert`]: !!backgroundColor,
                  'bg-black dark:bg-white': !backgroundColor,
                })}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={handlerClickNextButton}>❯</button>
        </div>
      );
    }
    if (variant === CarouselVariant.NUMERIC) {
      return (
        <div
          className={cn('flex py-4 px-4 z-5 gap-x-4 justify-end items-center', {
            [`text-${backgroundColor} invert`]: !!backgroundColor,
            'text-black dark:text-white': !backgroundColor,
          })}
        >
          <button onClick={handlerPreviousNextButton}>❮</button>
          <div className="flex flex-col px-2">
            {currentIndex + 1} of {totalCountOfItems}
          </div>
          <button onClick={handlerClickNextButton}>❯</button>
        </div>
      );
    }
    return (
      <div
        className={cn('absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between', {
          [`text-${backgroundColor} invert`]: !!backgroundColor,
          'text-black dark:text-white': !backgroundColor,
        })}
      >
        <button onClick={handlerPreviousNextButton}>❮</button>
        <button onClick={handlerClickNextButton}>❯</button>
      </div>
    );
  };

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
