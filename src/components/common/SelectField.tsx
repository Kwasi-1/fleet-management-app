import { Icon } from "@iconify/react";
import { useState } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    onChange({ target: { name, value: option } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="bg-white px-1 text-[11px] font-semibold text-gray-500">
        {label.toUpperCase()}
      </label>
      <div
        className="w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md cursor-pointer focus:ring-2 focus:ring-[#619B7D]"
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
        <ul className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer ${
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

export default SelectField;
