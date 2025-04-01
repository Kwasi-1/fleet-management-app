import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import FirstStep from "./modal/FirstStep";
import MaintenanceSchedule from "./modal/MaintenanceSchedule";
import Lifecycle from "./modal/Lifecycle";
import Financial from "./modal/Financial";
import Specifications from "./modal/Specifications";

function VehicleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    vin: "",
    vehicleName: "",
    type: "Car",
    status: "Active",
    ownership: "Owned",
    labels: "",
  });

  const handleInputChange = (e) => {
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
}

export default VehicleModal;
