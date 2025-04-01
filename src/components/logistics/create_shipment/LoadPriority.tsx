import { useState } from "react";

const LoadPriority = () => {
  const [priority, setPriority] = useState("Normal"); // Default selection

  const options = [
    {
      label: "Low",
      description:
        "Rates are discounted, but we may move the pickup and delivery dates 1-3 days to fit carrier schedules.",
    },
    {
      label: "Normal",
      description:
        "Best option for most shippers. Book at the flat rate quoted for your pickup date in the calendar below.",
    },
    {
      label: "High",
      description:
        "For a fee, you can increase the coverage of your shipment. If we don't find coverage, this fee will be refunded.",
    },
  ];

  return (
    <div className="w-full mb-6">
      <h3 className="font-semibold text-lg mb-4">Load priority</h3>
      <div className="flex gap-4">
        {options.map((option) => (
          <div
            key={option.label}
            className={`w-1/3 p-4 border-2 rounded-lg cursor-pointer transition-all
              ${
                priority === option.label
                  ? "border-black bg-white"
                  : "border-gray-300 bg-gray-50"
              }
            `}
            onClick={() => setPriority(option.label)}
          >
            <h4 className="font-semibold mb-2">{option.label}</h4>
            <p className="text-sm text-gray-600">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadPriority;
