import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import CategoriesFilterBox from './CategoriesFilterBox';
import ComponentsSearchPage from './ComponentsSearchPage';
//import ResultList from './ResultList';
import SearchBox from './SearchBox';

const filterSortMapping: ComponentMapping = {
  searchBox: SearchBox,
  // TODO: Add result list
  // resultList: ResultList,
  categoriesFilterBox: CategoriesFilterBox,
  componentsSearchPage: ComponentsSearchPage,
};

export default filterSortMapping;
