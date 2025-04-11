import ModalLayout from "../../../layouts/ModalLayout";
import DeliveryNoteSection from "./DeliveryNoteSection";
import Button from "../../common/Button";

interface DeliveryNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

function DeliveryNotesModal({
  isOpen,
  onClose,
  onAccept,
}: DeliveryNotesModalProps) {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Delivery Note">
      <div className="p-4">
        <DeliveryNoteSection />

        <div className="flex justify-end gap-4 mt-6">
          <Button outline onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            Accept Delivery
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}

export default DeliveryNotesModal;
