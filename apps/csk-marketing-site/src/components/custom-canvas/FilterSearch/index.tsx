import dynamic from 'next/dynamic';
import { ComponentProps } from '@uniformdev/csk-components/types/cskTypes';
import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import { withSlotsDataValue } from '@uniformdev/csk-components/utils/withSlotsDataValue';
import CategoriesFilterBox from './CategoriesFilterBox';
import ComponentsSearchPage from './ComponentsSearchPage';
import SearchBox from './SearchBox';

export enum ResultListSlots {
  Items = 'items',
}
export type ResultListProps = ComponentProps<unknown, ResultListSlots>;
const ResultList = dynamic(() =>
  import('./ResultList').then(mod => withSlotsDataValue(mod.default, [ResultListSlots.Items]))
);

const filterSortMapping: ComponentMapping = {
  searchBox: SearchBox,
  resultList: ResultList,
  categoriesFilterBox: CategoriesFilterBox,
  componentsSearchPage: ComponentsSearchPage,
};

export default filterSortMapping;
