import useDebounce from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Spinner } from "@nextui-org/react";
import React from "react";
// import { useQuery } from "@tanstack/react-query"; // We'll remove this import

interface KSelectProps {
  placeholder?: string;
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

// Mock data - replace this with your desired sample data
const mockSearchResults = [
  { value: "Apple", description: "A round fruit, often red or green" },
  { value: "Banana", description: "A long curved yellow fruit" },
  { value: "Orange", description: "A citrus fruit with a tough outer skin" },
  { value: "Grape", description: "Small, round, and typically sweet" },
  { value: "Strawberry", description: "A red, heart-shaped fruit" },
];

// Mock SearchList function
const mockSearchList = async ({ payload }: { payload: any }) => {
  const searchTerm = String(payload.txt).toLowerCase();
  const filteredResults = mockSearchResults.filter(
    (item) =>
      item.value.toLowerCase().includes(searchTerm) ||
      (item.description && item.description.toLowerCase().includes(searchTerm))
  );
  // Simulate a network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { data: { message: filteredResults } };
};

const SelectItem = ({
  placeholder,
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
  // Replace useQuery with a state to manage the search results and loading state
  const [searchResults, setSearchResults] = React.useState(mockSearchResults);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (active) {
      setIsLoading(true);
      mockSearchList({
        payload: {
          filters,
          doctype: doctype,
          reference_doctype: reference_doctype,
          txt: String(value),
        },
      }).then((res) => {
        setSearchResults(res?.data?.message || []);
        setIsLoading(false);
      });
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [value, doctype, reference_doctype, filters, active]);

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
        {searchResults?.map((e: any) => (
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
        ))}
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
