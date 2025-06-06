import { styles } from "@/lib/styles";

interface Driver {
  name: string;
  license: string;
  licenseType: string;
  experience: string;
  accidentHistory: string;
}

const UserInfo = ({ driver }: { driver: Driver }) => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
        <div>
          <h2 className="text-[17px] font-bold">{driver.name}</h2>
          <p className="text-[14px] text-[#929292]">Fleet Driver</p>
        </div>
      </div>
    </div>
  );
};

// Action Buttons Component
const DriverActions = () => {
  return (
    <div className="mt-4 flex space-x-2 text-xs">
      <button className="border border-[#12B76A] px-3 py-1 rounded text-[#12B76A] cursor-pointer hover:bg-[#12B76A] hover:text-white transition duration-200">
        Approve
      </button>
      <button className="border border-[#F94144] hover:bg-[#F94144] hover:text-white transition duration-200 px-3 py-1 rounded text-[#F94144] cursor-pointer">
        Reject
      </button>
    </div>
  );
};

// Driver Summary Component
const DriverSummary = ({ driver }: { driver: Driver }) => {
  const stats = [
    { label: "License Type", value: driver.license },
    { label: "License Type", value: driver.licenseType },
    { label: "KYC Score", value: "78%" },
    { label: "Experience", value: driver.experience },
    { label: "Accident History", value: driver.accidentHistory, danger: true },
    { label: "Background Check", value: "Cleared" },
  ];

  return (
    <div
      className={`${styles.cardSmall} flex gap-8 p-6 text-sm rounded-xl border border-[#e0e6e970] h-full`}
    >
      {/* Left Section: User Info & Actions */}
      <div className="w-[300px]">
        <UserInfo driver={driver} />
        <DriverActions />
      </div>

      {/* Right Section: Statistics */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-4 text-[#929292] w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-full uppercase text-[13px]"
          >
            {stat.label}:{" "}
            <span
              className={`font-semibold mt-1 ${
                stat.danger ? "text-red-500" : "text-gray-700"
              }`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverSummary;
