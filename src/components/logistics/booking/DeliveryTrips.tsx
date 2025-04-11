import Table from "../../common/Table";

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

const deliveryStopsData = [
  {
    id: 1,
    no: 1,
    customer: " 3103 Restaurant",
    addressName: "",
    status: "not accepted",
    deliveryNote: " View Delivery Note",
    estimatedArrival: "",
  },
  {
    id: 2,
    no: 2,
    customer: "AZ Enterprise",
    addressName: "",
    status: "not accepted",
    deliveryNote: " View Delivery Note",
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
];

const DeliveryStopsTable = () => {
  return (
    <Table
      columns={deliveryStopsColumns}
      data={deliveryStopsData}
      searchPlaceholder="Search Delivery Stops"
    />
  );
};

export default DeliveryStopsTable;
