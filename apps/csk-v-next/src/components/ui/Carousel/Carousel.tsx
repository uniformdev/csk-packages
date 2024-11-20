import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';
import { CarouselProps } from '.';
import Container from '../Container';

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
        className={cn('absolute inset-x-5 top-1/2 z-50 flex -translate-y-1/2 justify-between', {
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
        {renderCarouselButtons()}
        <div ref={container} className="flex flex-row items-center overflow-x-hidden scroll-smooth">
          {children}
        </div>
      </div>
    </Container>
  );
};
