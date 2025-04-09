// components/order_management/FulfillmentModal.tsx
import DialogWrapper from "../common/DialogWrapper";
import { useState } from "react";
import InputField from "../common/InputField";

interface FulfillmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    trackingNumber: string;
    courier: string;
    note: string;
  }) => void;
}

export default function FulfillmentModal({
  open,
  onClose,
  onSubmit,
}: FulfillmentModalProps) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courier, setCourier] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    onSubmit({ trackingNumber, courier, note });
    onClose();
  };

  return (
    <DialogWrapper open={open} onClose={onClose} title="Create Fulfillment">
      <div className="space-y-4 mt-4">
        <InputField
          label="Tracking Number"
          placeholder="e.g. 123456789"
          value={trackingNumber}
          name="trackingNumber"
          onChange={(e) => setTrackingNumber(e.target.value)}
        />
        <InputField
          label="Courier"
          placeholder="e.g. DHL, FedEx"
          value={courier}
          name="courier"
          onChange={(e) => setCourier(e.target.value)}
        />
        <InputField
          label="Note (optional)"
          placeholder="e.g. Package left the warehouse"
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#619B7D] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#4c8267]"
        >
          Create Fulfillment
        </button>
      </div>
    </DialogWrapper>
  );
}
