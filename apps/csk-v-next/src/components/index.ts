import createComponentResolver, { ComponentMapping } from '../utils/createComponentResolver';

const componentsMapping: ComponentMapping = {};

const componentResolver = createComponentResolver(componentsMapping);

export default componentResolver;
