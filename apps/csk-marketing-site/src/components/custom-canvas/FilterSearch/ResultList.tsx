/* eslint-disable react/display-name */
'use client';

import { FC, Fragment, useEffect, useMemo } from 'react';
import { ComponentProps, UniformSlot, CustomSlotChildRenderFunc } from '@uniformdev/canvas-next-rsc/component';
import { Text } from '@uniformdev/csk-components/components/ui';
import { useUniformSearchFilterEngineContext } from './ComponentsSearchProvider';
import { SearchItemSkeleton } from './SearchItemSkeleton';

const itemRenderFunc =
  ({ isEven, isOdd, values }: { isEven?: boolean; isOdd?: boolean; values?: string[] }): CustomSlotChildRenderFunc =>
  ({ child, key, slotIndex, component }) =>
    ((isEven && !((slotIndex - 1) % 2)) || (isOdd && !!((slotIndex - 1) % 2))) &&
    (!values || values.includes((component.parameters?.title?.value as string) || '')) ? (
      <div key={key}>{child}</div>
    ) : (
      <Fragment key={key}></Fragment>
    );

export enum ResultListSlots {
  Items = 'items',
}
type ResultListProps = ComponentProps<unknown, ResultListSlots>;

const ResultList: FC<ResultListProps> = ({ component, context, slots }) => {
  const { result, search, isLoading, setAllowPatternIds, pageSize } = useUniformSearchFilterEngineContext();
  const values = useMemo(
    () => result?.map(({ composition }) => composition.parameters?.title?.value as string),
    [result]
  );

  const patterns = useMemo(() => {
    return component?.slots?.items?.map(({ _pattern }) => _pattern || '')?.filter(Boolean) || [];
  }, [component?.slots?.items]);

  useEffect(() => {
    setAllowPatternIds(patterns);
  }, [patterns, setAllowPatternIds]);

  const cardSkeleton = useMemo(
    () => [...Array(pageSize)].map((_, index) => <SearchItemSkeleton key={index} index={index} />),
    [pageSize]
  );

  if (!!values && !!search && !isLoading && !values.length) {
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
          <UniformSlot data={component} context={context} slot={slots.items}>
            {itemRenderFunc({ isEven: true, values: isLoading && !values?.length && !search ? undefined : values })}
          </UniformSlot>
        ) : (
          <>{cardSkeleton.slice(0, pageSize / 2)}</>
        )}
      </div>
      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
        {!isLoading ? (
          <UniformSlot data={component} context={context} slot={slots.items}>
            {itemRenderFunc({ isOdd: true, values: isLoading && !values?.length && !search ? undefined : values })}
          </UniformSlot>
        ) : (
          <>{cardSkeleton.slice((pageSize + 1) / 2)}</>
        )}
      </div>
    </div>
  );
};

export default ResultList;
