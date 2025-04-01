import { useState } from "react";
import Table from "../Table";

const FuelHistoryTable = () => {
  // Define table columns
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "date", label: "Date" },
    { key: "vendor", label: "Vendor" },
    { key: "meterEntry", label: "Meter Entry" },
    { key: "usage", label: "Usage" },
    { key: "volume", label: "Volume" },
    { key: "total", label: "Total" },
    { key: "fuelEconomy", label: "Fuel Economy" },
    { key: "costPerMeter", label: "Cost per Meter" },
  ];

  // Sample data for the table
  const data = [
    {
      id: 1,
      asset: "2100 [2016 Ford F-150]",
      date: "Sun, Mar 16, 2025 1:34pm",
      vendor: "—",
      meterEntry: "56,362 mi",
      usage: "257.0 miles",
      volume: "19.113 gallons",
      total: "$46.23 ($2.42/gal)",
      fuelEconomy: "13.45 mpg",
      costPerMeter: "$0.18 / mile",
    },
    {
      id: 2,
      asset: "1100 [2018 Toyota Prius]",
      date: "Fri, Mar 14, 2025 1:34pm",
      vendor: "—",
      meterEntry: "20,682 mi",
      usage: "425.0 miles",
      volume: "7.010 gallons",
      total: "$17.26 ($2.46/gal)",
      fuelEconomy: "60.63 mpg",
      costPerMeter: "$0.04 / mile",
    },
    {
      id: 3,
      asset: "2100 [2016 Ford F-150]",
      date: "Fri, Mar 14, 2025 5:55am",
      vendor: "—",
      meterEntry: "56,105 mi",
      usage: "272.0 miles",
      volume: "18.371 gallons",
      total: "$45.82 ($2.49/gal)",
      fuelEconomy: "14.81 mpg",
      costPerMeter: "$0.17 / mile",
    },
    {
      id: 4,
      asset: "3100 [2014 Chevrolet Express Cargo]",
      date: "Wed, Mar 12, 2025 3:49am",
      vendor: "—",
      meterEntry: "136,654 mi",
      usage: "434.0 miles",
      volume: "23.124 gallons",
      total: "$62.41 ($2.70/gal)",
      fuelEconomy: "18.77 mpg",
      costPerMeter: "$0.14 / mile",
    },
    {
      id: 5,
      asset: "2100 [2016 Ford F-150]",
      date: "Tue, Mar 11, 2025 1:34pm",
      vendor: "—",
      meterEntry: "55,833 mi",
      usage: "223.0 miles",
      volume: "20.954 gallons",
      total: "$50.83 ($2.43/gal)",
      fuelEconomy: "10.64 mpg",
      costPerMeter: "$0.23 / mile",
    },
    {
      id: 6,
      asset: "1100 [2018 Toyota Prius]",
      date: "Tue, Mar 11, 2025 11:36am",
      vendor: "—",
      meterEntry: "20,257 mi",
      usage: "385.0 miles",
      volume: "8.670 gallons",
      total: "$23.44 ($2.70/gal)",
      fuelEconomy: "44.41 mpg",
      costPerMeter: "$0.06 / mile",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        searchPlaceholder="Search fuel history..."
        buttonLabel="Add Fuel Entry"
        onRowClick={(row) => console.log("Clicked Row:", row)}
        onButtonClick={() => console.log("Add Fuel Entry Clicked")}
      />
    </div>
  );
};

export default FuelHistoryTable;
