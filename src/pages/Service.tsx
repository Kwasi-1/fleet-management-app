import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/fleet_management/reminders/VehicleRenewalTable";
import ContactRenewalTable from "../components/fleet_management/reminders/ContactRenewalTable";
import ServiceHistoryTable from "../components/fleet_management/service/ServiceHistoryTable";

const tabs = ["Service History", "Vehicle Renewal", "Contact Renewal"];

const components = {
  "Service History": <ServiceHistoryTable />,
  "Vehicle Renewal": <VehicleRenewalTable />,
  "Contact Renewal": <ContactRenewalTable />,
};

const dashboardStats = [
  { label: "Overdue Assets", value: "3" },
  { label: "Due Soon Assets", value: "1" },
  { label: "Snoozed Assets", value: "0" },
  { label: "Average Compliance", value: "44%" },
];

const Service = () => {
  return (
    <Layout
      title="Service"
      tabs={tabs}
      components={components}
      showDashboard={true}
      defaultDashboardData={dashboardStats}
    />
  );
};

export default Service;
