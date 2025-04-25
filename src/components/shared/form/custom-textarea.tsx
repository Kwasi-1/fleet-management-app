import { Eye, EyeSlash } from 'iconsax-react';
import React, { HTMLInputTypeAttribute, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

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
  containerClassName?: string;
}
const CustomTextArea = ({
  id,
  label,
  handleBlur,
  handleChange,
  errors,
  values,
  extraClassName = '',
  leading,
  placeholder,
  type,
  boldenLabel = false,
  bgColor = 'bg-form-bg',
  labelColor = 'text-ash-text',
  labelFontSize = 'text-[0.9rem]',
  labelMarginBottom = 'mb-1',
  touched,
  disabled = false,
  containerClassName = '',
}: props) => {
  const leadingRef = React.useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = React.useState(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  React.useEffect(() => {
    if (leadingRef.current) {
      setDivWidth(leadingRef.current.offsetWidth);
    }
  }, []);
  return (
    <div className={containerClassName}>
      <p
        className={`${
          boldenLabel ? 'font-medium' : ' font-extralight'
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
        <Textarea
          disabled={disabled}
          //   type={type !== 'password' ? type : showContent ? 'text' : type}
          placeholder={placeholder}
          name={id}
          id={id}
          value={values?.[id]}
          onBlur={handleBlur}
          onChange={handleChange}
          style={{
            paddingLeft: leading ? divWidth + 10 : null,
          }}
          className={`${leading && 'placeholder:pl-0 '}   ${
            extraClassName || 'w-96'
          }  ${bgColor}`}
        />

        {type == 'password' && (
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

export default CustomTextArea;
