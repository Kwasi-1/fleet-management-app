import { useState, useRef } from "react";
import Table, { TableRow } from "../../common/Table";
import VehicleModal from "../vehicle/VehicleModal";
import OperatorModal from "../vehicle/OperatorModal";
import { useNavigate } from "react-router";
import type { MouseEvent } from "react";

// Define the column type
interface Column {
  key: string;
  label: string;
}

// Define the vehicle type
interface Vehicle extends TableRow {
  id: number;
  name: string;
  operator: string;
  year: number;
  make: string;
  model: string;
  vin: string;
  status: string;
  type: string;
  group: string;
  statusColor: string;
  licensePlate: string;
  color: string;
  meter: string;
  ownership: string;
  bodyType: string;
  msrp: string;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

const vehicleColumns: Column[] = [
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

const initialVehicles: Vehicle[] = [
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
    licensePlate: "6TRJ244",
    color: "Silver",
    meter: "20,811 mi",
    ownership: "Owned",
    bodyType: "Hatchback",
    msrp: "$24,950.00",
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
    licensePlate: "6TRGT54",
    color: "Red",
    meter: "20,821 mi",
    ownership: "Owned",
    bodyType: "Truck",
    msrp: "$92,950.00",
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
    licensePlate: "7TRJ994",
    color: "Black",
    meter: "20,811 mi",
    ownership: "Owned",
    bodyType: "Car",
    msrp: "$62,950.00",
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
    licensePlate: "6TRJ1424",
    color: "Silver",
    meter: "20,811 mi",
    ownership: "Owned",
    bodyType: "Hatchback",
    msrp: "$24,950.00",
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
    licensePlate: "6TRJ244",
    color: "Silver",
    meter: "20,811 mi",
    ownership: "Owned",
    bodyType: "Hatchback",
    msrp: "$24,950.00",
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
    licensePlate: "8ZWJ244",
    color: "Silver",
    meter: "26,811 mi",
    ownership: "Owned",
    bodyType: "Hatchback",
    msrp: "$75,950.00",
  },
];

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(
    null
  );
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleRowClick = (row: Vehicle) => {
    navigate("/fleet/vehicle/info", { state: { vehicle: row } });
  };

  const operatorTriggerRef = useRef<EventTarget | null>(null);

  const handleOperatorClick = (row: Vehicle) => {
    setSelectedVehicleId(row.id);
    setIsOperatorModalOpen(true);
  };

  const handleAssignOperator = (operator: string) => {
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
        onRowClick={handleRowClick}
        onOperatorClick={(
          row: Vehicle,
          event: MouseEvent<HTMLButtonElement>
        ) => {
          operatorTriggerRef.current = event.target;
          handleOperatorClick(row);
        }}
      />
      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={handleCloseVehicleModal}
        isEditMode={true}
      />
      <OperatorModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        onAssign={handleAssignOperator}
        // @ts-ignore

        triggerRef={operatorTriggerRef}
        selectedOperator={
          vehicles.find((v) => v.id === selectedVehicleId)?.operator
        }
      />
    </div>
  );
};

export default VehicleTable;
