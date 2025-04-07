import AlertCard from "../../common/AlertCard";

const KYCAlerts = () => {
  const alerts = [
    {
      riskScore: 0.72,
      title: "Driver's License Expires in 30 Days",
      category: "License Expiry",
      date: "01 Apr 2025, 10:00",
    },
    {
      riskScore: 0.6,
      title: "Driver's License Issued Less Than 6 Months Ago",
      category: "New License Holder",
      date: "15 Mar 2025, 09:45",
    },
    {
      riskScore: 0.85,
      title: "Truck Failed Last Safety Inspection",
      category: "Vehicle Compliance",
      date: "12 Feb 2025, 14:20",
    },
    {
      riskScore: 0.4,
      title: "Driver Previously Blacklisted",
      category: "Blacklist Check",
      date: "10 Jan 2025, 08:00",
    },
    {
      riskScore: 0.3,
      title: "Truck Overdue for Maintenance",
      category: "Maintenance Alert",
      date: "05 Jan 2025, 16:45",
    },
  ];

  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-gray-200/40">
      <h3 className="text-[17px] font-semibold mb-3">KYC Alerts</h3>

      {/* Scrollable Cards */}
      <div className="space-y-3 overflow-y-auto max-h-[700px] pr-2 scrollbar-hide">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default KYCAlerts;
