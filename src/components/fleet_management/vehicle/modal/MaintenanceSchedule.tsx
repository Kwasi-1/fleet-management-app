import { useState } from "react";

// Define the structure of the formData prop
interface FormData {
  serviceProgram: string;
}

// Define the prop types for MaintenanceSchedule
interface MaintenanceScheduleProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({
  formData,
  handleInputChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(
    formData.serviceProgram || "None"
  );

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
    // @ts-ignore

    handleInputChange({ target: { name: "serviceProgram", value } });
  };

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-2">Maintenance Schedule</h1>
      <p className="text-sm text-gray-500 mb-4">
        Service Programs automatically manage Service Reminders for Assets that
        share common preventative maintenance needs.
      </p>

      <div className="space-y-4">
        {/* None Option */}
        <div
          className={`border rounded-lg p-4 w-1/2 flex items-center justify-between cursor-pointer ${
            selectedOption === "None" ? "border-[#619B7D]" : "border-[#E5E7EB]"
          }`}
          onClick={() => handleOptionChange("None")}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === "None"
                  ? "border-[#619B7D]"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === "None" && (
                <div className="w-3 h-3 bg-[#619B7D] rounded-full" />
              )}
            </div>
            <p className="text-gray-700 font-medium">None</p>
          </div>
        </div>

        {/* Existing Service Program Option */}
        <div
          className={`border rounded-lg p-4 flex items-center w-1/2 justify-between cursor-pointer ${
            selectedOption === "Existing"
              ? "border-[#619B7D]"
              : "border-[#E5E7EB]"
          }`}
          onClick={() => handleOptionChange("Existing")}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === "Existing"
                  ? "border-[#619B7D]"
                  : "border-gray-300"
              }`}
            >
              {selectedOption === "Existing" && (
                <div className="w-3 h-3 bg-[#619B7D] rounded-full" />
              )}
            </div>
            <p className="text-gray-700 font-medium">
              Choose an existing Service Program
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceSchedule;
