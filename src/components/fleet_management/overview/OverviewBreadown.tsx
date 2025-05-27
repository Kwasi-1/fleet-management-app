import GaugeChart from "../GaugeChart";

const OverallBreakdown = () => {
  // Example dynamic values (replace with real data if needed)
  const totalVehicles = 124;
  const activeVehicles = 98;
  const activePercentage = parseFloat(
    ((activeVehicles / totalVehicles) * 100).toFixed(1)
  );
  const remainingPercentage = parseFloat((100 - activePercentage).toFixed(1));

  return (
    <div className="shadow-md min-w-80 p-4 rounded-xl border border-[#e0e6e930]">
      <h2 className="text-[15px] text-[#4b5563] dark:text-gray-200 font-medium mb-5">
        Overall Breakdown
      </h2>
      <div className="flex items-center">
        <div className="w-full">
          <p className="text-[#929292] text-[0.8rem] tracking-wider uppercase">
            Total Vehicles
          </p>
          <h3 className="text-lg font-[500] mb-5 dark:text-white">
            {totalVehicles.toLocaleString()}
          </h3>

          <p className="text-[#929292] text-[0.78rem] tracking-wider uppercase mr-2">
            Active Vehicles
          </p>
          <h3 className="text-lg font-[500] dark:text-white">
            {activeVehicles.toLocaleString()}
          </h3>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mt-4 h-24 w-[220px] -mx-3">
            <GaugeChart
              backgroundColor={["#4F4F4F", "#E5E7EB"]}
              values={[activePercentage, remainingPercentage]}
            />
          </div>
          <div className="flex flex-col -mt-12 text-center text-black dark:text-white">
            <p className="text-[10px] tracking-wider uppercase">
              Fleet Utilization
            </p>
            <p className="text-[22px] tracking-wider uppercase">
              {activePercentage}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallBreakdown;
