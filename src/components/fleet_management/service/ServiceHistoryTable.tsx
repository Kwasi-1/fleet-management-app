import Table from "../../common/Table";

const ServiceHistoryTable = () => {
  // Define columns for the table
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "completionDate", label: "Actual Completion Date" },
    { key: "watchers", label: "Watchers" },
    { key: "priority", label: "Repair Priority Class" },
    { key: "meter", label: "Meter" },
    { key: "serviceTasks", label: "Service Tasks" },
    { key: "issues", label: "Issues" },
    { key: "vendor", label: "Vendor" },
    { key: "total", label: "Total" },
    { key: "workOrder", label: "Work Order" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      asset: "1100 [2018 Toyota Prius]",
      completionDate: "12/15/2024 12:46pm",
      watchers: "—",
      priority: "—",
      meter: "11,278 mi",
      serviceTasks:
        "Engine Oil & Filter Replacement, Engine Air Filter Replacement",
      issues: "—",
      vendor: "—",
      total: "$94.88",
      workOrder: "—",
    },
    {
      id: 2,
      asset: "2100 [2016 Ford F-150]",
      completionDate: "09/01/2024 11:37am",
      watchers: "—",
      priority: "4",
      meter: "40,115 mi",
      serviceTasks: "Engine Oil & Filter Replacement, Tire Rotation",
      issues: "—",
      vendor: "—",
      total: "$70.99",
      workOrder: "—",
    },
    {
      id: 3,
      asset: "2100 [2016 Ford F-150]",
      completionDate: "11/29/2024 2:36pm",
      watchers: "—",
      priority: "—",
      meter: "47,610 mi",
      serviceTasks: "Engine Oil & Filter Replacement",
      issues: "—",
      vendor: "—",
      total: "$47.46",
      workOrder: "—",
    },
    {
      id: 4,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      completionDate: "09/13/2024 7:36pm",
      watchers: "—",
      priority: "—",
      meter: "119,835 mi",
      serviceTasks: "Tire Rotation",
      issues: "—",
      vendor: "—",
      total: "$70.99",
      workOrder: "—",
    },
    {
      id: 5,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      completionDate: "11/28/2024 1:56pm",
      watchers: "—",
      priority: "—",
      meter: "126,800 mi",
      serviceTasks: "Engine Oil & Filter Replacement",
      issues: "—",
      vendor: "—",
      total: "$47.46",
      workOrder: "—",
    },
    {
      id: 6,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      completionDate: "11/29/2024 2:19pm",
      watchers: "—",
      priority: "—",
      meter: "126,820 mi",
      serviceTasks: "Tire Replacement",
      issues: "—",
      vendor: "—",
      total: "$534.00",
      workOrder: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search service history..."
        buttonLabel="Add Service Entry"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Service Entry Clicked")}
      />
    </div>
  );
};

export default ServiceHistoryTable;
