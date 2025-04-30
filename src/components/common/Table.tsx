import { Icon } from "@iconify/react";
import { useState, ChangeEvent, MouseEvent } from "react";
import StatusText from "./StatusText";
import DateFilter from "../fleet_management/DateFilter";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

export interface TableRow {
  id: string | number;
  [key: string]: string | number | boolean | React.ReactNode | undefined;
}

interface TableProps<T extends TableRow> {
  columns: Column[];
  data: T[];
  searchPlaceholder?: string;
  buttonLabel?: string;
  additionalFilters?: React.ReactNode;
  onRowClick?: (row: T) => void;
  onButtonClick?: () => void;
  onOperatorClick?: (row: T, event: MouseEvent<HTMLButtonElement>) => void;
  actions?: {
    label: string;
    icon?: string;
    onClick: (row: T) => void;
    variant?: "default" | "delete";
  }[];
}

const Table = <T extends TableRow>({
  columns,
  data,
  searchPlaceholder,
  buttonLabel,
  additionalFilters,
  onRowClick,
  onButtonClick,
  onOperatorClick,
  actions,
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
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              placeholder={searchPlaceholder}
              className={`p-2 border border-[#e5e7eb] appearance-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600 ${
                additionalFilters ? "w-1/4" : "w-1/3"
              } bg-inherit`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          {buttonLabel ? (
            <button
              className="justify-center rounded-md text-[12.5px] ring-offset-white transition focus-visible:outline-none disabled:pointer-events-none  disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green font-medium duation-300 hover:bg-[#619B7D]/80 bg-[#619B7D] text-black hover:opacity-90 disabled:bg-[#619B7D]/50"
              onClick={onButtonClick}
            >
              <Icon icon="mdi-light:plus-box" className="text-xl" />
              {buttonLabel}
            </button>
          ) : (
            <DateFilter />
          )}
        </div>
        <div className="mb-6"> {additionalFilters}</div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 uppercase text-[#4b5563] text-[12px]">
              {columns.map((col) => (
                <th key={col.key} className="p-3 text-left font-[600]">
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="p-3 text-righ font-[600]t">Actions</th>
              )}
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
                    {"render" in col && typeof col.render === "function" ? (
                      col.render(row)
                    ) : col.key === "status" ? (
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
                {actions && (
                  <td className="p-3 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon
                            icon="heroicons-outline:dots-vertical"
                            className="h-4 w-4"
                          />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-48 p-2"
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex flex-col gap-1">
                          {actions.map((action, index) => (
                            <Button
                              key={index}
                              variant={
                                action.label === "delete" ? "delete" : "ghost"
                              }
                              size="lg"
                              className="justify-start rounded-xl capitalize "
                              onClick={(e) => {
                                e.stopPropagation();
                                action.onClick(row);
                              }}
                            >
                              {action.icon && (
                                <Icon
                                  icon={action.icon}
                                  className="mr-2 h-4 w-4"
                                />
                              )}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
