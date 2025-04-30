import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility for class merging

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
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  disabled,
  onChange,
  error,
  className,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label htmlFor={name} className="text-[14px] font-thin text-[#929292]">
          {label}
        </Label>
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
          className
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default InputField;
