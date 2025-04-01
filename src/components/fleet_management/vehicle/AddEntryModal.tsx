import { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";

// Define the structure of the formData state
interface FormData {
  asset: string;
  primaryMeter: string | number;
  meterDate: string;
}

// Define the props for AddMeterEntryModal
interface AddMeterEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMeterEntryModal: React.FC<AddMeterEntryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    asset: "1100 [2018 Toyota Prius]",
    primaryMeter: "",
    meterDate: new Date().toISOString().split("T")[0], // Default to today’s date
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Add Meter Entry">
      <div className="space-y-4 px-6 py-4">
        {/* Asset */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Asset
          </label>
          <input
            type="text"
            name="asset"
            value={formData.asset}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        {/* Primary Meter */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Meter
          </label>
          <div className="relative">
            <input
              type="number"
              name="primaryMeter"
              value={formData.primaryMeter}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter meter reading"
            />
            <span className="absolute right-3 top-2 text-gray-500">mi</span>
          </div>
          <p className="text-xs text-gray-500">
            Last updated: 20,811 mi (10 days ago)
          </p>
        </div>

        {/* Meter Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meter Date
          </label>
          <input
            type="date"
            name="meterDate"
            value={formData.meterDate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border bg-gray-50 border-gray-300 text-gray-400 rounded-md">
            Save and Add Another
          </button>
          <button className="px-4 py-2 bg-[#619B7D] text-white rounded-md">
            Save
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddMeterEntryModal;
