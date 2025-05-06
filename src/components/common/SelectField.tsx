import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ChangeEvent } from "react";

interface SelectFieldProps {
  label?: string;
  name?: string;
  options: string[];
  value: string;
  placeholder?: string;
  classname?: string;
  disabled?: boolean;
  error?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  placeholder,
  classname = "",
  onChange,
  disabled,
  error,
}) => {
  // since ShadCN's Select returns just the value string,
  // we simulate a ChangeEvent for compatibility
  const handleValueChange = (val: string) => {
    const event = {
      target: {
        name,
        value: val,
      },
    } as ChangeEvent<HTMLSelectElement>;
    onChange(event);
  };

  return (
    <div>
      {label && (
        <Label className="text-[14px] mb-1.5 font-thin text-[#929292]">
          {label}
        </Label>
      )}
      <Select
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={`bg-[#F5F6F7] text-sm ${classname}`}>
          <SelectValue placeholder={placeholder ? placeholder : "Select"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
