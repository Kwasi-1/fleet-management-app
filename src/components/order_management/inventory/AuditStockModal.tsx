import { Icon } from "@iconify/react";
import ModalLayout from "@/layouts/ModalLayout";
import { useState } from "react";
import { RadioGroup, RadioOption } from "@/components/common/RadioGroup";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";

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

function AdjustmentReasons() {
  const [selectedReason, setSelectedReason] = useState("expire");

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Adjustment Reason</h3>
      <RadioGroup
        options={options}
        value={selectedReason}
        onChange={setSelectedReason}
      />
    </div>
  );
}

const stockHistory = [
  { date: "10 Jun 2024", qty: 10, user: "Bagus Fikri" },
  { date: "09 Jun 2024", qty: 17, user: "Bagus Fikri" },
  { date: "08 Jun 2024", qty: 28, user: "Bagus Fikri" },
  { date: "07 Jun 2024", qty: 35, user: "Bagus Fikri" },
];

export default function AuditStockModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [adjustmentType, setAdjustmentType] = useState("quantity");

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Stock"
      description="Effortlessly import products and update your inventory."
      // className="w-full max-w-4xl"
    >
      <div className="flex flex-col gap-10">
        <div className="flex hfull">
          {/* Left Section */}
          <div className="w-4/7 px-6 py-3 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Adjustment Type</h3>

              {/* Adjustment Type */}
              <div className="flex gap-4">
                <RadioGroup
                  options={adjustmentOptions}
                  value={adjustmentType}
                  onChange={setAdjustmentType}
                  className="grid-cols-2 w-full"
                  // radioClassName="w-1/2"
                />
              </div>
            </div>

            {/* Counts */}
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="Physical Count"
                name="physicalCount"
                value="15"
                type="number"
                onChange={() => console.log("Physical Count")}
              />
              <InputField
                label="Available"
                name="available"
                value="100"
                type="number"
                onChange={() => console.log("Physical Count")}
              />
              <InputField
                label="Discrepancy"
                name="discrepancy"
                value="100"
                type="number"
                onChange={() => console.log("Physical Count")}
              />
            </div>

            <AdjustmentReasons />

            {/* Note */}
            <div>
              <label htmlFor="note" className="text-sm text-gray-600">
                Note
              </label>
              <textarea
                id="note"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-700 mt-1 focus:outline-none focus:ring-2 focus:ring-[#619B7D]"
                rows={4}
                placeholder="Evaluate if the damage is repairable or if the item needs to be written off."
              ></textarea>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-3/7 bg-gray-50 border-l border-gray-200 p-6 space-y-6">
            <div className="flex items-start gap-3">
              <img
                src="https://cdn.shopify.com/s/files/1/0661/9630/7113/files/macbook.png"
                alt="Macbook"
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold text-gray-800 text-sm">
                  Macbook Pro 14 Inch 512GB M1 Pro
                </h2>
                <p className="text-xs text-gray-500">SKU: MAC-09485</p>
                <div className="flex items-center text-xs text-orange-500 mt-1">
                  <Icon icon="mdi:star" className="text-sm" />
                  <span className="ml-1">4.8 (886)</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm text-gray-700 mb-3">
                Stock adjustment history
              </h3>
              <ul className="space-y-4 text-sm text-gray-600">
                {stockHistory.map((entry, i) => (
                  <li key={i}>
                    <p className="font-semibold">{entry.date}</p>
                    <p>Adjust Stock “{entry.qty} Unit”</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Icon
                        icon="mdi:account-circle"
                        className="mr-1 text-lg"
                      />
                      {entry.user}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-end border-t pt-4">
          <Button onClick={onClose} outline={true} className="min-w-[10rem]">
            Cancel
          </Button>
          <Button onClick={onClose} className="min-w-[10rem] ml-4">
            Save
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
