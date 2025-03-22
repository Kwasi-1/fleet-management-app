import { useState } from "react";

const DateFilter = () => {
  const [activeFilter, setActiveFilter] = useState("Today");

  return (
    <div className="flex bg-gray-100 border rounded-xl p-2 gap-2">
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
          className={`px-4 py-2 rounded-md text-sm transition duration-300
            ${
              activeFilter === filter
                ? "bg-white shadow-sm border text-black"
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
