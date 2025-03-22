import GaugeChart from "./GaugeChart";

const OverallBreakdown = () => {
  // Example dynamic values (replace with real data if needed)
  const totalVehicles = 124;
  const activeVehicles = 98;
  const activePercentage = ((activeVehicles / totalVehicles) * 100).toFixed(1);
  const remainingPercentage = (100 - activePercentage).toFixed(1);

  return (
    <div className="bg-[#e0e6e930] min-w80  p-4 font-sans rounded-xl border border-[#e0e6e930] ">
      <h2 className="text-[15px] text-[#4b5563] font-semibold mb-5">
        Overall Breakdown
      </h2>
      <div className="flex items-center">
        <div className="w-full">
          <p className="text-gray-600 text-sm tracking-wider uppercase">
            Total Vehicles
          </p>
          <h3 className="text-lg font-[500] mb-5">
            {totalVehicles.toLocaleString()}
          </h3>

          <p className="text-gray-600 text-sm tracking-wider uppercase">
            Active Vehicles
          </p>
          <h3 className="text-lg font-[500]">
            {activeVehicles.toLocaleString()}
          </h3>
        </div>

        {/* Gauge Chart with Proper Props */}
        <div className="flex flex-col items-center justify-center">
          <div className="mt-4 h-24 w-[250px] -mx-7">
            <GaugeChart
              backgroundColor={["#4F4F4F", "#E5E7EB"]} // Green & Gray
              values={[activePercentage, remainingPercentage]} // Dynamic values
            />
          </div>
          <div className="flex flex-col -mt-14 text-center">
            <p className="text-gray-600 text-3xl font-semibold tracking-wider uppercase">
              {activePercentage}%
            </p>
            <p className="text-gray-600 text-xs tracking-wider uppercase">
              Fleet Utilization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallBreakdown;
