import { useState } from "react";
import Table from "../fleet_management/Table";
import StatusText from "../fleet_management/StatusText";

const ServiceRemindersTable = () => {
  // Define columns for the table
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "serviceTask", label: "Service Task" },
    { key: "status", label: "Status" },
    { key: "nextDue", label: "Next Due" },
    { key: "activeWorkOrder", label: "Active Work Order" },
    { key: "lastCompleted", label: "Last Completed" },
    { key: "compliance", label: "Compliance" },
    { key: "watchers", label: "Watchers" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      serviceTask: "Tire Rotation",
      status: "Overdue",
      nextDue: "3 months ago | 9,364 miles overdue",
      activeWorkOrder: "—",
      lastCompleted: "09/13/2024 | 119,835 mi",
      compliance: "50%",
      watchers: "—",
    },
    {
      id: 2,
      asset: "4100 [2012 Freightliner Cascadia]",
      serviceTask: "Tire Rotation",
      status: "Overdue",
      nextDue: "3 months ago | 8,990 miles overdue",
      activeWorkOrder: "—",
      lastCompleted: "09/29/2024 | 627,957 mi",
      compliance: "0%",
      watchers: "—",
    },
    {
      id: 3,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      serviceTask: "Engine Oil & Filter Replacement",
      status: "Overdue",
      nextDue: "4 weeks ago | 2,399 miles overdue",
      activeWorkOrder: "—",
      lastCompleted: "11/28/2024 | 126,800 mi",
      compliance: "67%",
      watchers: "—",
    },
    {
      id: 4,
      asset: "5100 [2010 Utility Reefer]",
      serviceTask: "Brake Inspection",
      status: "Overdue",
      nextDue: "2 days ago",
      activeWorkOrder: "—",
      lastCompleted: "12/25/2024 | 0 mi",
      compliance: "100%",
      watchers: "—",
    },
    {
      id: 5,
      asset: "4100 [2012 Freightliner Cascadia]",
      serviceTask: "Engine Oil & Filter Replacement",
      status: "Overdue",
      nextDue: "2 days ago | 22,031 miles remaining",
      activeWorkOrder: "—",
      lastCompleted: "12/25/2024 | 658,978 mi",
      compliance: "0%",
      watchers: "—",
    },
    {
      id: 6,
      asset: "1100 [2018 Toyota Prius]",
      serviceTask: "Tire Rotation",
      status: "Due Soon",
      nextDue: "3 months from now | 467 miles remaining",
      activeWorkOrder: "—",
      lastCompleted: "12/15/2024 | 11,278 mi",
      compliance: "0%",
      watchers: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search service reminders..."
        buttonLabel="Add Service Reminder"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Service Reminder Clicked")}
      />
    </div>
  );
};

export default ServiceRemindersTable;
