import ModalLayout from "../../../layouts/ModalLayout";
import DeliveryNoteSection from "./DeliveryNoteSection";
import Button from "../../common/Button";

interface DeliveryNoteData {
  customerName: string;
  deliveryDate: string;
  pickupTime: string;
  sourceWarehouse: string;
  // Additional fields from your image
  postingDate: string;
  postingTime: string;
  isReturn: boolean;
}

const deliveryNoteData: DeliveryNoteData = {
  customerName: "Irene Agbeko",
  deliveryDate: "23-12-2024",
  pickupTime: "13:10:40",
  sourceWarehouse: "Nampo - C",
  postingDate: "23-12-2024",
  postingTime: "13:10:40",
  isReturn: false,
};

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
        {/* <div>

        </div> */}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Customer Name
            </p>
            <p className="text-sm text-gray-800">
              {deliveryNoteData.customerName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Delivery Date
            </p>
            <p className="text-sm text-gray-800">
              {deliveryNoteData.deliveryDate}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Posting Time
            </p>
            <p className="text-sm text-gray-800">
              {deliveryNoteData.postingTime}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Source Warehouse
            </p>
            <p className="text-sm text-gray-800">
              {deliveryNoteData.sourceWarehouse}
            </p>
          </div>
        </div>

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
