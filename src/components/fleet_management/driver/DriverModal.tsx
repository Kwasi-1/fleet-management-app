import React, { useEffect, useState, ChangeEvent } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import InputField from "../../common/InputField";

// Types
interface Driver {
  name?: string;
  phone?: string;
  license?: string;
  licenseType?: string;
}

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDriver?: Driver | null;
}

interface FormData {
  firstName: string;
  lastName: string;
  mobilePhone: string;
  email: string;
  dateOfBirth: string;
  startDate: string;
  leaveDate: string;
  licenseNumber: string;
  licenseClass: string;
  hourlyRate: string;
  profilePhoto: File | null;
  group: string;
}

const DriverModal: React.FC<DriverModalProps> = ({
  isOpen,
  onClose,
  selectedDriver,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobilePhone: "",
    email: "",
    dateOfBirth: "",
    startDate: "",
    leaveDate: "",
    licenseNumber: "",
    licenseClass: "",
    hourlyRate: "",
    profilePhoto: null,
    group: "",
  });

  useEffect(() => {
    if (selectedDriver) {
      const [firstName = "", lastName = ""] =
        selectedDriver.name?.split(" ") || [];
      setFormData({
        firstName,
        lastName,
        mobilePhone: selectedDriver.phone || "",
        email: "",
        dateOfBirth: "",
        startDate: "",
        leaveDate: "",
        licenseNumber: selectedDriver.license || "",
        licenseClass: selectedDriver.licenseType || "",
        hourlyRate: "",
        profilePhoto: null,
        group: "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        mobilePhone: "",
        email: "",
        dateOfBirth: "",
        startDate: "",
        leaveDate: "",
        licenseNumber: "",
        licenseClass: "",
        hourlyRate: "",
        profilePhoto: null,
        group: "",
      });
    }
  }, [selectedDriver]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePhoto: file }));
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title={selectedDriver ? "Edit Driver" : "Add Driver"}
      description="Fill in the driver's information"
      tabs={["Basic Details", "Personal Details"]}
    >
      {/* -------- Basic Details Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Basic Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />

          <InputField
            label="Mobile Phone Number"
            name="mobilePhone"
            type="tel"
            placeholder="e.g. 555-212-3212"
            value={formData.mobilePhone}
            onChange={handleInputChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* -------- Personal Details Tab -------- */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Personal Details</h3>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />

          <InputField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
          />

          <InputField
            label="Leave Date"
            name="leaveDate"
            type="date"
            value={formData.leaveDate}
            onChange={handleInputChange}
          />

          <InputField
            label="License Number"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleInputChange}
          />

          <InputField
            label="License Class"
            name="licenseClass"
            placeholder="License Class"
            value={formData.licenseClass}
            onChange={handleInputChange}
          />

          <InputField
            label="HOURLY LABOR RATE"
            type="number"
            name="hourlyRate"
            placeholder="Hourly Labor Rate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
          />
        </div>

        {/* -------- File Upload -------- */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <label className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-600">
              Pick File
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <span className="text-gray-500">Or drop file here</span>
          </div>
          <small className="text-gray-500">
            {formData.profilePhoto
              ? formData.profilePhoto.name
              : "No file selected"}
          </small>
        </div>
      </div>
    </ModalLayout>
  );
};

export default DriverModal;
