import Table from "../../common/Table";
import { Shipment } from "../../../types/shipmentTypes";
import CreateShipmentModal from "../create_shipment/CreateShipmentModal";
import { useState } from "react";

interface ShipmentTableProps {
  onShipmentClick: (shipment: Shipment) => void;
}

const shipmentColumns = [
  { key: "id", label: "Shipment ID" },
  { key: "rate", label: "Rate" },
  { key: "pickup", label: "Pickup" },
  { key: "destination", label: "Destination" },
  { key: "distance", label: "Distance" },
  { key: "date", label: "Date" },
  { key: "weight", label: "Weight" },
  // { key: "status", label: "Status" },
];

const shipmentData = [
  {
    id: "SHP-301",
    rate: "₵800",
    pickup: "Accra",
    destination: "Kumasi",
    distance: "250 km",
    weight: "500 kg",
    date: "20/03/2025",
    status: "In Transit",
    order: "ORD-789",
    pickupCoordinates: [-118.2437, 34.0522] as [number, number],
    destinationCoordinates: [-87.6298, 41.8781] as [number, number],
    reference: "ME #12345678",
    primaryReference: "Primary reference #12345678",
    lastKnownPosition: {
      location: "Salt Lake City, UT",
      timestamp: "02/20/2023 2:00",
    },
    eta: {
      location: "Chicago, IL",
      timestamp: "02/22/2023 18:30",
    },
    progress: [
      {
        title: "Pickup",
        location: "Accra Warehouse",
        address: "123 Main St, Accra",
        time: "20/03/2025 08:00 - 20/03/2025 09:00",
        iconColor: "bg-blue-500",
        status: null,
      },
      {
        title: "Departure",
        time: "20/03/2025 09:30",
        iconColor: "bg-blue-500",
        status: null,
      },
      {
        title: "Interline Stop",
        location: "Koforidua",
        time: "20/03/2025 12:45",
        iconColor: "bg-yellow-500",
        status: null,
      },
      {
        title: "Arrival",
        time: "20/03/2025 18:30",
        iconColor: "bg-green-500",
        status: {
          label: "On time",
          color: "text-green-500",
          bgColor: "bg-green-100",
        },
      },
    ],
  },
  {
    id: "SHP-302",
    rate: "₵650",
    pickup: "Tema",
    destination: "Takoradi",
    distance: "210 km",
    weight: "400 kg",
    date: "19/03/2025",
    status: "Delivered",
    order: "ORD-456",
    pickupCoordinates: [-118.2437, 34.0522] as [number, number],
    destinationCoordinates: [-87.6298, 41.8781] as [number, number],
    reference: "ME #87654321",
    primaryReference: "Primary reference #87654321",
    lastKnownPosition: {
      location: "Tema",
      timestamp: "19/03/2025 12:00",
    },
    eta: {
      location: "Takoradi",
      timestamp: "19/03/2025 18:00",
    },
    progress: [
      {
        title: "Pickup",
        location: "Tema Yard",
        address: "456 Industrial Rd, Tema",
        time: "19/03/2025 08:00 - 19/03/2025 09:00",
        iconColor: "bg-blue-500",
        status: null,
      },
      {
        title: "Departure",
        time: "19/03/2025 09:30",
        iconColor: "bg-blue-500",
        status: null,
      },
      {
        title: "Arrival",
        time: "19/03/2025 18:00",
        iconColor: "bg-green-500",
        status: {
          label: "On time",
          color: "text-green-500",
          bgColor: "bg-green-100",
        },
      },
    ],
  },
];

const BookingTable: React.FC<ShipmentTableProps> = ({ onShipmentClick }) => {
  const [isCreateShipmentModalOpen, setIsCreateShipmentModalOpen] =
    useState(false);

  const handleOpenModal = () => {
    setIsCreateShipmentModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateShipmentModalOpen(false);
  };

  return (
    <div>
      <Table<Shipment>
        columns={shipmentColumns}
        data={shipmentData}
        searchPlaceholder="Search Shipments..."
        buttonLabel="Add Shipment"
        onButtonClick={handleOpenModal}
        onRowClick={onShipmentClick} // Now types match perfectly
      />
      <CreateShipmentModal
        isOpen={isCreateShipmentModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default BookingTable;
