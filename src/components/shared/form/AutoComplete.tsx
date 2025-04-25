import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Spinner } from "@nextui-org/react";
import React from "react";

interface KSelectProps {
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  errors?: Record<string, string>;
  values?: Record<string, any>;
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
  query?: string;
  showDescription?: boolean;
  mockData?: { value: any; description: any }[]; // Add a prop for mock data
}

const AutoComplete = ({
  placeholder,
  label,
  onChange,
  errors,
  id,
  showDescription = false,
  boldenLabel = false,
  bgColor = "bg-form-bg",
  labelColor = "text-ash-text",
  labelFontSize = "text-[0.9rem]",
  labelMarginBottom = "mb-1",
  doctype,
  touched,
  filters = {},
  values = {},
  active = true,
  query = "",
  mockData = [], // Default to an empty array if no mock data is provided
}: KSelectProps) => {
  const [value, setValue] = React.useState("");
  // We're no longer using useQuery
  // const { data, isLoading } = useQuery({
  //   queryKey: [
  //     doctype,
  //     id,
  //     // reference_doctype,
  //     Object.values(filters),
  //     query,
  //     value,
  //   ],
  //   queryFn: () =>
  //     SearchList({
  //       payload: {
  //         filters,
  //         doctype: doctype,
  //         reference_doctype: reference_doctype,
  //         txt: value.trim(),
  //         query,
  //       },
  //     }),
  //   enabled: active,
  // });

  // Simulate the loading state if you want to test that
  const isLoading = false; // You can set this to true temporarily

  // Use the mockData directly
  const data = { data: { message: mockData } };

  return (
    <div className="">
      <p
        className={`${
          boldenLabel ? "font-medium" : " font-extralight"
        }  ${labelColor}  ${labelFontSize}  ${labelMarginBottom}`}
      >
        {label}
      </p>
      <Autocomplete
        onValueChange={(v) => {
          setValue(v);
        }}
        value={value}
        aria-hidden="true"
        disabled={isLoading || !active}
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
            input: "h-10 ",
            inputWrapper: "h-10 rounded-md  border ",
          },
        }}
        aria-label="none"
        selectedKey={values[id]}
        onSelectionChange={(k) => {
          onChange(k as string);
        }}
      >
        {data?.data?.message?.map((e: { value: any; description: any }) => {
          return (
            <AutocompleteItem
              textValue={e?.value}
              key={e.value}
              className="text-black"
              children={<>{e?.value}</>}
              description={<>{showDescription && e?.description}</>}
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

export default AutoComplete;
