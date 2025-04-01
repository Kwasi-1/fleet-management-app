import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/reminders/VehicleRenewalTable";
import FuelHistoryTable from "../components/fleet_management/fuel&energy/FuelHistoryTable";

const tabs = ["Fuel History", "Charging History"];

const components = {
  "Fuel History": <FuelHistoryTable />,
  "Charging History": <VehicleRenewalTable />,
};

// Define dashboard data per tab (leave tabs without dashboard empty)
const dashboardData = {
  "Fuel History": [
    { label: "Fuel Transactions", value: "120" },
    { label: "Avg. Fuel Cost", value: "$3.50/gal" },
    { label: "Total Gallons", value: "420" },
    { label: "Avg. Fuel Economy", value: "23.5 mpg" },
  ],
  "Charging History": [
    { label: "Total Charging Cost", value: "$634.83" },
    { label: "Total Energy", value: "247.17 kWh" },
    { label: "Avg. Energy Economy", value: "25.78 mpg (US)" },
    { label: "Avg. Cost", value: "$2.57 /kWh" },
  ],
};

const Fuel = () => {
  return (
    <Layout
      title="Fuel and Energy"
      tabs={tabs}
      components={components}
      showDashboard={true}
      dashboardData={dashboardData}
      defaultDashboardData={dashboardData["Fuel History"]}
    />
  );
};

export default Fuel;
