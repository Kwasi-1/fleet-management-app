import { useState, ChangeEvent } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";
import Textarea from "../../common/Textarea";

interface VehicleRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  vehicle: string;
  renewalType: string;
  dueDate: string;
  dueSoonThreshold: string;
  dueSoonUnit: string;
  enableNotifications: boolean;
  watchers: string;
  comment: string;
}

const VehicleRenewalModal: React.FC<VehicleRenewalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    vehicle: "",
    renewalType: "",
    dueDate: "",
    dueSoonThreshold: "3",
    dueSoonUnit: "weeks",
    enableNotifications: true,
    watchers: "",
    comment: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox inputs separately
    if (type === "checkbox" && "checked" in e.target) {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      // Handle all other inputs
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    console.log("Form Submitted:", formData);
    onClose();
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Vehicle Renewal Reminder"
      description="Set up a renewal reminder for your vehicle."
    >
      <form>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Vehicle *"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            options={["Select Vehicle", "2016 Ford F-150", "2018 Toyota Prius"]}
          />

          <SelectField
            label="Vehicle Renewal Type *"
            name="renewalType"
            value={formData.renewalType}
            onChange={handleChange}
            options={[
              "Select Type",
              "Emission Test",
              "Registration",
              "Inspection",
              "Insurance",
            ]}
          />

          <InputField
            label="Due Date *"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />

          <div className="flex items-center space-x-4">
            <InputField
              label="Due Soon Threshold"
              name="dueSoonThreshold"
              type="number"
              value={formData.dueSoonThreshold}
              onChange={handleChange}
            />
            <SelectField
              label="Unit"
              name="dueSoonUnit"
              value={formData.dueSoonUnit}
              onChange={handleChange}
              options={["Days", "Weeks"]}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="enableNotifications"
              name="enableNotifications"
              checked={formData.enableNotifications}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="enableNotifications" className="text-gray-700">
              Enable Notifications
            </label>
          </div>

          <SelectField
            label="Watchers"
            name="watchers"
            value={formData.watchers}
            onChange={handleChange}
            options={["Select Watcher", "John Doe", "Jane Smith"]}
          />

          <div className="col-span-2">
            <Textarea
              label="Comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Add your comments"
              required
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#619B7D] text-white rounded-md"
          >
            Save Vehicle Renewal Reminder
          </button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default VehicleRenewalModal;
