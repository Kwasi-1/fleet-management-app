import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  selectedClass?: string;
  unselectedClass?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  className = "",
  selectedClass = "",
  unselectedClass = "",
}) => {
  return (
    <div className={`grid gap-4 ${className || "grid-cols-3"}`}>
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            type="button"
            className={cn(
              "flex items-center justify-center rounded-lg px-1 py-2 border text-sm font-medium transition-all duration-150 ease-in-out",
              isSelected
                ? `border-[#619B7D] text-white bg-[#619B7D] ${selectedClass}`
                : `border-gray-300 bg-white text-gray-600 hover:border-[#619B7D] ${unselectedClass}`
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};
