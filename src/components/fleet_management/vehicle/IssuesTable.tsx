import { useState } from "react";
import Table from "../fleet_management/Table";
import StatusText from "../fleet_management/StatusText";
const IssuesTable = () => {
  // Define the table columns
  const columns = [
    { key: "priority", label: "Priority" },
    { key: "assetName", label: "Asset Name" },
    { key: "assetRecordType", label: "Asset Record Type" },
    { key: "issue", label: "Issue" },
    { key: "summary", label: "Summary" },
    { key: "status", label: "Issue Status" },
    { key: "source", label: "Source" },
    { key: "reportedDate", label: "Reported Date" },
    { key: "assigned", label: "Assigned" },
    // { key: "labels", label: "Labels" },
    // { key: "watchers", label: "Watchers" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      priority: "No Priority",
      assetName: "1100 [2018 Toyota Prius]",
      assetRecordType: "Asset",
      issue: "#5",
      summary: "Brake light",
      status: "Open",
      source: "—",
      reportedDate: "03/17/2025",
      assigned: "—",
      // labels: "—",
      watchers: "—",
    },
    {
      id: 2,
      priority: "No Priority",
      assetName: "4100 [2012 Freightliner Cascadia]",
      assetRecordType: "Asset",
      issue: "#1",
      summary: "Dead battery",
      status: "Resolved",
      source: "—",
      reportedDate: "11/08/2024",
      assigned: "—",
      labels: "—",
      watchers: "—",
    },
    {
      id: 3,
      priority: "No Priority",
      assetName: "2100 [2016 Ford F-150]",
      assetRecordType: "Asset",
      issue: "#4",
      summary: "Flat tire",
      status: "Open",
      source: "—",
      reportedDate: "03/17/2025",
      assigned: "—",
      labels: "—",
      watchers: "1 watcher",
    },
    {
      id: 4,
      priority: "No Priority",
      assetName: "3100 [2014 Chevrolet Express Cargo]",
      assetRecordType: "Asset",
      issue: "#7",
      summary: '[Inspection] Rock hit windshield. 6" crack on passenger side',
      status: "Open",
      source: "Inspection Submission #73916152",
      reportedDate: "03/12/2025",
      assigned: "—",
      labels: "—",
      watchers: "1 watcher",
    },
    {
      id: 5,
      priority: "No Priority",
      assetName: "1100 [2018 Toyota Prius]",
      assetRecordType: "Asset",
      issue: "#6",
      summary: "[Inspection] Wiper blades need to be replaced soon",
      status: "Open",
      source: "Inspection Submission #73916150",
      reportedDate: "03/15/2025",
      assigned: "—",
      labels: "—",
      watchers: "1 watcher",
    },
    {
      id: 6,
      priority: "No Priority",
      assetName: "3100 [2014 Chevrolet Express Cargo]",
      assetRecordType: "Asset",
      issue: "#2",
      summary: "Oil leak",
      status: "Open",
      source: "—",
      reportedDate: "03/10/2025",
      assigned: "—",
      labels: "—",
      watchers: "—",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search issues..."
        buttonLabel="Add Issue"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Issue Clicked")}
      />
    </div>
  );
};

export default IssuesTable;
