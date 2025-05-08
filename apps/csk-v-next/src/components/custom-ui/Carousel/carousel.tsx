'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';
import BaseContainer from '@/components/ui/Container';
import { CarouselProps } from '.';

export const Carousel: FC<CarouselProps> = ({
  countOfItems,
  backgroundColor,
  spacing,
  border,
  fluidContent,
  iconColor,
  fullHeight,
  children,
  autoPlay,
  variant = 'default',
}) => {
  const container = useRef<HTMLInputElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reCheckCarouselSlider, setReCheckCarouselSlider] = useState<boolean>(false);

  const totalCountOfItems = (() => {
    if (countOfItems) return countOfItems;
    return Array.isArray(children) ? children.length : 1;
  })();

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev === totalCountOfItems - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, totalCountOfItems]);

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

  return (
    <BaseContainer {...{ backgroundColor, spacing, border, fluidContent, fullHeight }}>
      <div className="relative">
        <div ref={container} className="flex flex-row items-stretch overflow-x-hidden scroll-smooth">
          {children}
        </div>
        {variant !== 'brochure' && (
          <div
            className={cn('absolute inset-x-5 top-1/2 flex -translate-y-1/2 justify-between', {
              [`text-${iconColor}`]: !!iconColor,
            })}
          >
            <button onClick={handlerPreviousNextButton}>❮</button>
            <button onClick={handlerClickNextButton}>❯</button>
          </div>
        )}
        {variant === 'brochure' && (
          <div
            className={cn('absolute bottom-0 right-0 flex z-5', {
              [`text-${iconColor}`]: !!iconColor,
              [`bg-${backgroundColor}`]: !!backgroundColor,
            })}
          >
            <button onClick={handlerPreviousNextButton}>❮</button>
            <div className="flex flex-col px-4">
              {currentIndex + 1} of {totalCountOfItems}
            </div>
            <button onClick={handlerClickNextButton}>❯</button>
          </div>
        )}
      </div>
    </BaseContainer>
  );
};
