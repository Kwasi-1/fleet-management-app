import { useState } from "react";

const DateFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="flex bg-[#e0e6e930] border border-gray-200  rounded-xl p-[5px]">
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
          className={`px-3 py-[5px] rounded-lg text-[13px] cursor-pointer
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
