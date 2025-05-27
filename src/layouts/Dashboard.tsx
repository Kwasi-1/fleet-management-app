interface Stat {
  label: string;
  value: string | number;
}

interface DashboardProps {
  stats: Stat[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-4 shadow-md p-4 border border-gray-200/30 rounded-lg">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 border-r border-[#e5e7eb90] last:border-r-0"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            {stat.label}
          </h3>
          <p className="text-xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
