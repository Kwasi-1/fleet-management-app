import { useState } from "react";
import Table from "../fleet_management/Table";
import StatusText from "../fleet_management/StatusText";

const ContactRenewalTable = () => {
  // Define columns
  const columns = [
    { key: "contact", label: "Contact" },
    { key: "renewalType", label: "Renewal Type" },
    { key: "status", label: "Status" },
    { key: "dueDate", label: "Due Date" },
    { key: "watchers", label: "Watchers" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      contact: "Carlos Garcia",
      renewalType: "License Renewal",
      status: "Overdue",
      dueDate: "03/15/2025",
      watchers: "—",
    },
    {
      id: 2,
      contact: "Andy Miller",
      renewalType: "Certification",
      status: "Due Soon",
      dueDate: "04/03/2025",
      watchers: "—",
    },
    {
      id: 3,
      contact: "Jacob Silva",
      renewalType: "License Renewal",
      status: "Upcoming",
      dueDate: "01/13/2026",
      watchers: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search contact renewal reminders..."
        buttonLabel="Add Contact Renewal Reminder"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Contact Renewal Clicked")}
      />
    </div>
  );
};

export default ContactRenewalTable;
