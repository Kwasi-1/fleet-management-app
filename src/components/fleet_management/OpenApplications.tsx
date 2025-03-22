import { useState } from "react";

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

const vehicleData = [
  {
    id: "VEH-201",
    driverId: "DRV-102",
    model: "Volvo FH16",
    plate: "GT-1234-22",
    capacity: "25 Tons",
    status: "Operational",
  },
  {
    id: "VEH-202",
    driverId: "DRV-101",
    model: "Ford Transit",
    plate: "BA-5678-19",
    capacity: "3 Tons",
    status: "Maintenance",
  },
];

const shipmentData = [
  {
    id: "SHP-301",
    order: "ORD-789",
    pickup: "Accra",
    destination: "Kumasi",
    date: "20/03/2025",
    status: "In Transit",
  },
  {
    id: "SHP-302",
    order: "ORD-456",
    pickup: "Tema",
    destination: "Takoradi",
    date: "19/03/2025",
    status: "Delivered",
  },
];

const tabs = ["Driver", "Vehicle", "Shipment"];

const OpenApplications = () => {
  const [activeTab, setActiveTab] = useState("Shipment");

  // Determine the table data based on active tab
  let tableHeaders = [];
  let tableData = [];

  if (activeTab === "Driver") {
    tableHeaders = ["Driver ID", "Name", "License", "Experience", "Status"];
    tableData = driverData.map((driver) => [
      driver.id,
      driver.name,
      driver.license,
      driver.experience,
      driver.status,
    ]);
  } else if (activeTab === "Vehicle") {
    tableHeaders = [
      "Vehicle ID",
      "Driver ID",
      "Model",
      "Plate Number",
      "Capacity",
      "Status",
    ];
    tableData = vehicleData.map((vehicle) => [
      vehicle.id,
      vehicle.driverId,
      vehicle.model,
      vehicle.plate,
      vehicle.capacity,
      vehicle.status,
    ]);
  } else if (activeTab === "Shipment") {
    tableHeaders = [
      "Shipment ID",
      "Order",
      "Pickup Point",
      "Destination",
      "Date",
      "Status",
    ];
    tableData = shipmentData.map((shipment) => [
      shipment.id,
      shipment.order,
      shipment.pickup,
      shipment.destination,
      shipment.date,
      shipment.status,
    ]);
  }

  return (
    <div className="col-span-5 bg-[#e0e6e930] px-6 rounded-xl border border-[#e0e6e930]">
      {/* Navigation Tabs */}
      <nav className="flex relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 text-gray-500 border-t-2 ${
              activeTab === tab
                ? "text-green-600 font-medium border-green-600"
                : "border-[#e0e6e930]"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Dynamic Table Header */}
      <h2 className="text-lg font-semibold mt-4">{activeTab} Details</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 uppercase text-sm">
              {tableHeaders.map((header, index) => (
                <th key={index} className="text-left p-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#e5e7eb] hover:bg-gray-200 transition"
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenApplications;
