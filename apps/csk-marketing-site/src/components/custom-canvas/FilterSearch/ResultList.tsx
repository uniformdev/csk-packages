'use client';

import { FC, Fragment, useEffect, useMemo } from 'react';
import { ComponentInstance } from '@uniformdev/canvas';
import { UniformSlot, UniformSlotProps } from '@uniformdev/canvas-next-rsc-v2/component';
import { Text } from '@uniformdev/csk-components/components/ui';
import { withFlattenParameters } from '@uniformdev/csk-components/utils/withFlattenParameters';
import { ResultListProps } from '.';
import { useUniformSearchFilterEngineContext } from './ComponentsSearchProvider';
import { SearchItemSkeleton } from './SearchItemSkeleton';

const itemRenderFunc = ({ isEven, isOdd }: { isEven?: boolean; isOdd?: boolean }): UniformSlotProps['children'] => {
  const RenderItem = ({ child, key, slotIndex }: Parameters<NonNullable<UniformSlotProps['children']>>[0]) =>
    (isEven && !((slotIndex - 1) % 2)) || (isOdd && !!((slotIndex - 1) % 2)) ? (
      <div key={key}>{child}</div>
    ) : (
      <Fragment key={key}></Fragment>
    );

  return RenderItem;
};
const ResultList: FC<ResultListProps & { slotData?: Record<string, ComponentInstance[]> }> = ({ slots, slotData }) => {
  const { result, search, isLoading, setAllowPatternIds, pageSize } = useUniformSearchFilterEngineContext();

  const patterns = useMemo(() => {
    return (
      slotData?.items
        ?.map(({ _id: id, _pattern: pattern }) => {
          return { id, pattern };
        })
        ?.filter(Boolean) || []
    );
  }, [slotData]);

  useEffect(() => {
    setAllowPatternIds(patterns.map(pattern => pattern.pattern || ''));
  }, [patterns, setAllowPatternIds]);

  const cardSkeleton = useMemo(
    () => [...Array(pageSize)].map((_, index) => <SearchItemSkeleton key={index} index={index} />),
    [pageSize]
  );

  const resultPatternsIds = useMemo(() => {
    return (
      result?.map(resultItem => patterns.find(pattern => pattern.pattern === resultItem.composition._id)?.id) || []
    );
  }, [patterns, result]);

  const itemsToRender = useMemo(() => {
    return resultPatternsIds.length
      ? {
          name: 'items',
          items: slots.items.items.filter(item => {
            return resultPatternsIds.includes(item?._id || '');
          }),
        }
      : slots.items;
  }, [resultPatternsIds, slots.items]);

  if (!!result && !!search && !isLoading && !result.length) {
    return (
      <div className="mt-32 text-center">
        <Text size="2xl" color="text-primary" font="outfit">
          Unfortunately, there are no components for this search query yet.
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        {!isLoading ? (
          <UniformSlot slot={itemsToRender}>{itemRenderFunc({ isEven: true })}</UniformSlot>
        ) : (
          <>{cardSkeleton.slice(0, pageSize / 2)}</>
        )}
      </div>
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        {!isLoading ? (
          <UniformSlot slot={itemsToRender}>{itemRenderFunc({ isOdd: true })}</UniformSlot>
        ) : (
          <>{cardSkeleton.slice((pageSize + 1) / 2)}</>
        )}
      </div>
    </div>
  );
};

export default withFlattenParameters(ResultList);
