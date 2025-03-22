const applications = [
  { id: "APP-1121", name: "KORANG CECILIA", product: "FAST SME LOAN", amount: "€10,000.00", date: "20/03/2025 13:39 PM", status: "Open" },
  { id: "APP-1120", name: "APPIAH DORIS", product: "FAST SME LOAN", amount: "€10,000.00", date: "20/03/2025 13:23 PM", status: "Open" },
];

const OpenApplications = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold">Open Applications</h2>
      <table className="w-full mt-2">
        <thead>
          <tr className="border-b">
            <th className="text-left">APP ID</th>
            <th className="text-left">Customer Name</th>
            <th className="text-left">Product</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Date</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id} className="border-b">
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.product}</td>
              <td>{app.amount}</td>
              <td>{app.date}</td>
              <td className="text-yellow-500">{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenApplications;
