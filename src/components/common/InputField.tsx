import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for class merging
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  icon?: string;
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  disabled,
  icon,
  onChange,
  error,
  className,
  prefix,
  suffix,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className="text-[14px] font-thin text-[#929292]">
          {label}
        </Label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 z-90 top-1.5 text-gray-600">
            {prefix}
          </span>
        )}
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "w-full border bg-[#F5F6F7] border-[#E5E7EB] px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600",
            error && "border-red-500 focus:ring-red-300",
            (icon || prefix) && "pl-10",
            suffix && "pr-10",
            className
          )}
        />
        {icon && (
          <Icon
            icon={icon}
            className="absolute left-3 z-50 top-2.5 text-gray-600"
          />
        )}

        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
