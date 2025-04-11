import { useState } from "react";
import Table from "../../common/Table";
import DeliveryNotesModal from "./DeliveryNotesModal";

type Column = {
  key: string;
  label: string;
};

const deliveryStopsColumns: Column[] = [
  { key: "checkbox", label: "" },
  { key: "no", label: "No." },
  { key: "customer", label: "Customer" },
  { key: "addressName", label: "Address Name *" },
  { key: "status", label: "Status" },
  { key: "deliveryNote", label: "Delivery Note" },
  { key: "estimatedArrival", label: "Estimated Arrival" },
];

const DeliveryStopsTable = () => {
  const [deliveryStopsData, setDeliveryStopsData] = useState([
    {
      id: 1,
      no: 1,
      customer: "3103 Restaurant",
      addressName: "",
      status: "not accepted",
      deliveryNote: "View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 2,
      no: 2,
      customer: "AZ Enterprise",
      addressName: "",
      status: "not accepted",
      deliveryNote: "View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 3,
      no: 3,
      customer: "Customer",
      addressName: "Address Name",
      status: "not accepted",
      deliveryNote: " View Delivery Note",
      estimatedArrival: "Estimated Arrival",
    },
    {
      id: 4,
      no: 4,
      customer: "New Customer",
      addressName: "",
      status: "not accepted",
      deliveryNote: " View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 5,
      no: 5,
      customer: "Another Customer",
      addressName: "",
      status: "not accepted",
      deliveryNote: " View Delivery Note",
      estimatedArrival: "",
    },
    {
      id: 6,
      no: 6,
      customer: "Customer Name",
      addressName: "",
      status: "not accepted",
      deliveryNote: " View Delivery Note",
      estimatedArrival: "",
    },
  ]);

  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeliveryNoteClick = (row: any) => {
    setSelectedStopId(row.id);
    setIsModalOpen(true);
  };

  const handleAccept = () => {
    if (selectedStopId) {
      setDeliveryStopsData((prev) =>
        prev.map((item) =>
          item.id === selectedStopId ? { ...item, status: "accepted" } : item
        )
      );
    }
    setIsModalOpen(false);
  };

  const enhancedData = deliveryStopsData.map((item) => ({
    ...item,
    deliveryNote: (
      <span
        className="text-[#619B7D] cursor-pointer hover:underline"
        onClick={(e) => {
          e.stopPropagation();
          handleDeliveryNoteClick(item);
        }}
      >
        {item.deliveryNote}
      </span>
    ),
  }));

  return (
    <>
      <Table
        columns={deliveryStopsColumns}
        data={enhancedData}
        buttonLabel="Create Delivery Trip"
        searchPlaceholder="Search Delivery Stops"
      />

      <DeliveryNotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleAccept}
      />
    </>
  );
};

export default DeliveryStopsTable;
