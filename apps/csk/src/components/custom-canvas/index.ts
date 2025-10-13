import { Page } from '@uniformdev/csk-components/components/canvas';
import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AccordionItem from './AccordionItem';
import AddToCardButton from './AddToCardButton';
import AddToFavorites from './AddToFavorites';
import Button from './Button';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import Container from './Container';
import CustomComponent from './CustomComponent';
import DynamicProductRecommendations from './DynamicProductRecommendations';
import Favorites from './Favorites';
import FavoritesIcon from './FavoritesIcon';
import FeaturedSection from './FeaturedSection';
import FlexCard from './FlexCard';
import FormattedPrice from './FormattedPrice';
import GridItem from './GridItem';
import Input from './Input';
import ModalLayout from './ModalLayout';
import QuantitySelector from './QuantitySelector';
import QuirkSelector from './QuirkSelector';
import ReadMore from './ReadMore';
import RemoveButton from './RemoveButton';
import RichText from './RichText';
import ShoppingCart from './ShoppingCart';
import ShoppingCartIcon from './ShoppingCartIcon';

// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  customComponent: CustomComponent,
  // This is an overridden CSK Container component.
  container: Container,
  accordionItem: AccordionItem,
  button: Button,
  featuredSection: FeaturedSection,
  richText: RichText,
  readMore: ReadMore,
  removeButton: RemoveButton,
  flexCard: FlexCard,
  gridItem: GridItem,
  input: Input,
  quantitySelector: QuantitySelector,
  modalLayout: ModalLayout,
  addToCardButton: AddToCardButton,
  addToFavorites: AddToFavorites,
  completeCheckoutButton: CompleteCheckoutButton,
  quirkSelector: QuirkSelector,
  shoppingCartIcon: ShoppingCartIcon,
  shoppingCart: ShoppingCart,
  favoritesIcon: FavoritesIcon,
  favorites: Favorites,
  dynamicProductRecommendations: DynamicProductRecommendations,
  formattedPrice: FormattedPrice,
  entryPreview: Page,

  // Search Engine block - not implemented for pages router mode
  entriesSearchEngine: () => null,
  // entriesSearchBox: EntriesSearchBox,
  // entriesSearchFilters: EntriesSearchFilters,
  // entriesSearchList: EntriesSearchList,
  // entriesSearchPagination: EntriesSearchPagination,
  // entriesSearchSorting: EntriesSearchSorting,
  // entriesSearchTotalAmount: EntriesSearchTotalAmount,
  // entriesSearchPageSize: EntriesSearchPageSize,
  // searchEnginePlaceholder: SearchEnginePlaceholder,

  // AI Assistant - not implemented for pages router mode
  aiAssistant: () => null,
  // aiConfiguration: AiConfiguration,
  // assistantScrollSection: AssistantScrollSection,
};
