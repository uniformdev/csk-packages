import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';

import AnchorLinks from './AnchorLinks';
import ComponentDetailsPage from './ComponentDetailsPage';
//import DemoCard from './DemoCard';
import Filter from './Filter';
import filterSortMapping from './FilterSearch';
import HeroGradient from './HeroGradient';
import RecipeListWrapper from './RecipeList/RecipeListWrapper';
import TemplateCard from './TemplateCard';
import TemplatePreview from './TemplatePreview';

export const customComponentsMapping: ComponentMapping = {
  ...filterSortMapping,
  // TODO: Add demo card
  //demoCard: DemoCard,
  templateCard: TemplateCard,
  templatePreview: TemplatePreview,
  componentDetailsPage: ComponentDetailsPage,
  anchorLinks: AnchorLinks,
  heroGradient: HeroGradient,
  recipeList: RecipeListWrapper,
  filter: Filter,
};
