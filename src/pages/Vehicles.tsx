import Layout from "../layouts/Layout";
import VehicleTable from "../components/fleet_management/vehicle/VehicleTable";
import MeterHistory from "../components/fleet_management/vehicle/MeterHistory";
import ExpenseHistory from "../components/fleet_management/vehicle/ExpenseHistory";

const tabs = ["Vehicle List", "Meter History", "Expense History"];

const components = {
  "Vehicle List": <VehicleTable />,
  "Meter History": <MeterHistory />,
  "Expense History": <ExpenseHistory />,
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
