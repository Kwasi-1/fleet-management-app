import { Icon } from "@iconify/react";
import ModalLayout from "@/layouts/ModalLayout";
import { useState, useEffect, useCallback } from "react";
import { RadioGroup, RadioOption } from "@/components/common/RadioGroup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import Textarea from "@/components/common/Textarea";

const options: RadioOption[] = [
  { label: "Damage", value: "damage" },
  { label: "Expire", value: "expire" },
  { label: "Misplacement", value: "misplacement" },
  { label: "Thief", value: "thief" },
  { label: "Stocktake Variance", value: "stock_variance" },
  { label: "Custom", value: "custom" },
];

const adjustmentOptions: RadioOption[] = [
  { label: "Quantity Adjustment", value: "quantity" },
  { label: "Value Adjustment", value: "value" },
];

function AdjustmentReasons({
  selectedReason,
  setSelectedReason,
  error,
}: {
  selectedReason: string;
  setSelectedReason: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <h3 className="mb-1 text-[14px] font-thin text-[#929292] capitalize">
        Adjustment Reason
      </h3>
      <RadioGroup
        options={options}
        value={selectedReason}
        onChange={setSelectedReason}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const stockHistory = [
  { date: "10 Jun 2024", qty: 10, user: "Bagus Fikri" },
  { date: "09 Jun 2024", qty: 17, user: "Bagus Fikri" },
  { date: "08 Jun 2024", qty: 28, user: "Bagus Fikri" },
  { date: "07 Jun 2024", qty: 35, user: "Bagus Fikri" },
];

const TimelineItem = ({
  entry,
  isLast,
}: {
  entry: (typeof stockHistory)[0];
  isLast: boolean;
}) => (
  <li className="relative pl-6 pb-2">
    {!isLast && (
      <div className="absolute left-[5px] top-1 h-full w-px bg-gray-300"></div>
    )}
    <div className="absolute left-0 top-0 h-3 w-3 rounded-full bg-[#619B7D] border-2 border-white"></div>
    <div>
      <p className="font-[500] text-sm">{entry.date}</p>
      <p className="text-gray-500 font-[100] text-xs mt-1">
        Adjust Stock "{entry.qty} Unit"
      </p>
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <Icon icon="mdi:account-circle" className="mr-1 text-lg" />
        {entry.user}
      </div>
    </div>
  </li>
);

export default function AuditStockModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [adjustmentType, setAdjustmentType] = useState("quantity");
  const [formData, setFormData] = useState({
    physicalCount: "",
    available: "100", // Assuming this comes from inventory data
    discrepancy: "",
    note: "",
    adjustmentReason: "expire",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.physicalCount) {
      newErrors.physicalCount = "Physical count is required";
    } else if (isNaN(Number(formData.physicalCount))) {
      newErrors.physicalCount = "Must be a valid number";
    } else if (Number(formData.physicalCount) < 0) {
      newErrors.physicalCount = "Cannot be negative";
    }

    if (!formData.adjustmentReason) {
      newErrors.adjustmentReason = "Reason is required";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormValid(isValid);
    return isValid;
  }, [formData]);

  useEffect(() => {
    // Calculate discrepancy whenever physicalCount changes
    if (formData.physicalCount) {
      const physicalCount = Number(formData.physicalCount);
      const available = Number(formData.available);
      const discrepancy = available - physicalCount;
      setFormData((prev) => ({
        ...prev,
        discrepancy: discrepancy.toString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        discrepancy: "",
      }));
    }
  }, [formData.physicalCount, formData.available]);

  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formData, isSubmitted, validateForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReasonChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      adjustmentReason: value,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const isValid = validateForm();

    if (isValid) {
      // Submit logic here
      console.log("Form submitted:", formData);
      onClose();
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Stock"
      description="Effortlessly import products and update your inventory."
    >
      <div className="flex flex-col gap-10">
        <div className="flex h-full">
          {/* Left Section */}
          <div className="w-2/3 px-6 py-3 space-y-6">
            <div>
              <h3 className="px-1 text-[14px] font-thin text-[#929292] capitalize mb-2">
                Adjustment Type
              </h3>
              <div className="flex gap-4">
                <RadioGroup
                  options={adjustmentOptions}
                  value={adjustmentType}
                  onChange={setAdjustmentType}
                  className="grid-cols-2 w-full"
                  selectedClass="border-[#619B7D] text-[#619B7D] bg-white"
                  unselectedClass="border-gray-300 bg-white text-gray-600 hover:border-[#619B7D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="Physical Count"
                name="physicalCount"
                value={formData.physicalCount}
                onChange={handleInputChange}
                error={isSubmitted ? errors.physicalCount : undefined}
              />
              <InputField
                label="Available"
                name="available"
                value={formData.available}
                onChange={handleInputChange}
                disabled={true}
              />
              <InputField
                label="Discrepancy"
                name="discrepancy"
                value={formData.discrepancy}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>

            <AdjustmentReasons
              selectedReason={formData.adjustmentReason}
              setSelectedReason={handleReasonChange}
              error={isSubmitted ? errors.adjustmentReason : undefined}
            />

            <div>
              <Textarea
                id="note"
                label="Note"
                name="note"
                onChange={handleInputChange}
                value={formData.note}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 mt-1 focus:outline-none focus:ring-2 focus:ring-[#619B7D]"
                rows={4}
                placeholder="Evaluate if the damage is repairable or if the item needs to be written off."
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-1/3 bg-gray-50 border-l border-gray-200 p-6 space-y-6">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="font-[500] text-sm">
                  Macbook Pro 14 Inch 512GB M1 Pro
                </h2>
                <p className="text-xs text-gray-500">SKU: MAC-09485</p>
              </div>
            </div>

            <div>
              <h3 className="font-[500] text-sm text-gray-700 mb-3">
                Stock adjustment history
              </h3>
              <ul className="space-y-1">
                {stockHistory.map((entry, i) => (
                  <TimelineItem
                    key={i}
                    entry={entry}
                    isLast={i === stockHistory.length - 1}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t pt-4">
          <Button onClick={onClose} outline={true} className="min-w-[10rem]">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="min-w-[10rem] ml-4"
            disabled={!isFormValid && isSubmitted}
          >
            Save
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
