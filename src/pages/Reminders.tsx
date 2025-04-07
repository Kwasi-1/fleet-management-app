import Layout from "../layouts/Layout";
import VehicleRenewalTable from "../components/fleet_management/reminders/VehicleRenewalTable";
import ContactRenewalTable from "../components/fleet_management/reminders/ContactRenewalTable";
import ServiceRemindersTable from "../components/fleet_management/reminders/ServiceReminderTable";

const tabs = ["Service Reminder", "Vehicle Renewal", "Contact Renewal"];

const dashboardStats = [
  { label: "Overdue Vehicles", value: "3" },
  { label: "Due Soon Vehicles", value: "1" },
  { label: "Snoozed Vehicles", value: "0" },
  { label: "Average Compliance", value: "44%" },
];

const components = {
  "Service Reminder": <ServiceRemindersTable />,
  "Vehicle Renewal": <VehicleRenewalTable />,
  "Contact Renewal": <ContactRenewalTable />,
};

const Reminders = () => {
  return (
    <Layout
      title="Reminders"
      tabs={tabs}
      components={components}
      showDashboard={true}
      defaultDashboardData={dashboardStats}
    />
  );
};

export default Reminders;
