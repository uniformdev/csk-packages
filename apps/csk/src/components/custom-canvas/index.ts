import { Page } from '@uniformdev/csk-components/components/canvas/serverClient';
import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AccordionItem from './AccordionItem';
import AddToCardButton from './AddToCardButton';
import AddToFavorites from './AddToFavorites';
import Button from './Button';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import CompositionModal from './CompositionModal';
import Container from './Container';
import CustomComponent from './CustomComponent';
import DynamicProductRecommendations from './DynamicProductRecommendations';
import EntriesSearchBox from './EntriesSearchBox';
import EntriesSearchEngine from './EntriesSearchEngine';
import SearchEnginePlaceholder from './EntriesSearchEngine/SearchEnginePlaceholder';
import EntriesSearchFilters from './EntriesSearchFilters';
import EntriesSearchList from './EntriesSearchList';
import EntriesSearchPageSize from './EntriesSearchPageSize';
import EntriesSearchPagination from './EntriesSearchPagination';
import EntriesSearchSorting from './EntriesSearchSorting';
import EntriesSearchTotalAmount from './EntriesSearchTotalAmount';
import Favorites from './Favorites/Favorites';
import FavoritesIcon from './FavoritesIcon';
import FeaturedSection from './FeaturedSection';
import FlexCard from './FlexCard';
import FormattedPrice from './FormattedPrice';
import GridItem from './GridItem';
import Input from './Input';
import Locale from './Locale';
import LocaleLink from './LocaleLink';
import ModalLayout from './ModalLayout';
import ModalPage from './ModalPage';
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
  entriesSearchEngine: EntriesSearchEngine,
  entriesSearchBox: EntriesSearchBox,
  entriesSearchFilters: EntriesSearchFilters,
  entriesSearchList: EntriesSearchList,
  entriesSearchPagination: EntriesSearchPagination,
  entriesSearchSorting: EntriesSearchSorting,
  entriesSearchTotalAmount: EntriesSearchTotalAmount,
  entriesSearchPageSize: EntriesSearchPageSize,
  dynamicProductRecommendations: DynamicProductRecommendations,
  formattedPrice: FormattedPrice,
  entryPreview: Page,
  searchEnginePlaceholder: SearchEnginePlaceholder,
  compositionModal: CompositionModal,
  locale: Locale,
  localeLink: LocaleLink,
  modalPage: ModalPage,
};
