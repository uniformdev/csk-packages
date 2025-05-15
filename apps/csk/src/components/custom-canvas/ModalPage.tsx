import { UniformSlot, ComponentProps } from '@uniformdev/canvas-next-rsc/component';

enum ModalPageSlots {
  modalPageContent = 'modalPageContent',
}

type ModalPageProps = ComponentProps<unknown, ModalPageSlots>;

const ModalPage = ({ context, slots, component }: ModalPageProps) => {
  return (
    <div>
      <UniformSlot context={context} slot={slots.modalPageContent} data={component}></UniformSlot>
    </div>
  );
};

export default ModalPage;
