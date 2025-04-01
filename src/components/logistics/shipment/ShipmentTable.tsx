import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";

// Define types for shipment progress and shipment data
interface ShipmentProgress {
  title: string;
  location?: string;
  address?: string;
  time: string;
  iconColor: string;
  status: {
    label?: string;
    color?: string;
    bgColor?: string;
  } | null;
}

interface LastKnownPosition {
  location: string;
  timestamp: string;
}

interface ETA {
  location: string;
  timestamp: string;
}

interface Shipment {
  id: string;
  order: string;
  pickup: string;
  destination: string;
  pickupCoordinates: [number, number];
  destinationCoordinates: [number, number];
  date: string;
  status: string;
  reference: string;
  primaryReference: string;
  lastKnownPosition: LastKnownPosition;
  eta: ETA;
  progress: ShipmentProgress[];
}

// Define columns type
interface Column {
  key: string;
  label: string;
}

// Define props type for the ShipmentTable component
interface ShipmentTableProps {
  onShipmentClick: (shipment: Shipment) => void;
}

const shipmentColumns: Column[] = [
  { key: "id", label: "Shipment ID" },
  { key: "order", label: "Order" },
  { key: "pickup", label: "Pickup" },
  { key: "destination", label: "Destination" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
];

const shipmentData: Shipment[] = [
  {
    id: "SHP-301",
    order: "ORD-789",
    pickup: "Accra",
    destination: "Kumasi",
    pickupCoordinates: [-118.2437, 34.0522], // Los Angeles
    destinationCoordinates: [-87.6298, 41.8781], // Chicago
    date: "20/03/2025",
    status: "In Transit",
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
    order: "ORD-456",
    pickup: "Tema",
    destination: "Takoradi",
    pickupCoordinates: [-118.2437, 34.0522], // Los Angeles
    destinationCoordinates: [-87.6298, 41.8781], // Chicago
    date: "19/03/2025",
    status: "Delivered",
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

const ShipmentTable: React.FC<ShipmentTableProps> = ({ onShipmentClick }) => {
  const navigate = useNavigate(); // ✅ Hook must be inside the function body

  const handleButtonClick = () => {
    navigate("/logistics/shipment/add");
  };

  return (
    <Table
      columns={shipmentColumns}
      data={shipmentData}
      searchPlaceholder="Search Shipments..."
      buttonLabel="Add Shipment"
      onButtonClick={handleButtonClick} // Pass the click handler
      onRowClick={onShipmentClick} // Pass the click handler
    />
  );
};

export default ShipmentTable;
