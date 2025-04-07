import AlertCard, { AlertCardProps } from "../../common/AlertCard";

const Alerts: React.FC = () => {
  const alerts: AlertCardProps[] = [
    {
      riskScore: 0.75,
      title: "Oil Change Overdue",
      category: "Maintenance",
      date: "02 Apr 2025, 11:30",
    },
    {
      riskScore: 0.65,
      title: "Vehicle Registration Expires Soon",
      category: "Compliance",
      date: "10 Apr 2025, 08:00",
    },
    {
      riskScore: 0.85,
      title: "Brake Light Malfunction",
      category: "Safety",
      date: "05 Apr 2025, 14:45",
    },
    {
      riskScore: 0.4,
      title: "Upcoming Tire Rotation",
      category: "Scheduled Maintenance",
      date: "15 Apr 2025, 09:20",
    },
  ];

  return (
    <div className="bg-gray-200/30 p-4 rounded-xl border border-gray-200/40 h-full">
      <h3 className="text-[17px] font-semibold mb-3">Vehicle Alerts</h3>

      <div className="space-y-3 overflow-y-auto max-h-[700px] pr-2 scrollbar-hide">
        {alerts.map((alert, index) => (
          <AlertCard key={index} {...alert} />
        ))}
      </div>
    </div>
  );
};

export default Alerts;
