import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';

import AnchorLinks from './AnchorLinks';
import ComponentDetailsPage from './ComponentDetailsPage';
import DemoCard from './DemoCard';
import Filter from './Filter';
import filterSortMapping from './FilterSearch';
import HeroGradient from './HeroGradient';
import RecipeListWrapper from './RecipeList/RecipeListWrapper';
import TemplateCard from './TemplateCard';
import TemplatePreview from './TemplatePreview';

export const customComponentsMapping: ComponentMapping = {
  ...filterSortMapping,
  demoCard: { component: DemoCard },
  templateCard: { component: TemplateCard },
  templatePreview: { component: TemplatePreview },
  componentDetailsPage: { component: ComponentDetailsPage },
  anchorLinks: { component: AnchorLinks },
  heroGradient: { component: HeroGradient },
  recipeList: { component: RecipeListWrapper },
  filter: { component: Filter },
};
