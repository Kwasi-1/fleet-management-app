import { useState, useEffect } from "react";
import RangeBar from "../RangeBar";

const stats = [
  { label: "Total Vehicles", value: 124 },
  { label: "Active Vehicles", value: 98 },
  { label: "In Maintenance", value: 11 },
  { label: "Avg Daily Trips", value: 36 },
  { label: "Avg Trip Distance", value: 28.5 },
];

const LoanStats = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
      const formattedTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // 24-hour format
      });

      setLastUpdated(`${formattedDate} ${formattedTime}`);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000); // Update every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-1 flex-col bg[#e0e6e930] shadow-md p-4 px-6 rounded-xl border border-[#e0e6e930]">
      <div className="flex justify-between gap-3 mb-3">
        {stats.map(({ label, value }) => {
          const percentage = ((value / 124) * 100).toFixed(2);

          return (
            <div
              key={label}
              className="uppercase flex flex-col min-w-24 w-full max-w-52 gap-14 text-left"
            >
              <div>
                <p className="text-[#929292] text-[0.8rem] mt-2">{label}</p>
                <h3 className="text-[1.25rem] font-bold">{value}</h3>
              </div>
              <div>
                <p className="text-left text-[0.85rem]">{percentage}%</p>
                <RangeBar value={value} total={124} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[0.82rem]">Last Updated: {lastUpdated}</p>
    </div>
  );
};

export default LoanStats;
