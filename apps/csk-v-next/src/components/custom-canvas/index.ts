import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AccordionItem from './AccordionItem';
import AddToCardButton from './AddToCardButton';
import Button from './Button';
import CompleteCheckoutButton from './CompleteCheckoutButton';
import Container from './Container';
import CustomComponent from './CustomComponent';
import FeaturedSection from './FeaturedSection';
import Flex from './Flex';
import FlexCard from './FlexCard';
import Grid from './Grid';
import GridItem from './GridItem';
import Input from './Input';
import ModalLayout from './ModalLayout';
import QuantitySelector from './QuantitySelector';
import QuirkSelector from './QuirkSelector';
import ReadMore from './ReadMore';
import RemoveButton from './RemoveButton';
import RichText from './RichText';

// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  customComponent: { component: CustomComponent },
  // This is an overridden CSK Container component.
  container: { component: Container },
  addToFavorites: { component: () => null },
  accordionItem: { component: AccordionItem },
  button: { component: Button },
  featuredSection: { component: FeaturedSection },
  richText: { component: RichText },
  readMore: { component: ReadMore },
  removeButton: { component: RemoveButton },
  grid: { component: Grid },
  flexCard: { component: FlexCard },
  flex: { component: Flex },
  gridItem: { component: GridItem },
  input: { component: Input },
  quantitySelector: { component: QuantitySelector },
  modalLayout: { component: ModalLayout },
  addToCardButton: { component: AddToCardButton },
  completeCheckoutButton: { component: CompleteCheckoutButton },
  quirkSelector: { component: QuirkSelector },
};
