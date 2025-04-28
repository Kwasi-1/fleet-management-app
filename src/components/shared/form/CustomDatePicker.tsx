import { cn } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import React, { HTMLInputTypeAttribute, useState } from "react";

interface props {
  id: string;
  values: Record<string, any>;
  errors: Record<string, string>;
  handleBlur: any;
  handleChange: any;
  placeholder: string;
  label: string;
  extraClassName?: string;
  leading?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
  boldenLabel?: boolean;
  bgColor?: string;
  labelColor?: string;
  labelFontSize?: string;
  labelMarginBottom?: string;
  touched: Record<string, boolean>;
  disabled?: boolean;
}
const CustomDatePicker = ({
  id,
  label,
  handleBlur,
  handleChange,
  errors,
  values,
  extraClassName = "",
  leading,
  placeholder,
  type,
  boldenLabel = false,
  bgColor = "bg-[#F5F6F7]",
  labelColor = "text-ash-text",
  labelFontSize = "text-[0.9rem]",
  labelMarginBottom = "mb-1",
  touched,
  disabled = false,
}: props) => {
  const leadingRef = React.useRef<HTMLDivElement>(null);
  const [_, setDivWidth] = React.useState(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  React.useEffect(() => {
    if (leadingRef.current) {
      setDivWidth(leadingRef.current.offsetWidth);
    }
  }, []);
  return (
    <div>
      <p
        className={`px-1 text-[13px] text-gray-500 ${
          boldenLabel ? "font-medium" : " font-extralight"
        }  ${labelColor}  ${labelFontSize}  ${labelMarginBottom}`}
      >
        {label}
      </p>
      <div className="relative">
        {leading && (
          <div
            className="absolute h-full flex items-center justify-start pl-2"
            ref={leadingRef}
          >
            {leading}
          </div>
        )}
        <Input
          disabled={disabled}
          type="date"
          placeholder={placeholder}
          name={id}
          id={id}
          value={values?.[id]}
          onBlur={handleBlur}
          onChange={handleChange}
          classNames={{
            inputWrapper: cn(
              "flex h-10 w-full rounded-md border dark:border-[#F5F5F580] shadow-0  dark:bg-[#161616] px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#619B7D] disabled:cursor-not-allowed disabled:opacity-50",
              bgColor,
              extraClassName
            ),
          }}
        />

        {type == "password" && (
          <div
            className="absolute h-full top-0 flex items-center justify-center right-0 pr-2 cursor-pointer"
            onClick={() => {
              setShowContent(!showContent);
            }}
          >
            {!showContent ? (
              <Eye size="18" color="rgba(146, 146, 146, 1)" />
            ) : (
              <EyeSlash size="18" color="rgba(146, 146, 146, 1)" />
            )}
          </div>
        )}
      </div>
      {errors?.[id] && touched?.[id] && (
        <p className="font-light text-[0.75rem] text-red-500 mt-[0.15rem]">
          * {errors?.[id]}
        </p>
      )}
    </div>
  );
};

export default CustomDatePicker;
