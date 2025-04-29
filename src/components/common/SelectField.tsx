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
  label: string;
  name: string;
  options: string[];
  value: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  disabled,
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
    <div className="space-y-1.5">
      <Label className="text-[14px] font-thin text-[#929292]">{label}</Label>
      <Select
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="bg-[#F5F6F7] text-sm">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectField;
