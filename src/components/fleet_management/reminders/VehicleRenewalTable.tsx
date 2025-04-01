import Table from "../../common/Table";

const VehicleRenewalTable = () => {
  // Define columns
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "renewalType", label: "Renewal Type" },
    { key: "status", label: "Status" },
    { key: "dueDate", label: "Due Date" },
    { key: "watchers", label: "Watchers" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      asset: "2.100 [2016 Ford F-150]",
      renewalType: "Emission Test",
      status: "Overdue",
      dueDate: "03/05/2025",
      watchers: "—",
    },
    {
      id: 2,
      asset: "5.100 [2010 Utility Reefer]",
      renewalType: "Registration",
      status: "Overdue",
      dueDate: "03/19/2025",
      watchers: "—",
    },
    {
      id: 3,
      asset: "6.100 [2017 Hyster H50XM]",
      renewalType: "Inspection",
      status: "Overdue",
      dueDate: "03/24/2025",
      watchers: "—",
    },
    {
      id: 4,
      asset: "1.100 [2018 Toyota Prius]",
      renewalType: "Emission Test",
      status: "Due Soon",
      dueDate: "03/27/2025",
      watchers: "—",
    },
    {
      id: 5,
      asset: "3.100 [2014 Chevrolet Express Cargo]",
      renewalType: "Registration",
      status: "Due Soon",
      dueDate: "04/06/2025",
      watchers: "—",
    },
    {
      id: 6,
      asset: "4.100 [2012 Freightliner Cascadia]",
      renewalType: "Registration",
      status: "Upcoming",
      dueDate: "08/04/2025",
      watchers: "—",
    },
    {
      id: 7,
      asset: "1.100 [2018 Toyota Prius]",
      renewalType: "Registration",
      status: "Upcoming",
      dueDate: "08/31/2025",
      watchers: "—",
    },
    {
      id: 8,
      asset: "1.100 [2018 Toyota Prius]",
      renewalType: "Insurance",
      status: "Upcoming",
      dueDate: "08/31/2025",
      watchers: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search asset renewal reminders..."
        buttonLabel="Add Asset Renewal Reminder"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Asset Renewal Clicked")}
      />
    </div>
  );
};

export default VehicleRenewalTable;
