import { UniformSlot, ComponentProps } from '@uniformdev/canvas-next-rsc/component';

enum ModalPageSlots {
  modalPageContent = 'modalPageContent',
}

type ModalPageProps = ComponentProps<unknown, ModalPageSlots>;

const ModalPage = ({ context, slots, component }: ModalPageProps) => {
  const isContextualEditing = context?.isContextualEditing;

  const content = <UniformSlot context={context} slot={slots.modalPageContent} data={component} />;

  return isContextualEditing ? (
    <div className="bg-white w-full h-full">
      <div className="fixed left-0 top-0 size-full">
        <dialog
          open
          aria-label="Close modal"
          aria-modal="true"
          className="flex size-full items-center justify-center bg-black/50 px-4"
        >
          <form method="dialog" className="relative w-3xl rounded-lg bg-white shadow-lg">
            <div className="p-6 md:p-8">{content}</div>
          </form>
        </dialog>
      </div>
    </div>
  ) : (
    <div>{content}</div>
  );
};

export default ModalPage;
