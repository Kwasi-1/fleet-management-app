import { cn } from "@/lib/utils";
import CustomSwitch from "../custom-switch";

interface props {
  id: string;
  values: Record<string, any>;
  errors: Record<string, string>;
  label: string;
  extraClassName?: string;
  setFieldValue: any;
  hintText?: string;
  disabled?: boolean;
  toggleSize?: "sm" | "lg" | "md";
  width?: string;
}
const Toggle = ({
  label,
  setFieldValue,
  id,
  hintText,
  extraClassName,
  values,
  disabled = false,
  toggleSize = "sm",
  width = "w-full",
}: props) => {
  return (
    <div className={cn(width)}>
      <div
        className={`flex items-center flex-row-reverse justify-between gap-3`}
      >
        <CustomSwitch
          isDisabled={disabled}
          isSelected={values[id]}
          size={toggleSize}
          color="secondary"
          onValueChange={(isSelected) => setFieldValue(id, isSelected)}
        />
        <p className={`font-light  text-ash-text ${extraClassName} `}>
          {label}
        </p>
      </div>
      <p className="text-[0.65rem] font-extralight text-ash-text ">
        {hintText}
      </p>
    </div>
  );
};

export default Toggle;
