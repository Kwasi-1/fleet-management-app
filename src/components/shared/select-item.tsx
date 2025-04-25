import useDebounce from "@/hooks/useDebounce";
import { SearchList } from "@/lib/api/queries.global";
import { cn } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

interface KSelectProps {
  placeholder?: string;
  // items: Items[];
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
  doctype: string;
  reference_doctype: string;
  touched: Record<string, boolean>;
  filters: {};
  active?: boolean;
}
const SelectItem = ({
  placeholder,
  // items,
  label,
  onChange,
  errors,
  id,
  extraClassName = "",
  boldenLabel = false,
  bgColor = "bg-form-bg",
  labelColor = "text-ash-text",
  labelFontSize = "text-[0.9rem]",
  labelMarginBottom = "mb-1",
  doctype,
  reference_doctype,
  touched,
  filters = {},
  active = true,
}: KSelectProps) => {
  const { value, setValue } = useDebounce("", 500);
  const { data, isLoading } = useQuery({
    queryKey: ["search", value, doctype, reference_doctype, value],
    queryFn: () =>
      SearchList({
        payload: {
          filters,
          doctype: doctype,
          reference_doctype: reference_doctype,
          txt: String(value),
        },
      }),
    enabled: active,
  });

  return (
    <div className={cn("w-[60%]", extraClassName)}>
      <p
        className={`${
          boldenLabel ? "font-medium" : " font-extralight"
        } ${labelColor} ${labelFontSize} ${labelMarginBottom}`}
      >
        {label}
      </p>
      <Autocomplete
        onValueChange={(v) => {
          setValue(v);
        }}
        value={value}
        disabled={isLoading}
        endContent={
          <>
            {isLoading && (
              <Spinner size={"sm"} color="secondary" className="" />
            )}
          </>
        }
        id={id}
        placeholder={placeholder}
        inputProps={{
          classNames: {
            input: "h-12 ",
            inputWrapper: "h-10 rounded-md border ",
          },
        }}
        aria-label="none"
        onChange={(e) => {
          e.stopPropagation();
        }}
        onSelectionChange={(k) => {
          onChange(k as string);
        }}
      >
        {data?.data?.message?.map((e: any) => {
          return (
            <AutocompleteItem
              key={e.value}
              description={e.description}
              className="text-black"
              title={e.value}
              classNames={{
                title: ["text-[0.75rem]"],
                description: ["text-[0.5rem] leading-[10px]"],
                wrapper: "",
              }}
            />
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

export default SelectItem;
