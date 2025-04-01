import { useState, ChangeEvent } from "react";
import ModalLayout from "../../../layouts/ModalLayout";
import FirstStep from "./modal/FirstStep";
import MaintenanceSchedule from "./modal/MaintenanceSchedule";
import Lifecycle from "./modal/Lifecycle";
import Financial from "./modal/Financial";
import Specifications from "./modal/Specifications";

// Define the type for the formData
interface FormData {
  vin: string;
  vehicleName: string;
  type: string;
  status: string;
  ownership: string;
  labels: string;
}

// Define the type for the props of VehicleModal
interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      title="Add Vehicle"
      description="Enter the vehicle details below"
      tabs={[
        "Details",
        "Maintenance",
        "Lifecycle",
        "Financial",
        "Specifications",
      ]}
    >
      <FirstStep formData={formData} handleInputChange={handleInputChange} />
      <MaintenanceSchedule
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <Lifecycle formData={formData} handleInputChange={handleInputChange} />
      <Financial formData={formData} handleInputChange={handleInputChange} />
      <Specifications
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </ModalLayout>
  );
};

export default VehicleModal;
