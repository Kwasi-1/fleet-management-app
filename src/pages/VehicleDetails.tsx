import Layout from "../layouts/Layout";
import VehicleTable from "../components/fleet_management/VehicleTable";
import MeterHistory from "../components/vehicle/MeterHistory";
import ExpenseHistory from "../components/vehicle/ExpenseHistory";

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

const VehicleDetails = () => {
  return (
    <Layout
      title="Vehicles"
      tabs={tabs}
      components={components}
      showDashboard={false}
      
    />
  );
};

export default VehicleDetails;
