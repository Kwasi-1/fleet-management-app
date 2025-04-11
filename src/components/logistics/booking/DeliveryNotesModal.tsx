import ModalLayout from "../../../layouts/ModalLayout";
import DeliveryNoteSection from "./DeliveryNoteSection";

interface DeliveryNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function DeliveryNotesModal({ isOpen, onClose }: DeliveryNotesModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Sales Invoice">
      <div>
        <DeliveryNoteSection />

        <button>Accept</button>
      </div>
    </ModalLayout>
  );
}
export default DeliveryNotesModal;
