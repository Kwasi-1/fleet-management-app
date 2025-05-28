import { useState } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";
import SelectField from "../../common/SelectField";

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IssueModal = ({ isOpen, onClose }: IssueModalProps) => {
  const [formData, setFormData] = useState({
    reportedBy: "Nana Kwame Gyamfi Antwi",
    assignedTo: "",
    dueDate: "2025-04-01",
    asset: "",
    priority: "No Priority",
    reportedDate: "2025-04-01",
    reportedTime: "12:27pm",
    summary: "",
    description: "",
    labels: "",
    photos: null,
    documents: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="New Issue"
      description="Fill in the details below to create a new issue."
      tabs={["Basic Info", "Details", "Attachments"]}
    >
      {/* Step 1: Basic Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Reported By"
          name="reportedBy"
          value={formData.reportedBy}
          onChange={handleChange}
          disabled
        />

        <InputField
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          placeholder="Enter name"
        />

        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Step 2: Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Asset *"
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          placeholder="Select an asset"
        />

        <SelectField
          label="Priority"
          name="priority"
          options={["No Priority", "Low", "Medium", "High"]}
          value={formData.priority}
          onChange={handleChange}
        />

        <InputField
          label="Reported Date"
          name="reportedDate"
          type="date"
          value={formData.reportedDate}
          onChange={handleChange}
        />

        <InputField
          label="Reported Time"
          name="reportedTime"
          type="time"
          value={formData.reportedTime}
          onChange={handleChange}
        />

        <InputField
          label="Summary *"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief overview"
        />

        <InputField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Provide more details"
        />
      </div>

      {/* Step 3: Attachments */}
      <div>
        <InputField
          label="Photos"
          name="photos"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <InputField
          label="Documents"
          name="documents"
          type="file"
          accept=".pdf, .doc, .docx, .txt"
          onChange={handleFileChange}
        />
      </div>
    </ModalLayout>
  );
};

export default IssueModal;
