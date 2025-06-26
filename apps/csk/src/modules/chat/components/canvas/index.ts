import { ComponentMapping } from '@uniformdev/csk-components/utils/createComponentResolver';
import AiAssistant from './AiAssistant';
import AiConfiguration from './AiConfiguration';
import AssistantScrollSection from './AssistantScrollSection';

export const aiAssistantComponentsMapping: ComponentMapping = {
  aiAssistant: { component: AiAssistant },
  aiConfiguration: { component: AiConfiguration },
  assistantScrollSection: { component: AssistantScrollSection },
};
