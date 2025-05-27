import { useState } from "react";

const DateFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="flex bg-white dark:bg-[#e0e6e930] shadow border border-gray-200 dark:border-gray-700 rounded-xl p-[5px]">
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
                ? "bg-white border border-[#e5e7eb] dark:border-[#2f3031] text-black focus:border-[#e5e7eb]"
                : "hover:text-gray-400 text-[#929292] dark:text-[#b0b0b0]"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default DateFilter;
