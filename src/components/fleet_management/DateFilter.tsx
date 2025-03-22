import { useState } from "react";

const DateFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="flex bg-[#e0e6e930] border border-[#e5e7eb] rounded-xl p-[6px] gap-[2px]">
      {[
        "Today",
        "This Month",
        "This Year",
        "Last Year",
        "All Time",
        "Custom Date",
      ].map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-3 py-[6px] rounded-lg text-sm transition duration-300
            ${
              activeFilter === filter
                ? "bg-white border border-[#e5e7eb] text-black focus:border-[#e5e7eb]"
                : "hover:text-gray-400 text-gray-500"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DateFilter;
