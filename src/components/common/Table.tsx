import { Icon } from "@iconify/react";
import { useState } from "react";
import StatusText from "./StatusText";
import Pagination from "./Pagination";

interface Column {
  key: string;
  label: string;
}

interface Row {
  id: number | string;
  [key: string]: any; // Allows flexible key-value mapping
}

interface TableProps {
  columns: Column[];
  data: Row[];
  searchPlaceholder?: string;
  buttonLabel?: string;
  onRowClick?: (row: Row) => void;
  onButtonClick?: () => void;
  onOperatorClick?: (
    row: Row,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  searchPlaceholder = "Search...",
  buttonLabel = "Add",
  onRowClick,
  onButtonClick,
  onOperatorClick,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Handle refresh
  const handleRefresh = () => {
    setCurrentPage(1); // Reset to first page
  };

  // Filtered data based on search term
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle operator click
  const handleOperatorClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    row: Row
  ) => {
    e.stopPropagation(); // Prevent row click
    if (onOperatorClick) onOperatorClick(row, e);
  };

  return (
    <div className="relative">
      <div className="p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="p-2 border border-[#e5e7eb] appearance-none outline-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#619B7D] text-sm text-gray-600 w-1/3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium"
            onClick={onButtonClick}
          >
            <Icon icon="mdi-light:plus-box" className="text-xl" />
            {buttonLabel}
          </button>
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
            {paginatedData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[#e5e7eb] last:border-b-0 hover:bg-gray-100 cursor-pointer text-[13px] text-gray-600"
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-3">
                    {col.key === "status" ? (
                      <StatusText text={row[col.key]} />
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
      {/* Pagination and Refresh at Bottom */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        onRefresh={handleRefresh}
      />
    </div>
  );
};

export default Table;
