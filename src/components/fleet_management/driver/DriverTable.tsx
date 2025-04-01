import { useState } from "react";
import DriverModal from "./DriverModal";
import Table from "../../common/Table";

const driverColumns = [
  { key: "id", label: "Driver ID" },
  { key: "name", label: "Name" },
  { key: "license", label: "License" },
  { key: "experience", label: "Experience" },
  { key: "status", label: "Status" },
];

const driverData = [
  {
    id: "DRV-101",
    name: "John Doe",
    license: "A12345",
    experience: "5 years",
    status: "Active",
  },
  {
    id: "DRV-102",
    name: "Jane Smith",
    license: "B67890",
    experience: "3 years",
    status: "Inactive",
  },
];

const DriverTable = () => {
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);

  const handleAddDriver = () => {
    setIsDriverModalOpen(true);
  };

  const handleCloseVehicleModal = () => {
    setIsDriverModalOpen(false);
  };

  return (
    <div>
      <Table
        columns={driverColumns}
        data={driverData}
        searchPlaceholder="Search Drivers..."
        buttonLabel="Add Driver"
        onButtonClick={handleAddDriver}
      />

      <DriverModal
        isOpen={isDriverModalOpen}
        onClose={handleCloseVehicleModal}
      />
    </div>
  );
};

export default DriverTable;
