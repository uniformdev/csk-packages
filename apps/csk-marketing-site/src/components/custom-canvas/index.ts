import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';

import AnchorLinks from './AnchorLinks';
import ComponentDetailsPage from './ComponentDetailsPage';
import DemoCard from './DemoCard';
import Filter from './Filter';
import filterSortMapping from './FilterSearch';
import HeroGradient from './HeroGradient';
import RecipeList from './RecipeList';
import TemplateCard from './TemplateCard';
import TemplatePreview from './TemplatePreview';

export const customComponentsMapping: ComponentMapping = {
  ...filterSortMapping,
  demoCard: DemoCard,
  templateCard: TemplateCard,
  templatePreview: TemplatePreview,
  componentDetailsPage: ComponentDetailsPage,
  anchorLinks: AnchorLinks,
  heroGradient: HeroGradient,
  recipeList: RecipeList,
  filter: Filter,
};
