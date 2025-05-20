import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import CategoriesFilterBox from './CategoriesFilterBox';
import ComponentsSearchPage from './ComponentsSearchPage';
import ResultList from './ResultList';
import SearchBox from './SearchBox';

const filterSortMapping: ComponentMapping = {
  searchBox: { component: SearchBox },
  resultList: { component: ResultList },
  categoriesFilterBox: { component: CategoriesFilterBox },
  componentsSearchPage: { component: ComponentsSearchPage },
};

export default filterSortMapping;
