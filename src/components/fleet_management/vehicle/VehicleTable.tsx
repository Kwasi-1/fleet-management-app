import { useState, useRef } from "react";
import Table from "../../common/Table";
import VehicleModal from "./VehicleModal";
import OperatorModal from "./OperatorModal";

const vehicleColumns = [
  { key: "name", label: "Name" },
  { key: "operator", label: "Operator" },
  { key: "year", label: "Year" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "vin", label: "VIN" },
  { key: "status", label: "Status" },
  { key: "type", label: "Type" },
  { key: "group", label: "Group" },
];

const initialVehicles = [
  {
    id: 1100,
    name: "2018 Toyota Prius",
    operator: "Jacob Silva",
    year: 2018,
    make: "Toyota",
    model: "Prius",
    vin: "JTDBKRFU9J3059307",
    status: "Active",
    type: "Car",
    group: "Management",
    statusColor: "green",
  },
  {
    id: 2100,
    name: "2016 Ford F-150",
    operator: "Unassigned",
    year: 2016,
    make: "Ford",
    model: "F-150",
    vin: "1FTFW1EG3GFA3I822",
    status: "Active",
    type: "Pickup Truck",
    group: "Sales",
    statusColor: "green",
  },
  {
    id: 3100,
    name: "2014 Chevrolet Express Cargo",
    operator: "Carlos Garcia",
    year: 2014,
    make: "Chevrolet",
    model: "Express Cargo",
    vin: "1CGZ7CG7E1151917",
    status: "In Shop",
    type: "Van",
    group: "Sales",
    statusColor: "orange",
  },
  {
    id: 4100,
    name: "2012 Freightliner Cascadia",
    operator: "Unassigned",
    year: 2012,
    make: "Freightliner",
    model: "Cascadia",
    vin: "1FUGLDRXCSBE256I",
    status: "Out of Service",
    type: "Semi Truck",
    group: "Warehouse",
    statusColor: "red",
  },
  {
    id: 5100,
    name: "2010 Utility Reefer",
    operator: "Unassigned",
    year: 2010,
    make: "Utility",
    model: "Reefer",
    vin: "1UYVS2537M9O6617",
    status: "Inactive",
    type: "Trailer",
    group: "Warehouse",
    statusColor: "gray",
  },
  {
    id: 6100,
    name: "2017 Hyster H50XM",
    operator: "Unassigned",
    year: 2017,
    make: "Hyster",
    model: "H50XM",
    vin: "D17B12526K",
    status: "Active",
    type: "Forklift",
    group: "Warehouse",
    statusColor: "green",
  },
];

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  // Ref to track the trigger button
  const operatorTriggerRef = useRef(null);

  // Handle operator selection
  const handleOperatorClick = (row) => {
    setSelectedVehicleId(row.id);
    setIsOperatorModalOpen(true);
  };

  // Assign operator to the vehicle
  const handleAssignOperator = (operator) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === selectedVehicleId ? { ...vehicle, operator } : vehicle
      )
    );
    setIsOperatorModalOpen(false);
  };

  const handleAddVehicle = () => {
    setIsVehicleModalOpen(true);
  };

  const handleCloseVehicleModal = () => {
    setIsVehicleModalOpen(false);
  };

  return (
    <div>
      <Table
        columns={vehicleColumns}
        data={vehicles}
        searchPlaceholder="Search Vehicles..."
        buttonLabel="Add Vehicle"
        onButtonClick={handleAddVehicle}
        onOperatorClick={(row, event) => {
          // Create a ref for the specific trigger button
          operatorTriggerRef.current = event.target;
          handleOperatorClick(row);
        }}
      />
      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={handleCloseVehicleModal}
      />
      <OperatorModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        onAssign={handleAssignOperator}
        triggerRef={operatorTriggerRef}
        selectedOperator={
          vehicles.find((v) => v.id === selectedVehicleId)?.operator
        }
      />
    </div>
  );
};

export default VehicleTable;
