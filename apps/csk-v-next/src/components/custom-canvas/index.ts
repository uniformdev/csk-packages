import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import Button from './Button';
import Container from './Container';
import Countdown from './Countdown';
import Footer from './Footer';
import Grid from './Grid';
import Header from './Header';
import HubspotForm from './HubspotForm';
import Section from './Section';
import Spacer from './Spacer';
import Text from './Text';
// Here, you can add your own component or customize an existing CSK component with your logic or styles.
export const customComponentsMapping: ComponentMapping = {
  // This is a simple example of how you can add your own components.
  header: { component: Header },
  text: { component: Text },
  button: { component: Button },
  section: { component: Section },
  container: { component: Container },
  countdown: { component: Countdown },
  grid: { component: Grid },
  footer: { component: Footer },
  spacer: { component: Spacer },
  hubspotForm: { component: HubspotForm },
};
