import Table from "../../common/Table";

const ExpenseHistory = () => {
  const columns = [
    { key: "asset", label: "Asset" },
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
    { key: "vendor", label: "Vendor" },
    { key: "source", label: "Source" },
    { key: "amount", label: "Amount" },
    { key: "watchers", label: "Watchers" },
  ];

  const data = [
    {
      id: 1,
      asset: "1100 [2018 Toyota Prius]",
      date: "09/05/2024",
      type: "Vehicle Registration and Taxes",
      vendor: "-",
      source: "Manually Entered",
      amount: "$196.21",
      watchers: "-",
    },
    {
      id: 2,
      asset: "1100 [2018 Toyota Prius]",
      date: "09/05/2024",
      type: "Insurance",
      vendor: "-",
      source: "Manually Entered",
      amount: "$582.48",
      watchers: "-",
    },
    {
      id: 3,
      asset: "1100 [2018 Toyota Prius]",
      date: "09/15/2024",
      type: "Telematics Device",
      vendor: "-",
      source: "Manually Entered",
      amount: "$98.00",
      watchers: "-",
    },
    {
      id: 4,
      asset: "1100 [2018 Toyota Prius]",
      date: "09/17/2024",
      type: "Tolls",
      vendor: "-",
      source: "Manually Entered",
      amount: "$60.00",
      watchers: "-",
    },
    {
      id: 5,
      asset: "2100 [2016 Ford F-150]",
      date: "12/18/2022",
      type: "Vehicle Registration and Taxes",
      vendor: "-",
      source: "Manually Entered",
      amount: "$41.98",
      watchers: "-",
    },
    {
      id: 6,
      asset: "2100 [2016 Ford F-150]",
      date: "01/09/2023",
      type: "Telematics Device",
      vendor: "-",
      source: "Manually Entered",
      amount: "$96.00",
      watchers: "-",
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      searchPlaceholder="Search Expense History..."
      buttonLabel="Add Expense Entry"
      onRowClick={(row) => console.log("Row clicked:", row)}
      onButtonClick={() => console.log("Add Expense Entry Clicked")}
    />
  );
};

export default ExpenseHistory;
