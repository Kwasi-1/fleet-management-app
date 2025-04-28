import { cn } from '@/lib/utils';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

export interface Items {
  value: string;
  label: string;
}
interface KSelectProps {
  placeholder?: string;
  items: Items[];
  label: string;
  onChange: (value: string) => void;
  errors?: Record<string, string>;
  id: string;
  extraClassName?: string;
  boldenLabel?: boolean;
  bgColor?: string;
  labelColor?: string;
  labelFontSize?: string;
  labelMarginBottom?: string;
  wrapperClassName?: string;
  touched?: Record<string, boolean>;
}
const SelectInput = ({
  placeholder,
  items,
  label,
  onChange,
  errors,
  id,
  touched,
  boldenLabel = false,
  bgColor = 'bg-form-bg',
  labelColor = 'text-ash-text',
  labelFontSize = 'text-[0.9rem]',
  labelMarginBottom = 'mb-1',
  wrapperClassName,
}: KSelectProps) => {
  return (
    <div className={cn(wrapperClassName)}>
      <p
        className={`${
          boldenLabel ? 'font-medium' : ' font-light'
        }  ${labelColor}  ${labelFontSize}  ${labelMarginBottom}`}
      >
        {label}
      </p>
      <Autocomplete
        id={id}
        placeholder={placeholder}
        inputProps={{
          classNames: {
            input: 'h-10  bg-[#e0e6e9]/5',
            inputWrapper: 'h-10 rounded-md hover:bg-[#F5F6F7] border',
          },
        }}
        aria-label="none"
        onSelectionChange={(k) => {
          onChange(k as string);
        }}
      >
        {items.map((e) => {
          return (
            <AutocompleteItem
              key={e.value}
              value={e.value}
              className="text-black"
            >
              {e.label}
            </AutocompleteItem>
          );
        })}
      </Autocomplete>

      {errors?.[id] && touched?.[id] && (
        <p className="font-light text-[0.75rem] text-red-500 mt-[0.15rem]">
          * {errors?.[id]}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
