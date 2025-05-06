import { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import SelectField from "../../common/SelectField";
import InputField from "../../common/InputField";

interface ServiceEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ServiceEntryModal({ isOpen, onClose }: ServiceEntryModalProps) {
  const [formData, setFormData] = useState({
    vehicle: "",
    priority: "",
    completionDate: "",
    reference: "",
    vendor: "",
    labels: "",
    issues: [],
    lineItems: [],
    photos: [],
    documents: [],
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, [fieldName]: filesArray }));
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Service Issue"
      description="Fill in the details to create a new service issue."
      tabs={["Details", "Issues & Line Items", "Attachments & Comments"]}
    >
      {/* Step 1: Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SelectField
          label="Vehicle *"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          options={["Vehicle 1", "Vehicle 2"]}
        />

        <SelectField
          label="Repair Priority Class"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          options={["Scheduled", "Non-Scheduled", "Emergency"]}
        />

        <InputField
          label="Completion Date"
          name="completionDate"
          type="datetime-local"
          value={formData.completionDate}
          onChange={handleChange}
        />

        <InputField
          label="Reference"
          name="reference"
          placeholder="Enter reference"
          value={formData.reference}
          onChange={handleChange}
        />

        <SelectField
          label="Vendor"
          name="vendor"
          value={formData.vendor}
          onChange={handleChange}
          options={["Vendor 1", "Vendor 2"]}
        />

        <SelectField
          label="Labels"
          name="labels"
          value={formData.labels}
          onChange={handleChange}
          options={["Label 1", "Label 2"]}
        />
      </div>

      {/* Step 2: Issues & Line Items */}
      <div>
        <label className="block font-semibold">Issues</label>
        <p className="text-gray-500 text-sm">Select a vehicle first.</p>

        <label className="block font-semibold mt-3">Line Items</label>
        <p className="text-gray-500 text-sm">Select a vehicle first.</p>
      </div>

      {/* Step 3: Attachments & Comments */}
      <div>
        <label className="block font-semibold">Photos</label>
        <InputField
          type="file"
          name="photos"
          onChange={(e) => handleFileChange(e, "photos")}
          className="w-full border p-2 rounded"
        />

        <label className="block font-semibold mt-3">Documents</label>
        <InputField
          type="file"
          name="documents"
          onChange={(e) => handleFileChange(e, "documents")}
          className="w-full border p-2 rounded"
        />

        <InputField
          label="Comments"
          name="comments"
          placeholder="Add an optional comment"
          value={formData.comments}
          onChange={handleChange}
        />
      </div>
    </ModalLayout>
  );
}

export default ServiceEntryModal;
