import Layout from "../layouts/Layout";
import VehicleTable from "../components/fleet_management/vehicle/VehicleTable";
import MeterHistory from "../components/fleet_management/vehicle/MeterHistory";
import ExpenseHistory from "../components/fleet_management/vehicle/ExpenseHistory";

const tabs = [
  "Vehicle List",
  "Vehicle Assignments",
  "Meter History",
  "Expense History",
  "Replacement Analysis",
];

const components = {
  "Vehicle List": <VehicleTable />,
  "Vehicle Assignments": <p>Vehicle Assignments content here</p>,
  "Meter History": <MeterHistory />,
  "Expense History": <ExpenseHistory />,
  "Replacement Analysis": <p>Replacement Analysis content here</p>,
};

const Vehicles = () => {
  return (
    <Layout
      title="Vehicles"
      tabs={tabs}
      components={components}
      showDashboard={false}
    />
  );
};

export default Vehicles;
