const LoanStats = () => {
  const stats = [
    { label: "Submitted", value: 312 },
    { label: "Pending", value: 50 },
    { label: "In Progress", value: 8 },
    { label: "Booked", value: 202 },
    { label: "Closed", value: 0 },
    { label: "Rejected", value: 31 },
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-gray-600">{stat.label}</p>
          <h3 className="text-xl font-bold">{stat.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default LoanStats;
