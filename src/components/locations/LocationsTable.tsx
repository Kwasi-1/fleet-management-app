import Table from "../common/Table";

// Define table columns
const columns = [
  { key: "externalId", label: "External ID" },
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "postalCode", label: "Postal Code" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status" },
  { key: "openHours", label: "Open Hours" },
  { key: "contactName", label: "Contact Name" },
  { key: "contactPhone", label: "Contact Phone" },
  { key: "endDateTime", label: "End Date/Time" },
];

// Define table data based on the image
const locationsData = [
  {
    id: 1,
    externalId: "00123",
    name: "Bev's Beverages East",
    type: "Shipper",
    address: "123 Main Street",
    city: "Austin",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "All days 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 2,
    externalId: "00123",
    name: "Bev's Beverages West",
    type: "Shipper",
    address: "6301 Market Ave",
    city: "Houston",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "Weekdays 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 3,
    externalId: "00123",
    name: "Bev's Beverages East",
    type: "Shipper",
    address: "890 Cedar Ct",
    city: "Houston",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "All days 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 4,
    externalId: "00123",
    name: "Bev's Beverages East",
    type: "Shipper",
    address: "403 Elm St",
    city: "San Antonio",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "All days 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 5,
    externalId: "00123",
    name: "Bev's Beverages West",
    type: "Receiver",
    address: "295 Birch Rd",
    city: "Plano",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "All days 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 6,
    externalId: "00123",
    name: "Bev's Beverages West",
    type: "Receiver",
    address: "210 Sycamore St",
    city: "Fort Worth",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "Weekdays 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
  {
    id: 7,
    externalId: "00123",
    name: "Bev's Beverages East",
    type: "Shipper",
    address: "320 Maple Ave",
    city: "San Antonio",
    state: "TX",
    postalCode: "78741",
    country: "USA",
    status: "Active",
    openHours: "Weekdays 00:01-23:59",
    contactName: "Dallas Waters",
    contactPhone: "555-555-5555",
    endDateTime: "04/01/2024 00:00",
  },
];

const LocationsTable = () => (
  <Table
    columns={columns}
    data={locationsData}
    searchPlaceholder="eg. Bev's Beverages East"
    buttonLabel="Create Location"
    onRowClick={(row) => console.log("Row clicked:", row)}
    onButtonClick={() => console.log("Create Location button clicked")}
    onOperatorClick={(row) => console.log("Operator clicked:", row)}
  />
);

export default LocationsTable;
