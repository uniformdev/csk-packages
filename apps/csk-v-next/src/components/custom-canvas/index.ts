import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AccordionItem from './AccordionItem';
import AddToCardButton from './AddToCardButton';
import Button from './Button';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import Container from './Container';
import CustomComponent from './CustomComponent';
import DynamicRecommendations from './DynamicRecommendations';
import EntriesSearchBox from './EntriesSearchBox';
import EntriesSearchEngine from './EntriesSearchEngine';
import EntriesSearchFilters from './EntriesSearchFilters';
import EntriesSearchList from './EntriesSearchList';
import EntriesSearchPagination from './EntriesSearchPagination';
import Favorites from './Favorites';
import FavoritesIcon from './FavoritesIcon';
import FeaturedSection from './FeaturedSection';
import Flex from './Flex';
import FlexCard from './FlexCard';
import Grid from './Grid';
import GridItem from './GridItem';
import Input from './Input';
import ModalLayout from './ModalLayout';
import ProductCard from './ProductCard';
import QuantitySelector from './QuantitySelector';
import QuirkSelector from './QuirkSelector';
import ReadMore from './ReadMore';
import Recommendations from './Recommendations';
import RemoveButton from './RemoveButton';
import RichText from './RichText';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from './ShoppingCartIcon';
// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  customComponent: { component: CustomComponent },
  // This is an overridden CSK Container component.
  container: { component: Container },
  // Coffee Shop custom components
  accordionItem: { component: AccordionItem },
  addToCardButton: { component: AddToCardButton },
  button: { component: Button },
  completeCheckoutButton: { component: CompleteCheckoutButton },
  featuredSection: { component: FeaturedSection },
  flex: { component: Flex },
  flexCard: { component: FlexCard },
  grid: { component: Grid },
  gridItem: { component: GridItem },
  input: { component: Input },
  modalLayout: { component: ModalLayout },
  quantitySelector: { component: QuantitySelector },
  quirkSelector: { component: QuirkSelector },
  readMore: { component: ReadMore },
  recommendations: { component: Recommendations },
  removeButton: { component: RemoveButton },
  richText: { component: RichText },
  shoppingCart: { component: ShoppingCart },
  shoppingCartIcon: { component: ShoppingCartIcon },
  addToFavorites: { component: null },
  productCard: { component: ProductCard },
  favorites: { component: Favorites },
  favoritesIcon: { component: FavoritesIcon },
  entriesSearchEngine: { component: EntriesSearchEngine },
  entriesSearchBox: { component: EntriesSearchBox },
  entriesSearchFilters: { component: EntriesSearchFilters },
  entriesSearchList: { component: EntriesSearchList },
  entriesSearchPagination: { component: EntriesSearchPagination },
  dynamicRecommendations: { component: DynamicRecommendations },
};
