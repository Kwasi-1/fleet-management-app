import { Icon } from "@iconify/react";
import { ChangeEvent, MouseEvent, useState } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SimpleSelect: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    const mockEvent = {
      target: {
        name,
        value: option,
      },
    } as ChangeEvent<HTMLSelectElement>;
    onChange(mockEvent);
    setIsOpen(false);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "backdrop") {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" id="backdrop" onClick={handleBackdropClick}>
      <label className="bg-white px-1 text-[11px] font-semibold text-gray-500">
        {label.toUpperCase()}
      </label>
      <div
        className="w-4/7 border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md shadow-sm cursor-pointer focus:ring-2 focus:ring-[#619B7D]"
        onClick={toggleDropdown}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{value || "Select"}</span>
          <Icon
            icon={isOpen ? "uiw:up" : "uiw:down"}
            className="text-gray-400 text-xs"
          />
        </div>
      </div>
      {isOpen && (
        <ul className="absolute w-4/7 bg-white border border-gray-200 p-2 rounded-xl mt-1 shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-3 py-2 text-sm text-gray-600 rounded-lg hover:text-black hover:bg-gray-100 cursor-pointer ${
                value === option ? "bg-gray-100" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimpleSelect;
