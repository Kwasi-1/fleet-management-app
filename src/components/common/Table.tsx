import { Icon } from "@iconify/react";
import { useState, ChangeEvent, MouseEvent } from "react";
import StatusText from "./StatusText";
import DateFilter from "../fleet_management/DateFilter";

export interface Column {
  key: string;
  label: string;
}

// Generic row type with `id` as string or number and flexible keys
export interface TableRow {
  id: string | number;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
  // Add undefined to match optional Invoice properties
}

interface TableProps<T extends TableRow> {
  columns: Column[];
  data: T[];
  searchPlaceholder?: string;
  buttonLabel?: string;
  onRowClick?: (row: T) => void;
  onButtonClick?: () => void;
  onOperatorClick?: (row: T, event: MouseEvent<HTMLButtonElement>) => void;
}

const Table = <T extends TableRow>({
  columns,
  data,
  searchPlaceholder,
  buttonLabel,
  onRowClick,
  onButtonClick,
  onOperatorClick,
}: TableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOperatorClick = (e: MouseEvent<HTMLButtonElement>, row: T) => {
    e.stopPropagation();
    onOperatorClick?.(row, e);
  };

  return (
    <div className="relative">
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 border border-[#e5e7eb] appearance-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600 w-1/3 bg-inherit"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
          {buttonLabel ? (
            <button
              className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium"
              onClick={onButtonClick}
            >
              <Icon icon="mdi-light:plus-box" className="text-xl" />
              {buttonLabel}
            </button>
          ) : (
            <DateFilter />
          )}
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 uppercase font-semibold text-gray-600 text-[12px]">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#e5e7eb] last:border-b-0 hover:bg-gray-100 cursor-pointer text-[13px] text-gray-600"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {col.key === "status" ? (
                      <StatusText text={String(row[col.key])} />
                    ) : col.key === "operator" ? (
                      <button
                        className="underline hover:text-gray-400 transition duration-300"
                        onClick={(e) => handleOperatorClick(e, row)}
                      >
                        {row[col.key]}
                      </button>
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
