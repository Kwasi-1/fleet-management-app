import Table from "../../common/Table";

const columns = [
  { key: "id", label: "Shipment ID" },
  { key: "mode", label: "Mode" },
  { key: "origin", label: "Origin City" },
  { key: "destination", label: "Destination City" },
  { key: "mustArriveBy", label: "Must Arrive By" },
  { key: "status", label: "Status" },
  { key: "latestComment", label: "Latest Comment" },
];

const data = [
  {
    id: "173491383",
    mode: "Intermodal",
    origin: "Maxton, NC",
    destination: "Fort Worth, TX",
    mustArriveBy: "02/20/2023 23:59",
    status: "In transit",
    latestComment: "Driver got a flat tire, new ETA +2hrs",
  },
  {
    id: "123456789",
    mode: "TL",
    origin: "Salt Lake City",
    destination: "Los Angeles",
    mustArriveBy: "02/21/2023 23:59",
    status: "Delayed",
    latestComment: "Weather conditions affecting route",
  },
];

const ShipmentTrackingTable = () => {
  return (
    <Table
      columns={columns}
      data={data}
      searchPlaceholder="Search past due not delivered..."
    />
  );
};

export default ShipmentTrackingTable;
