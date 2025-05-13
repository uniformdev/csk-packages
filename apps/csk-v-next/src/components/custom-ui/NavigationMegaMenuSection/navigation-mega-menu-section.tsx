'use client';

import { FC, useState } from 'react';
import { flattenValues } from '@uniformdev/canvas';
import { UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { IconLabel as BaseIconLabel, Image as BaseImage, Grid } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';
import { NavigationMegaMenuSectionProps, FlattenedMegaMenuLink } from '.';

export const NavigationMegaMenuSection: FC<NavigationMegaMenuSectionProps> = ({
  items,
  size,
  tag,
  color,
  hoverColor,
  weight,
  font,
  transform,
  decoration,
  letterSpacing,
  alignment,
  context,
  slots,
  component,
}) => {
  const flattenedItems = flattenValues(items, { levels: 3 }) as FlattenedMegaMenuLink[];

  const [selectedFirstLevelIndex, setSelectedFirstLevelIndex] = useState<number>(0);
  const [selectedSecondLevelIndex, setSelectedSecondLevelIndex] = useState<number | undefined>(undefined);

  const secondLevelItems = flattenedItems?.[selectedFirstLevelIndex]?.children;

  const secondLevelSectionTitle = flattenedItems?.[selectedFirstLevelIndex]?.sectionTitle;

  const thirdLevelItems =
    selectedSecondLevelIndex === undefined ? undefined : secondLevelItems?.[selectedSecondLevelIndex]?.children;

  const thirdLevelSectionTitle =
    selectedSecondLevelIndex === undefined ? undefined : secondLevelItems?.[selectedSecondLevelIndex]?.sectionTitle;

  const onSelectFirstLevel = (index: number) => {
    setSelectedFirstLevelIndex(index);
    setSelectedSecondLevelIndex(undefined);
  };

  const onSelectSecondLevel = (index: number) => {
    setSelectedSecondLevelIndex(index);
  };

  return (
    <Grid columnsCount="4" gapX="8" fluidContent>
      <div
        className={cn('flex flex-col gap-y-2 border-r', {
          [`border-${hoverColor}`]: hoverColor,
        })}
      >
        {flattenedItems.map((item, index) => {
          const { url, title = '' } = item.icon?.[0] || {};
          const { url: hoverUrl, title: hoverTitle = '' } = item.hoverIcon?.[0] || {};
          const isActive = selectedFirstLevelIndex === index;

          const finalIcon = isActive ? hoverUrl : url;
          const finalTitle = isActive ? hoverTitle : title;
          return (
            <div
              className={cn('cursor-pointer py-1 border-b border-transparent', {
                [`border-${hoverColor}`]: hoverColor && isActive,
              })}
              key={index}
              onClick={() => onSelectFirstLevel(index)}
            >
              <BaseIconLabel
                textClassName={cn({ [`text-${hoverColor}`]: isActive })}
                icon={finalIcon && <BaseImage src={finalIcon} alt={finalTitle} fill />}
                {...{ size, tag, color, weight, font, transform, decoration, letterSpacing, alignment }}
              >
                {item.title}
              </BaseIconLabel>
            </div>
          );
        })}
      </div>
      <div
        className={cn('flex flex-col gap-y-2 border-r', {
          [`border-${hoverColor}`]: hoverColor,
        })}
      >
        {secondLevelSectionTitle && (
          <div
            className={cn('py-1 text-md font-extrabold', {
              [`text-${hoverColor}`]: hoverColor,
            })}
          >
            {secondLevelSectionTitle}
          </div>
        )}
        {secondLevelItems?.map((item, index) => {
          const { url, title = '' } = item.icon?.[0] || {};
          const { url: hoverUrl, title: hoverTitle = '' } = item.hoverIcon?.[0] || {};
          const isActive = selectedSecondLevelIndex === index;

          const finalIcon = isActive ? hoverUrl : url;
          const finalTitle = isActive ? hoverTitle : title;
          return (
            <div
              className={cn('cursor-pointer py-1 border-b border-transparent', {
                [`border-${hoverColor}`]: hoverColor && isActive,
              })}
              key={index}
              onClick={() => onSelectSecondLevel(index)}
            >
              <BaseIconLabel
                textClassName={cn({ [`text-${hoverColor}`]: isActive })}
                icon={finalIcon && <BaseImage src={finalIcon} alt={finalTitle} fill />}
                {...{ size, tag, color, weight, font, decoration, letterSpacing, alignment }}
              >
                {item.title}
              </BaseIconLabel>
            </div>
          );
        })}
      </div>
      <div
        className={cn('flex flex-col gap-y-2 border-r', {
          [`border-${hoverColor}`]: hoverColor,
        })}
      >
        {thirdLevelSectionTitle && (
          <div
            className={cn('py-1 text-md font-extrabold', {
              [`text-${hoverColor}`]: hoverColor,
            })}
          >
            {thirdLevelSectionTitle}
          </div>
        )}
        {thirdLevelItems?.map((item, index) => {
          const { url, title = '' } = item.icon?.[0] || {};
          const { url: hoverUrl, title: hoverTitle = '' } = item.hoverIcon?.[0] || {};
          const isActive = selectedSecondLevelIndex === index;

          const finalIcon = isActive ? hoverUrl : url;
          const finalTitle = isActive ? hoverTitle : title;
          return (
            <div className="cursor-pointer" key={index}>
              <BaseIconLabel
                textClassName={cn({ [`hover:text-${hoverColor}`]: hoverColor })}
                icon={finalIcon && <BaseImage src={finalIcon} alt={finalTitle} fill />}
                {...{ size, tag, color, weight, font, decoration, letterSpacing, alignment }}
              >
                {item.title}
              </BaseIconLabel>
            </div>
          );
        })}
      </div>

      <div>
        <UniformSlot context={context} slot={slots.rightContent} data={component} />
      </div>
    </Grid>
  );
};
